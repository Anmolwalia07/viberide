import Link from 'next/link';

import { site as defaultSite } from '@/config/site';

export function Footer({ site = defaultSite }: { site?: typeof defaultSite }) {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="container grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-sm tracking-[.25em] uppercase">{site.name}</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
            Premium chauffeur service across Melbourne and Victoria for airport travel, corporate journeys and private appointments.
          </p>
          <div className="mt-5 text-sm text-neutral-300">
            {site.phone && <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="block hover:text-white">{site.phone}</a>}
            {site.email && !site.email.startsWith('[') && (
              <a href={`mailto:${site.email}`} className="mt-2 block hover:text-white">{site.email}</a>
            )}
          </div>
        </div>

        <div>
          <div className="eyebrow">Explore</div>
          <div className="mt-5 grid gap-3 text-sm text-neutral-300">
            <Link href="/services">Services</Link>
            <Link href="/melbourne-airport-transfers">Melbourne Airport</Link>
            <Link href="/corporate-chauffeur-melbourne">Corporate</Link>
            <Link href="/fleet">Fleet</Link>
          </div>
        </div>

        <div>
          <div className="eyebrow">More</div>
          <div className="mt-5 grid gap-3 text-sm text-neutral-300">
            <Link href="/service-areas">Service Areas</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="container mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Built for premium Australian chauffeur service.</span>
      </div>
    </footer>
  );
}

