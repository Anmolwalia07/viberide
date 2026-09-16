import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import type { Metadata } from 'next';

const details: Record<string, string> = {
  'airport-transfers': 'Arrive at the terminal composed. A professional Melbourne airport chauffeur experience planned around pickup timing, luggage and the practical realities of air travel.',
  'corporate-chauffeur': 'Move between meetings, offices, hotels and airports with a private corporate chauffeur experience designed for focus, discretion and schedule control across Melbourne.',
  'weddings-events': 'Make arrivals and departures part of the occasion. Premium chauffeur transport to support wedding parties, guests, productions and special events.',
  'hourly-chauffeur': 'Keep the car and chauffeur available while your itinerary changes. Ideal for multi-stop days, meetings, shopping, events and flexible private travel around Victoria.',
  'point-to-point': 'A refined private transfer between any two destinations. Whether navigating the CBD or travelling to regional Victoria, experience reliable, seamless point-to-point transportation.',
  'private-chauffeur': 'Dedicated, discreet private chauffeur services in Melbourne for individuals and families requiring seamless travel without compromise.'
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { services } = getSiteContent();
  const item = services.find((service) => service[2] === `/services/${slug}`);

  if (!item || !details[slug]) {
    return {};
  }

  return {
    title: `${item[0]} Melbourne`,
    description: details[slug],
  };
}

export function generateStaticParams() {
  return Object.keys(details).map((slug) => ({ slug }));
}

export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { services } = getSiteContent();
  const item = services.find((service) => service[2] === `/services/${slug}`);

  if (!item || !details[slug]) return notFound();

  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Premium Chauffeur Service</div>
        <h1 className="serif mt-5 max-w-5xl text-6xl md:text-8xl">
          {item[0]}
          <br />
          <em>done differently.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
          {details[slug]}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Professional', desc: 'Expertly trained Melbourne chauffeurs ensuring absolute privacy and safety.' },
            { title: 'Comfort', desc: 'A meticulously maintained luxury fleet designed for relaxation or productivity.' },
            { title: 'Reliability', desc: 'Punctual, precise routing and clear communication from request to arrival.' }
          ].map((x, i) => (
            <div className="card p-7" key={x.title}>
              <div className="eyebrow">0{i + 1}</div>
              <h2 className="serif mt-8 text-3xl">{x.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                {x.desc}
              </p>
            </div>
          ))}
        </div>

        <Link href="/#quote-form" className="btn mt-12">
          GET A QUOTE
        </Link>
      </div>
    </main>
  );
}
