import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Avalon Airport to Melbourne Transfer',
  description:
    'Useful information for arranging an Avalon Airport to Melbourne chauffeur transfer with a comfortable, private and timed travel experience.',
  path: '/blog/avalon-airport-to-melbourne-transfer',
});

export default function Page() {
  return (
    <main className="pt-28">
      <div className="container section max-w-4xl">
        <div className="eyebrow">Guide</div>
        <h1 className="serif mt-5 text-5xl md:text-6xl">Avalon Airport to Melbourne Transfer</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          Avalon Airport is commonly used for regional and business travel, and the journey into Melbourne can be easier when planned around a private chauffeur service. Whether you are heading to the CBD or a nearby suburban destination, a timed pickup helps keep the day consistent and efficient.
        </p>
        <div className="mt-12 space-y-6 text-neutral-300 leading-7">
          <p>For business travellers, a chauffeur service can support meetings and appointments without the friction of negotiating traffic or managing parking. For private travellers, it creates a more relaxed start or finish to the trip, especially after a flight or before an important event.</p>
          <p>Planning ahead means your chauffeur can be arranged around your actual arrival window, helping you move from the terminal to the city in a calm, comfortable and coordinated way.</p>
        </div>
        <div className="mt-12 flex gap-4">
          <Link href="/#quote-form" className="btn">Request airport transfer</Link>
          <Link href="/blog" className="btn secondary">Back to blog</Link>
        </div>
      </div>
    </main>
  );
}
