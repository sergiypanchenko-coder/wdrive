-- =====================================================================
-- Wubber: database setup
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Run it once, on a fresh project.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Tables ----------------------------------------------------

-- One row per person with an account (riders, drivers and the pilot team).
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null default '',
  phone         text not null default '',
  email         text not null default '',
  trusted_name  text not null default '',
  trusted_phone text not null default '',
  role          text not null default 'rider' check (role in ('rider', 'team')),
  created_at    timestamptz not null default now()
);

-- Driver applications. A driver also has a normal account (user_id).
create table public.drivers (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid unique default auth.uid() references auth.users(id) on delete set null,
  name        text not null,
  phone       text not null,
  ncc         text not null check (ncc in ('yes', 'in_progress', 'no')),
  car         text not null default '',
  plate       text not null default '',
  slots       text[] not null default '{}',
  areas       text not null default '',
  status      text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  created_at  timestamptz not null default now(),
  reviewed_at timestamptz
);

create table public.rides (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  rider_id            uuid not null default auth.uid() references auth.users(id) on delete cascade,
  passenger_name      text not null default '',
  passenger_phone     text not null default '',
  pickup              text not null,
  pickup_lat          double precision,
  pickup_lng          double precision,
  dropoff             text not null,
  dropoff_lat         double precision,
  dropoff_lng         double precision,
  trusted_name        text not null default '',
  trusted_phone       text not null default '',
  pin                 text not null default lpad((floor(random() * 9000) + 1000)::int::text, 4, '0'),
  fare_lo             integer,
  fare_hi             integer,
  km                  numeric,
  status              text not null default 'requested'
                        check (status in ('requested', 'assigned', 'on_trip', 'completed', 'cancelled')),
  driver_id           uuid references public.drivers(id),
  fare                numeric,
  eta_min             integer,
  assigned_at         timestamptz,
  started_at          timestamptz,
  completed_at        timestamptz,
  cancelled_at        timestamptz,
  cancelled_by        text,
  sos                 boolean not null default false,
  sos_at              timestamptz,
  sos_resolved        boolean not null default false,
  sos_resolved_at     timestamptz,
  passenger_dismissed boolean not null default false,
  feedback            jsonb
);
create index rides_rider_idx  on public.rides (rider_id, created_at desc);
create index rides_driver_idx on public.rides (driver_id);

create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  contact    text not null,
  created_at timestamptz not null default now()
);

-- ---------- New account → profile row ----------------------------------

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, phone, email, trusted_name, trusted_phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'trusted_name', ''),
    coalesce(new.raw_user_meta_data ->> 'trusted_phone', '')
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Helpers used by the security rules -------------------------

create function public.is_team() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'team');
$$;

create function public.my_driver_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.drivers where user_id = auth.uid() and status = 'verified' limit 1;
$$;

-- ---------- Security rules (row level security) ------------------------

alter table public.profiles enable row level security;
alter table public.drivers  enable row level security;
alter table public.rides    enable row level security;
alter table public.waitlist enable row level security;

-- Profiles: you see your own; the team sees everyone. You can edit your
-- own contact details but never your role.
create policy "profiles: read own or team" on public.profiles
  for select using (id = auth.uid() or public.is_team());
create policy "profiles: update own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (name, phone, trusted_name, trusted_phone) on public.profiles to authenticated;

-- Drivers: you see your own application; the team sees all; a rider sees
-- the driver assigned to her ride. Anyone logged in can apply once.
create policy "drivers: read" on public.drivers
  for select using (
    user_id = auth.uid()
    or public.is_team()
    or exists (select 1 from public.rides r where r.driver_id = drivers.id and r.rider_id = auth.uid())
  );
create policy "drivers: apply" on public.drivers
  for insert with check (user_id = auth.uid() and status = 'pending');
revoke insert, update, delete on public.drivers from anon, authenticated;
grant insert (id, user_id, name, phone, ncc, car, plate, slots, areas) on public.drivers to authenticated;

-- Rides: a rider sees her own rides, a driver sees rides assigned to her,
-- the team sees everything. Riders can create rides. Every other change
-- goes through the functions further down, so nobody can set a price,
-- a status or a driver they shouldn't.
create policy "rides: read" on public.rides
  for select using (rider_id = auth.uid() or driver_id = public.my_driver_id() or public.is_team());
create policy "rides: rider creates" on public.rides
  for insert with check (rider_id = auth.uid());
revoke select, insert, update, delete on public.rides from anon, authenticated;
-- Everything except the PIN is readable (the PIN is read with my_ride_pin()).
grant select (
  id, created_at, rider_id, passenger_name, passenger_phone,
  pickup, pickup_lat, pickup_lng, dropoff, dropoff_lat, dropoff_lng,
  trusted_name, trusted_phone, fare_lo, fare_hi, km, status, driver_id, fare, eta_min,
  assigned_at, started_at, completed_at, cancelled_at, cancelled_by,
  sos, sos_at, sos_resolved, sos_resolved_at, passenger_dismissed, feedback
) on public.rides to authenticated;
grant insert (
  id, rider_id, passenger_name, passenger_phone,
  pickup, pickup_lat, pickup_lng, dropoff, dropoff_lat, dropoff_lng,
  trusted_name, trusted_phone, fare_lo, fare_hi, km
) on public.rides to authenticated;

