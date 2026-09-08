'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';

export function ContactEnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        message: form.get('message'),
        website: form.get('website'),
      }),
    });

    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) event.currentTarget.reset();
  }

  if (status === 'success') return <div className="card grid gap-4 p-7 md:p-10" role="status"><CheckCircle2 className="text-[#b9a47a]" size={24} /><h2 className="serif text-3xl">Enquiry received.</h2><p className="text-sm leading-6 text-neutral-400">Thank you. The chauffeur team will review your message and respond using the details provided.</p></div>;

  return <form onSubmit={submit} className="card grid gap-5 p-7 md:p-10">
    <Field label="Name" name="name" autoComplete="name" required />
    <Field label="Email" name="email" type="email" autoComplete="email" required />
    <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
    <label className="grid gap-2 text-[10px] uppercase tracking-[.16em] text-neutral-400">Message<textarea name="message" rows={6} minLength={10} maxLength={3000} required /></label>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
    {status === 'error' && <p role="alert" className="text-sm text-red-300">We could not send your enquiry. Please try again.</p>}
    <button className="btn justify-self-start" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <Loader2 className="animate-spin" size={15} /> : <ArrowUpRight size={15} />} {status === 'sending' ? 'Sending' : 'Send enquiry'}</button>
  </form>;
}

function Field({ label, name, type = 'text', autoComplete, required = false }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean }) {
  return <label className="grid gap-2 text-[10px] uppercase tracking-[.16em] text-neutral-400">{label}<input name={name} type={type} autoComplete={autoComplete} required={required} /></label>;
}