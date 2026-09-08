'use client';

import { useState } from 'react';

const statuses = ['BOOKED', 'QUOTED', 'COMPLETED', 'CANCELLED'] as const;

export function BookingStatusControl({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function change(next: string) {
    setValue(next);
    setSaving(true);
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    if (!response.ok) setValue(status);
    setSaving(false);
  }

  return <label className="grid gap-2 text-[10px] uppercase tracking-[.16em] text-neutral-500">Status
    <select value={value} disabled={saving} onChange={(event) => change(event.target.value)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select>
  </label>;
}