'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';

type Settings = { business_name: string; phone: string; email: string; address: string; whatsapp: string };

export function AdminSettingsForm() {
  const [settings, setSettings] = useState<Settings>({ business_name: '', phone: '', email: '', address: '', whatsapp: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    void fetch('/api/admin/settings').then(async (response) => {
      const result = await response.json();
      if (response.ok && result.data) setSettings(result.data);
      else setError(result.error ?? 'Unable to load settings');
      setLoading(false);
    });
  }, []);

  async function save() {
    setMessage(''); setError('');
    const response = await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? 'Unable to save settings');
    else setMessage('Settings saved.');
  }

  if (loading) return <div className="card mt-10 grid max-w-2xl gap-5 p-7 md:p-10" aria-label="Loading business settings">{[1, 2, 3, 4, 5].map((item) => <Skeleton className="h-12 w-full" key={item} />)}</div>;

  return <div className="card mt-10 grid max-w-2xl gap-5 p-7 md:p-10">
    <Field label="Business name" value={settings.business_name} onChange={(value) => setSettings({ ...settings, business_name: value })} />
    <Field label="Phone" value={settings.phone} onChange={(value) => setSettings({ ...settings, phone: value })} />
    <Field label="Email" type="email" value={settings.email} onChange={(value) => setSettings({ ...settings, email: value })} />
    <Field label="Address" value={settings.address} onChange={(value) => setSettings({ ...settings, address: value })} />
    <Field label="WhatsApp number" value={settings.whatsapp} onChange={(value) => setSettings({ ...settings, whatsapp: value })} />
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    {message && <p className="text-sm text-[#b9a47a]">{message}</p>}
    <button className="btn justify-self-start" type="button" onClick={() => void save()}><Save size={15} /> Save settings</button>
  </div>;
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}