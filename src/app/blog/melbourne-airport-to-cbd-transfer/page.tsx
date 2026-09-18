import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Melbourne Airport to CBD Transfer',
  description:
    'A practical guide to planning a Melbourne Airport to CBD chauffeur transfer for business or private travel in Melbourne.',
  path: '/blog/melbourne-airport-to-cbd-transfer',
});

export default function Page() {
  return (
    <main className="pt-28">
      <div className="container section max-w-4xl">
        <div className="eyebrow">Guide</div>
        <h1 className="serif mt-5 text-5xl md:text-6xl">Melbourne Airport to CBD Transfer</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          Travelling from Melbourne Airport to the CBD is a common route for business travellers, conference delegates and visitors arriving into the city. The most efficient and comfortable option is often a dedicated chauffeur service, especially when timing and luggage matter.
        </p>
        <div className="mt-12 space-y-6 text-neutral-300 leading-7">
          <p>By planning your pickup around your landing time, you can move from the terminal to your desired CBD destination with less stress and fewer surprises. This is particularly useful for early morning flights, late arrivals or meetings that require a prompt, polished arrival.</p>
          <p>Airport transfers into the CBD can also support onward travel to Southbank, Docklands, Richmond or nearby commercial districts. A direct private route allows you to settle in and start your day without the friction of waiting for public transport or managing your own vehicle.</p>
        </div>
        <div className="mt-12 flex gap-4">
          <Link href="/#quote-form" className="btn">Book the route</Link>
          <Link href="/blog" className="btn secondary">Back to blog</Link>
        </div>
      </div>
    </main>
  );
}
