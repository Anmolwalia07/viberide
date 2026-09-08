-- Run this only when 001_initial.sql has already been applied.
-- Existing NEW/CONTACTED requests become QUOTED; CONFIRMED becomes BOOKED.
alter type booking_status rename to booking_status_old;
create type booking_status as enum ('BOOKED', 'QUOTED', 'COMPLETED', 'CANCELLED');

alter table bookings
  alter column status drop default,
  alter column status type booking_status
  using (
    case status::text
      when 'CONFIRMED' then 'BOOKED'::booking_status
      when 'COMPLETED' then 'COMPLETED'::booking_status
      when 'CANCELLED' then 'CANCELLED'::booking_status
      else 'QUOTED'::booking_status
    end
  ),
  alter column status set default 'QUOTED'::booking_status;

alter table booking_status_history
  alter column old_status type booking_status
  using (
    case old_status::text
      when 'CONFIRMED' then 'BOOKED'::booking_status
      when 'COMPLETED' then 'COMPLETED'::booking_status
      when 'CANCELLED' then 'CANCELLED'::booking_status
      when 'QUOTED' then 'QUOTED'::booking_status
      else 'QUOTED'::booking_status
    end
  ),
  alter column new_status type booking_status
  using (
    case new_status::text
      when 'CONFIRMED' then 'BOOKED'::booking_status
      when 'COMPLETED' then 'COMPLETED'::booking_status
      when 'CANCELLED' then 'CANCELLED'::booking_status
      when 'QUOTED' then 'QUOTED'::booking_status
      else 'QUOTED'::booking_status
    end
  );

drop type booking_status_old;