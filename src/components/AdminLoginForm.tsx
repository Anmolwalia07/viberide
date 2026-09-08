'use client';

import { FormEvent, useState } from 'react';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setError(result?.error ?? 'Unable to sign in.');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card grid max-w-md gap-5 p-7 md:p-10">
      <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[.16em] text-neutral-400">
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={15} /> : <LogIn size={15} />}
        Sign in
      </button>
    </form>
  );
}