-- Waiting list: anyone logged in can join; only the team reads it.
create policy "waitlist: join" on public.waitlist for insert with check (true);
create policy "waitlist: team reads" on public.waitlist for select using (public.is_team());
revoke select, update, delete on public.waitlist from anon;
revoke update, delete on public.waitlist from authenticated;

-- ---------- Actions -----------------------------------------------------

-- The rider's PIN for her own ride.
create function public.my_ride_pin(p_ride uuid) returns text
language sql stable security definer set search_path = public as $$
  select pin from public.rides where id = p_ride and rider_id = auth.uid();
$$;

-- Rider actions: cancel, sos, dismiss (hide a cancelled ride), feedback.
create function public.rider_action(p_ride uuid, p_action text, p_feedback jsonb default null) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.rides where id = p_ride and rider_id = auth.uid()) then
    raise exception 'This is not your ride.';
  end if;
  if p_action = 'cancel' then
    update public.rides set status = 'cancelled', cancelled_by = 'passenger', cancelled_at = now()
      where id = p_ride and status in ('requested', 'assigned');
  elsif p_action = 'sos' then
    update public.rides set sos = true, sos_resolved = false, sos_at = now() where id = p_ride;
  elsif p_action = 'dismiss' then
    update public.rides set passenger_dismissed = true where id = p_ride;
  elsif p_action = 'feedback' then
    update public.rides set feedback = p_feedback where id = p_ride and status = 'completed';
  else
    raise exception 'Unknown action.';
  end if;
end $$;

-- Driver actions: start (needs the passenger's PIN), complete.
-- Returns false when the PIN is wrong.
create function public.driver_action(p_ride uuid, p_action text, p_pin text default null) returns boolean
language plpgsql security definer set search_path = public as $$
declare r public.rides;
begin
  select * into r from public.rides where id = p_ride and driver_id = public.my_driver_id();
  if not found then raise exception 'This ride is not assigned to you.'; end if;
  if p_action = 'start' then
    if r.status <> 'assigned' then raise exception 'This ride is not waiting for pickup.'; end if;
    if p_pin is distinct from r.pin then return false; end if;
    update public.rides set status = 'on_trip', started_at = now() where id = p_ride;
    return true;
  elsif p_action = 'complete' then
    update public.rides set status = 'completed', completed_at = now() where id = p_ride and status = 'on_trip';
    return true;
  end if;
  raise exception 'Unknown action.';
end $$;

-- Pilot team actions on rides: assign, cancel, complete, resolve_sos.
create function public.team_ride_action(
  p_ride uuid, p_action text, p_driver uuid default null, p_fare numeric default null, p_eta integer default null
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team() then raise exception 'Only the pilot team can do this.'; end if;
  if p_action = 'assign' then
    if not exists (select 1 from public.drivers where id = p_driver and status = 'verified') then
      raise exception 'Choose a verified driver.';
    end if;
    update public.rides set status = 'assigned', driver_id = p_driver, fare = p_fare, eta_min = p_eta, assigned_at = now()
      where id = p_ride and status = 'requested';
  elsif p_action = 'cancel' then
    update public.rides set status = 'cancelled', cancelled_by = 'team', cancelled_at = now()
      where id = p_ride and status in ('requested', 'assigned', 'on_trip');
  elsif p_action = 'complete' then
    update public.rides set status = 'completed', completed_at = now() where id = p_ride and status in ('assigned', 'on_trip');
  elsif p_action = 'resolve_sos' then
    update public.rides set sos_resolved = true, sos_resolved_at = now() where id = p_ride;
  else
    raise exception 'Unknown action.';
  end if;
end $$;

-- Pilot team: verify or reject a driver.
create function public.team_driver_status(p_driver uuid, p_status text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_team() then raise exception 'Only the pilot team can do this.'; end if;
  if p_status not in ('pending', 'verified', 'rejected') then raise exception 'Unknown status.'; end if;
  update public.drivers set status = p_status, reviewed_at = now() where id = p_driver;
end $$;

revoke execute on function public.my_ride_pin(uuid) from public, anon;
revoke execute on function public.rider_action(uuid, text, jsonb) from public, anon;
revoke execute on function public.driver_action(uuid, text, text) from public, anon;
revoke execute on function public.team_ride_action(uuid, text, uuid, numeric, integer) from public, anon;
revoke execute on function public.team_driver_status(uuid, text) from public, anon;
grant execute on function public.my_ride_pin(uuid) to authenticated;
grant execute on function public.rider_action(uuid, text, jsonb) to authenticated;
grant execute on function public.driver_action(uuid, text, text) to authenticated;
grant execute on function public.team_ride_action(uuid, text, uuid, numeric, integer) to authenticated;
grant execute on function public.team_driver_status(uuid, text) to authenticated;

-- =====================================================================
-- After you've created your own account in the app, make yourself part
-- of the pilot team. Put your email in place of the example and run:
--
--   update public.profiles set role = 'team' where email = 'you@example.com';
-- =====================================================================
