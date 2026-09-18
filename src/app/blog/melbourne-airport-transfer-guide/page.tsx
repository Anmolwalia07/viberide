import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Melbourne Airport Transfer Guide',
  description:
    'Helpful guide to planning a smooth Melbourne Airport transfer for flights, CBD travel, corporate trips and private chauffeur bookings.',
  path: '/blog/melbourne-airport-transfer-guide',
});

export default function Page() {
  return (
    <main className="pt-28">
      <div className="container section max-w-4xl">
        <div className="eyebrow">Guide</div>
        <h1 className="serif mt-5 text-5xl md:text-6xl">Melbourne Airport Transfer Guide</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          Planning your airport journey in advance helps keep travel smooth, especially during peak times and busy periods. For passengers moving between Tullamarine and the city, a private chauffeur can reduce delays and remove the stress of navigating traffic and parking.
        </p>
        <div className="mt-12 space-y-6 text-neutral-300 leading-7">
          <p>Before travel, confirm your pickup time, your destination, and whether you are travelling for work, family visits or a private appointment. This helps us match you with the right route and vehicle.</p>
          <p>For airport pickups, a chauffeur service is often useful when arriving after a long flight and wanting a direct, reliable transfer into the city or to a nearby business or residential address. For departures, it also helps you leave enough time to reach the terminal comfortably without racing the clock.</p>
          <p>Whether you are heading to the Melbourne CBD, Southbank, Docklands or a suburb such as Richmond or South Yarra, a private chauffeur service can keep the travel experience smooth from start to finish.</p>
        </div>
        <div className="mt-12 flex gap-4">
          <Link href="/#quote-form" className="btn">Book a transfer</Link>
          <Link href="/blog" className="btn secondary">Back to blog</Link>
        </div>
      </div>
    </main>
  );
}
