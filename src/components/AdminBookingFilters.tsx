'use client';

import { useState } from 'react';
import { BookingEditForm } from '@/components/BookingEditForm';
import { BookingStatusControl } from '@/components/BookingStatusControl';

type Booking = {
  id: string;
  booking_reference: string;
  pickup: string;
  destination: string;
  travel_date: string;
  travel_time: string;
  passengers: number;
  luggage: number;
  status: string;
  internal_notes?: string | null;
  customers?: { name?: string; email?: string; phone?: string } | { name?: string; email?: string; phone?: string }[] | null;
  services?: { name?: string } | { name?: string }[] | null;
  vehicles?: { name?: string } | { name?: string }[] | null;
};

type Filter = 'all' | 'booked' | 'quoted' | 'cancelled' | 'completed';

export function AdminBookingFilters({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const searchedBookings = bookings.filter((booking) => {
    if (!normalizedSearch) return true;
    const customer = Array.isArray(booking.customers) ? booking.customers[0] : booking.customers;
    return [booking.booking_reference, booking.status, booking.pickup, booking.destination, customer?.name, customer?.email, customer?.phone]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedSearch));
  });
  const visibleBookings = searchedBookings.filter((booking) => {
    if (filter === 'booked') return booking.status === 'BOOKED';
    if (filter === 'quoted') return booking.status === 'QUOTED';
    if (filter === 'cancelled') return booking.status === 'CANCELLED';
    if (filter === 'completed') return booking.status === 'COMPLETED';
    return true;
  });

  const counts = {
    all: searchedBookings.length,
    booked: searchedBookings.filter((booking) => booking.status === 'BOOKED').length,
    quoted: searchedBookings.filter((booking) => booking.status === 'QUOTED').length,
    cancelled: searchedBookings.filter((booking) => booking.status === 'CANCELLED').length,
    completed: searchedBookings.filter((booking) => booking.status === 'COMPLETED').length,
  };

  return (
    <>
      <div className="mt-10 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <label className="sr-only" htmlFor="booking-search">Search bookings</label>
        <input id="booking-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reference, name, email or location" />
        <span className="text-xs text-neutral-500">{visibleBookings.length} shown</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter bookings">
        <FilterButton active={filter === 'all'} count={counts.all} onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton active={filter === 'booked'} count={counts.booked} onClick={() => setFilter('booked')}>Booked</FilterButton>
        <FilterButton active={filter === 'quoted'} count={counts.quoted} onClick={() => setFilter('quoted')}>Quoted</FilterButton>
        <FilterButton active={filter === 'cancelled'} count={counts.cancelled} onClick={() => setFilter('cancelled')}>Canceled</FilterButton>
        <FilterButton active={filter === 'completed'} count={counts.completed} onClick={() => setFilter('completed')}>Completed</FilterButton>
      </div>

      <div className="mt-5 grid gap-4">
        {visibleBookings.length ? visibleBookings.map((booking) => {
          const customer = Array.isArray(booking.customers) ? booking.customers[0] : booking.customers;
          const service = Array.isArray(booking.services) ? booking.services[0] : booking.services;
          const vehicle = Array.isArray(booking.vehicles) ? booking.vehicles[0] : booking.vehicles;

          const expanded = expandedId === booking.id;

          return <article key={booking.id} className="card overflow-hidden">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpandedId(expanded ? null : booking.id)}
              className="grid w-full gap-4 p-5 text-left transition hover:bg-white/[0.03] md:grid-cols-[1fr_auto_auto] md:items-center"
            >
              <div>
                <div className="eyebrow">{booking.booking_reference} · {booking.travel_date} · {String(booking.travel_time).slice(0, 5)}</div>
                <h2 className="serif mt-2 text-2xl">{customer?.name ?? 'Customer'}</h2>
                <p className="mt-1 truncate text-sm text-neutral-300">{booking.pickup} → {booking.destination}</p>
              </div>
              <div className="text-xs uppercase tracking-[.14em] text-neutral-500">{booking.status}</div>
              <div className="text-xs uppercase tracking-[.14em] text-[#b9a47a]">{expanded ? 'Close' : 'View details'}</div>
            </button>

            {expanded && <div className="grid gap-4 border-t border-white/10 p-5 md:p-6"><div className="text-xs text-neutral-500">{customer?.email} · {customer?.phone} · {service?.name ?? 'General request'} · {vehicle?.name ?? 'No preference'} · {booking.passengers} passenger(s)</div><BookingStatusControl id={booking.id} status={booking.status} /><details className="group"><summary className="cursor-pointer text-xs uppercase tracking-[.14em] text-[#b9a47a]">Edit booking details</summary><BookingEditForm booking={{ ...booking, customer: customer ?? undefined }} /></details></div>}
          </article>;
        }) : <div className="card p-8 text-neutral-400">No {filter === 'all' ? '' : filter} bookings yet.</div>}
      </div>
    </>
  );
}

function FilterButton({ active, count, onClick, children }: { active: boolean; count: number; onClick: () => void; children: string }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`inline-flex items-center gap-2 border px-4 py-3 text-xs uppercase tracking-[.14em] transition ${active ? 'border-[#b9a47a] bg-[#b9a47a] text-[#0b0c0d]' : 'border-white/20 text-neutral-300 hover:border-[#b9a47a] hover:text-white'}`}>
    {children}<span className={active ? 'text-[#0b0c0d]/60' : 'text-neutral-500'}>{count}</span>
  </button>;
}