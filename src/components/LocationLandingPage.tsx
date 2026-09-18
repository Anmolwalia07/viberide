import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { SeoJsonLd } from '@/components/SeoJsonLd';

type FAQItem = {
  question: string;
  answer: string;
};

type LocationLandingPageProps = {
  title: string;
  intro: string;
  highlights: string[];
  faqs: FAQItem[];
  breadcrumbs: { label: string; href?: string }[];
  relatedLinks?: { label: string; href: string }[];
  jsonLd?: Record<string, unknown>;
};

export function LocationLandingPage({
  title,
  intro,
  highlights,
  faqs,
  relatedLinks = [],
  jsonLd,
}: LocationLandingPageProps) {
  return (
    <main className="pt-28">
      <div className="container section">
        <div className="eyebrow">Service area</div>
        <h1 className="serif mt-5 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300">{intro}</p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/#quote-form" className="btn">
            Book this route
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/service-areas" className="btn secondary">
            View all service areas
          </Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-white/10 bg-[#111214] p-6 text-sm leading-6 text-neutral-300">
              {highlight}
            </div>
          ))}
        </div>

        {relatedLinks.length > 0 && (
          <div className="mt-16">
            <div className="eyebrow">Related services</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="btn secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {jsonLd && <SeoJsonLd data={jsonLd} />}

        <section className="mt-20">
          <div className="mb-8">
            <div className="eyebrow">FAQs</div>
            <h2 className="serif mt-3 text-3xl md:text-4xl text-white">Questions about this area</h2>
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
