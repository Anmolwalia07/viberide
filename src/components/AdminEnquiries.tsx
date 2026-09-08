'use client';

import { useState } from 'react';

type Enquiry = { id: string; name: string; email: string; phone?: string | null; message: string; status: 'NEW' | 'READ' | 'CLOSED'; created_at: string; internal_notes?: string | null };

export function AdminEnquiries({ enquiries }: { enquiries: Enquiry[] }) {
  const [items, setItems] = useState(enquiries);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function update(id: string, status: Enquiry['status']) {
    const response = await fetch('/api/admin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (response.ok) setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }

  return <div className="mt-10 grid gap-3">{items.length ? items.map((item) => { const open = expanded === item.id; return <article className="card overflow-hidden" key={item.id}><button type="button" aria-expanded={open} onClick={() => setExpanded(open ? null : item.id)} className="grid w-full gap-3 p-5 text-left md:grid-cols-[1fr_auto_auto] md:items-center"><div><div className="eyebrow">{new Date(item.created_at).toLocaleDateString('en-AU')}</div><h2 className="serif mt-2 text-2xl">{item.name}</h2><p className="mt-1 truncate text-sm text-neutral-400">{item.message}</p></div><span className="text-xs uppercase tracking-[.14em] text-neutral-500">{item.status}</span><span className="text-xs uppercase tracking-[.14em] text-[#b9a47a]">{open ? 'Close' : 'View enquiry'}</span></button>{open && <div className="grid gap-4 border-t border-white/10 p-5 text-sm text-neutral-300"><div>{item.email}{item.phone ? ` · ${item.phone}` : ''}</div><p className="whitespace-pre-wrap leading-7">{item.message}</p><label className="grid gap-2 text-[10px] uppercase tracking-[.16em] text-neutral-500">Status<select value={item.status} onChange={(event) => void update(item.id, event.target.value as Enquiry['status'])}><option>NEW</option><option>READ</option><option>CLOSED</option></select></label></div>}</article>; }) : <div className="card p-8 text-neutral-400">No enquiries yet.</div>}</div>;
}