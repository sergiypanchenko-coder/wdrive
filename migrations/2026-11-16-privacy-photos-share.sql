-- =====================================================================
-- Wubber: update of 16 Nov 2026 (already applied to the live project).
-- Removes the waiting list, records privacy consent, adds driver photos
-- and the "share my trip" live link.
-- =====================================================================

-- 1. Waiting list removed from the app.
drop table if exists public.waitlist;

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

-- 6. Driver's live position (16 Nov, later): the rider sees the car moving.
alter table public.rides add column if not exists driver_lat double precision;
alter table public.rides add column if not exists driver_lng double precision;
alter table public.rides add column if not exists driver_loc_at timestamptz;
grant select (driver_lat, driver_lng, driver_loc_at, rider_lat, rider_lng) on public.rides to authenticated;
create or replace function public.driver_location(p_ride uuid, p_lat double precision, p_lng double precision) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_lat is null or p_lng is null or p_lat not between 44 and 46 or p_lng not between 7 and 8.5 then return; end if;
  update public.rides set driver_lat = p_lat, driver_lng = p_lng, driver_loc_at = now()
   where id = p_ride and driver_id = public.my_driver_id() and status in ('assigned', 'on_trip');
end $$;
revoke execute on function public.driver_location(uuid, double precision, double precision) from public, anon;
grant execute on function public.driver_location(uuid, double precision, double precision) to authenticated;
-- shared_trip() was also updated to return 'car' (the driver's position) — see the live database.
