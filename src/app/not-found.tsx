import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Explore our chauffeur services and airport transport options in Melbourne.',
  path: '/not-found',
});

export default function NotFoundPage() {
  return (
    <main className="pt-28">
      <div className="container section max-w-3xl">
        <div className="eyebrow">404</div>
        <h1 className="serif mt-5 text-5xl md:text-7xl">Page not found</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          The page you are looking for may have moved, or it may not exist in the current route structure.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn">Home</Link>
          <Link href="/services" className="btn secondary">Services</Link>
          <Link href="/melbourne-airport-transfers" className="btn secondary">Airport Transfers</Link>
          <Link href="/service-areas" className="btn secondary">Service Areas</Link>
        </div>
      </div>
    </main>
  );
}
