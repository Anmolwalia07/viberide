import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoJsonLd } from '@/components/SeoJsonLd';

type FAQItem = {
  question: string;
  answer: string;
};

type Highlight = {
  title: string;
  description: string;
};

type ServiceLandingPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: Highlight[];
  faqs: FAQItem[];
  breadcrumbs: { label: string; href?: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  jsonLd?: Record<string, unknown>;
};

export function ServiceLandingPage({
  eyebrow,
  title,
  intro,
  highlights,
  faqs,
  ctaLabel = 'Book Your Chauffeur',
  ctaHref = '/#quote-form',
  breadcrumbs,
  jsonLd,
}: ServiceLandingPageProps) {
  return (
    <main className="pt-28">
      <div className="container section">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="serif mt-5 max-w-5xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300">{intro}</p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href={ctaHref} className="btn">
            {ctaLabel}
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/services" className="btn secondary">
            Explore all services
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="card p-7">
              <div className="eyebrow">{item.title}</div>
              <p className="mt-4 text-sm leading-6 text-neutral-400">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="serif text-3xl md:text-4xl text-white">Why clients choose this service</h2>
            <p className="text-neutral-300 leading-7">
              VibeRide keeps each journey carefully planned around your schedule, route, and the level of privacy your trip requires. Whether you are travelling to the airport, moving between meetings, or making a special occasion feel seamless, our approach is built around punctuality, comfort and clear communication.
            </p>
            <p className="text-neutral-300 leading-7">
              We work with premium vehicles and considerate chauffeurs across Melbourne and Victoria, helping you move confidently between CBD destinations, regional travel, events and private appointments without the stress of traffic, parking or timing uncertainty.
            </p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-[#111214] p-7">
            <div className="eyebrow">Booking</div>
            <h3 className="serif mt-4 text-3xl text-white">Request a quote</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Tell us your departure, destination, date and any special requirements. We will confirm the most suitable vehicle and chauffeur for your travel.
            </p>
            <Link href={ctaHref} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d2bd8e] hover:text-[#e7d7b0]">
              {ctaLabel} <ArrowUpRight size={15} />
            </Link>
          </aside>
        </div>

        {jsonLd && <SeoJsonLd data={jsonLd} />}

        <section className="mt-20">
          <div className="mb-8">
            <div className="eyebrow">FAQs</div>
            <h2 className="serif mt-3 text-3xl md:text-4xl text-white">Common questions</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-[#0d0e10] p-6">
                <h3 className="text-base font-medium text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
