'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';

type Resource = 'services' | 'vehicles' | 'testimonials' | 'service-areas';
type Field = { key: string; label: string; type?: 'text' | 'textarea' | 'number' | 'url' | 'checkbox' | 'features'; required?: boolean };
type RecordValue = Record<string, string | number | boolean | string[]> & { id?: string };

const definitions: Record<Resource, { title: string; fields: Field[] }> = {
  services: { title: 'Services', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'active', label: 'Active', type: 'checkbox' }] },
  vehicles: { title: 'Fleet', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'category', label: 'Category', required: true }, { key: 'image_url', label: 'Image URL', type: 'url' }, { key: 'passenger_capacity', label: 'Passengers', type: 'number', required: true }, { key: 'luggage_capacity', label: 'Luggage', type: 'number', required: true }, { key: 'features', label: 'Features', type: 'features' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'status', label: 'Status' }] },
  testimonials: { title: 'Testimonials', fields: [{ key: 'customer_name', label: 'Customer name', required: true }, { key: 'quote', label: 'Quote', type: 'textarea', required: true }, { key: 'approved', label: 'Approved', type: 'checkbox' }] },
  'service-areas': { title: 'Service areas', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'active', label: 'Active', type: 'checkbox' }] },
};

const defaults: Record<Resource, RecordValue> = {
  services: { name: '', slug: '', description: '', active: true },
  vehicles: { name: '', category: '', image_url: '', passenger_capacity: 1, luggage_capacity: 0, features: [], description: '', status: 'ACTIVE' },
  testimonials: { customer_name: '', quote: '', approved: false },
  'service-areas': { name: '', slug: '', description: '', active: true },
};

export function AdminResourceManager({ resource }: { resource: Resource }) {
  const definition = definitions[resource];
  const [items, setItems] = useState<RecordValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<RecordValue | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch(`/api/admin/${resource}`).then(async (response) => {
      const result = await response.json();
      if (!active) return;
      if (!response.ok) setError(result.error ?? 'Unable to load data');
      else setItems(result.data ?? []);
      setLoading(false);
    });
    return () => { active = false; };
  }, [resource]);

  async function load() {
    const response = await fetch(`/api/admin/${resource}`);
    const result = await response.json();
    if (!response.ok) setError(result.error ?? 'Unable to load data');
    else setItems(result.data ?? []);
  }

  async function save() {
    if (!editing) return;
    setSaving(true); setError('');
    const payload = { ...editing, ...(Array.isArray(editing.features) ? {} : {}) };
    const response = await fetch(`/api/admin/${resource}`, { method: editing.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing.id ? { id: editing.id, data: payload } : payload) });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? 'Unable to save changes');
    else { setEditing(null); await load(); }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this item?')) return;
    const response = await fetch(`/api/admin/${resource}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (!response.ok) { const result = await response.json(); setError(result.error ?? 'Unable to delete item'); }
    else await load();
  }

  return <div className="mt-10 grid gap-6">
    <div className="flex justify-end"><button className="btn" type="button" onClick={() => setEditing({ ...defaults[resource] })}><Plus size={15} /> Add {definition.title.slice(0, -1)}</button></div>
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    {loading && <div className="grid gap-4" aria-label={`Loading ${definition.title.toLowerCase()}`}><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>}
    {editing && <div className="card grid gap-4 p-6">
      <div className="flex items-center justify-between"><h2 className="serif text-3xl">{editing.id ? 'Edit' : 'New'} {definition.title.slice(0, -1)}</h2><button type="button" aria-label="Close editor" onClick={() => setEditing(null)}><X /></button></div>
      {definition.fields.map((field) => <EditorField key={field.key} field={field} value={editing[field.key]} onChange={(value) => setEditing({ ...editing, [field.key]: value })} />)}
      <div className="flex gap-3"><button className="btn" type="button" disabled={saving} onClick={() => void save()}><Save size={15} /> Save</button><button className="btn secondary" type="button" onClick={() => setEditing(null)}>Cancel</button></div>
    </div>}
    {!loading && items.map((item) => <article className="card flex flex-wrap items-center justify-between gap-5 p-6" key={item.id}>
      <div><h2 className="serif text-2xl">{String(item.name ?? item.customer_name)}</h2><p className="mt-2 max-w-2xl text-sm text-neutral-400">{String(item.description ?? item.quote ?? '')}</p></div>
      <div className="flex gap-2"><button className="btn secondary" type="button" onClick={() => setEditing({ ...item })}><Pencil size={14} /> Edit</button><button className="btn secondary" type="button" aria-label="Delete item" onClick={() => item.id && void remove(item.id)}><Trash2 size={14} /></button></div>
    </article>)}
    {!loading && !items.length && !editing && <div className="card p-8 text-neutral-400">No records yet.</div>}
  </div>;
}

function EditorField({ field, value, onChange }: { field: Field; value: RecordValue[string]; onChange: (value: string | number | boolean | string[]) => void }) {
  if (field.type === 'checkbox') return <label className="flex items-center gap-3 text-sm text-neutral-300"><input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} /> {field.label}</label>;
  if (field.type === 'features') return <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">{field.label}<input value={Array.isArray(value) ? value.join(', ') : ''} onChange={(event) => onChange(event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="Leather interior, Climate control" /></label>;
  if (field.type === 'textarea') return <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">{field.label}<textarea rows={4} required={field.required} value={String(value ?? '')} onChange={(event) => onChange(event.target.value)} /></label>;
  return <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">{field.label}<input type={field.type ?? 'text'} required={field.required} value={String(value ?? '')} onChange={(event) => onChange(field.type === 'number' ? Number(event.target.value) : event.target.value)} /></label>;
}