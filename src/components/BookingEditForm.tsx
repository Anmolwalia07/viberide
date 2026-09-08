'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

type Booking = { id: string; pickup: string; destination: string; travel_date: string; travel_time: string; passengers: number; luggage: number; status: string; internal_notes?: string | null; customer?: { name?: string; email?: string; phone?: string } };

export function BookingEditForm({ booking }: { booking: Booking }) {
  const [data, setData] = useState({ pickup: booking.pickup, destination: booking.destination, travelDate: booking.travel_date, travelTime: booking.travel_time.slice(0, 5), passengers: booking.passengers, luggage: booking.luggage, name: booking.customer?.name ?? '', email: booking.customer?.email ?? '', phone: booking.customer?.phone ?? '', internalNotes: booking.internal_notes ?? '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function save() {
    setMessage(''); setError('');
    const response = await fetch(`/api/admin/bookings/${booking.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? 'Unable to save booking');
    else setMessage('Booking saved.');
  }

  return <div className="mt-5 grid gap-4 border-t border-white/10 pt-5">
    <div className="grid gap-4 md:grid-cols-2"><Field label="Pickup" value={data.pickup} onChange={(value) => setData({ ...data, pickup: value })} /><Field label="Destination" value={data.destination} onChange={(value) => setData({ ...data, destination: value })} /></div>
    <div className="grid gap-4 md:grid-cols-4"><Field label="Date" type="date" value={data.travelDate} onChange={(value) => setData({ ...data, travelDate: value })} /><Field label="Time" type="time" value={data.travelTime} onChange={(value) => setData({ ...data, travelTime: value })} /><Field label="Passengers" type="number" value={String(data.passengers)} onChange={(value) => setData({ ...data, passengers: Number(value) })} /><Field label="Luggage" type="number" value={String(data.luggage)} onChange={(value) => setData({ ...data, luggage: Number(value) })} /></div>
    <div className="grid gap-4 md:grid-cols-3"><Field label="Customer name" value={data.name} onChange={(value) => setData({ ...data, name: value })} /><Field label="Email" type="email" value={data.email} onChange={(value) => setData({ ...data, email: value })} /><Field label="Phone" value={data.phone} onChange={(value) => setData({ ...data, phone: value })} /></div>
    <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-500">Internal notes<textarea rows={3} value={data.internalNotes} onChange={(event) => setData({ ...data, internalNotes: event.target.value })} /></label>
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}{message && <p className="text-sm text-[#b9a47a]">{message}</p>}
    <button className="btn justify-self-start" type="button" onClick={() => void save()}><Save size={15} /> Save booking</button>
  </div>;
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-500">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}