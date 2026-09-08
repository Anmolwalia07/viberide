alter table bookings
  add column if not exists booking_reference text
  default ('VL-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)));

update bookings
set booking_reference = 'VL-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))
where booking_reference is null;

alter table bookings
  alter column booking_reference set not null;

create unique index if not exists bookings_reference_idx on bookings(booking_reference);