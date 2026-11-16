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

-- ---------- Privacy consent, driver photos, share my trip (Nov 2026) ----

-- 2. The sign-up helper only runs as a trigger; nobody should call it directly.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.is_team() from public, anon;
revoke execute on function public.my_driver_id() from public, anon;
grant execute on function public.is_team() to authenticated;
grant execute on function public.my_driver_id() to authenticated;

-- 3. Privacy consent: when the person accepted the privacy notice.
alter table public.profiles add column if not exists privacy_accepted_at timestamptz;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, phone, email, trusted_name, trusted_phone, privacy_accepted_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'trusted_name', ''),
    coalesce(new.raw_user_meta_data ->> 'trusted_phone', ''),
    case when new.raw_user_meta_data ? 'privacy_accepted_at' then now() end
  );
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 4. Driver photo (stored in the public "driver-photos" bucket).
alter table public.drivers add column if not exists photo_url text not null default '';
alter table public.drivers drop constraint if exists drivers_photo_url_check;
alter table public.drivers add constraint drivers_photo_url_check check (
  photo_url = '' or photo_url like 'https://qcrlmxrvmmvccwutztzn.supabase.co/storage/v1/object/public/driver-photos/%'
);
grant insert (photo_url) on public.drivers to authenticated;
grant update (photo_url) on public.drivers to authenticated;
drop policy if exists "drivers: update own photo" on public.drivers;
create policy "drivers: update own photo" on public.drivers
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('driver-photos', 'driver-photos', true, 3145728, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "driver photos: upload own" on storage.objects;
create policy "driver photos: upload own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'driver-photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "driver photos: replace own" on storage.objects;
create policy "driver photos: replace own" on storage.objects
  for update to authenticated
  using (bucket_id = 'driver-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- 5. Share my trip: a secret link per ride, plus the rider's live position.
alter table public.rides add column if not exists share_token uuid not null default gen_random_uuid();
alter table public.rides add column if not exists rider_lat double precision;
alter table public.rides add column if not exists rider_lng double precision;
alter table public.rides add column if not exists rider_loc_at timestamptz;
create unique index if not exists rides_share_token_idx on public.rides (share_token);
grant select (share_token, rider_lat, rider_lng, rider_loc_at) on public.rides to authenticated;

-- The rider sends her phone's position while the ride is active.
create or replace function public.rider_location(p_ride uuid, p_lat double precision, p_lng double precision) returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.rides set rider_lat = p_lat, rider_lng = p_lng, rider_loc_at = now()
   where id = p_ride and rider_id = auth.uid() and status in ('assigned', 'on_trip');
end $$;
revoke execute on function public.rider_location(uuid, double precision, double precision) from public, anon;
grant execute on function public.rider_location(uuid, double precision, double precision) to authenticated;

-- What someone with the link can see. No phone numbers, no PIN, no surname.
-- The link stops working 1 hour after the ride ends, or 24 hours after booking.
create or replace function public.shared_trip(p_token uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r public.rides; d public.drivers; ended timestamptz;
begin
  select * into r from public.rides where share_token = p_token;
  if not found then return jsonb_build_object('found', false); end if;
  ended := coalesce(r.completed_at, r.cancelled_at);
  if r.created_at < now() - interval '24 hours' or (ended is not null and ended < now() - interval '1 hour') then
    return jsonb_build_object('found', true, 'expired', true);
  end if;
  if r.driver_id is not null then select * into d from public.drivers where id = r.driver_id; end if;
  return jsonb_build_object(
    'found', true, 'expired', false,
    'status', r.status,
    'rider', split_part(r.passenger_name, ' ', 1),
    'pickup', r.pickup, 'pickup_lat', r.pickup_lat, 'pickup_lng', r.pickup_lng,
    'dropoff', r.dropoff, 'dropoff_lat', r.dropoff_lat, 'dropoff_lng', r.dropoff_lng,
    'created_at', r.created_at, 'assigned_at', r.assigned_at, 'started_at', r.started_at,
    'completed_at', r.completed_at, 'cancelled_at', r.cancelled_at, 'eta_min', r.eta_min,
    'sos', r.sos and not r.sos_resolved,
    'driver', case when d.id is null then null else jsonb_build_object(
      'name', split_part(d.name, ' ', 1), 'car', d.car, 'plate', d.plate, 'photo_url', d.photo_url) end,
    'loc', case when r.status in ('assigned', 'on_trip') and r.rider_loc_at > now() - interval '15 minutes'
      then jsonb_build_object('lat', r.rider_lat, 'lng', r.rider_lng, 'at', r.rider_loc_at) end
  );
end $$;
revoke execute on function public.shared_trip(uuid) from public;
grant execute on function public.shared_trip(uuid) to anon, authenticated;

-- =====================================================================
-- After you've created your own account in the app, make yourself part
-- of the pilot team. Put your email in place of the example and run:
--
--   update public.profiles set role = 'team' where email = 'you@example.com';
-- =====================================================================
