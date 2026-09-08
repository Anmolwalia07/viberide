'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminSignOut() {
  const router = useRouter();

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  }

  return <button type="button" onClick={signOut} className="btn secondary"><LogOut size={15} /> Sign out</button>;
}