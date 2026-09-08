'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminBackButton() {
  const router = useRouter();

  return (
    <button type="button" className="btn secondary" onClick={() => router.back()}>
      <ArrowLeft size={15} />
      Back
    </button>
  );
}