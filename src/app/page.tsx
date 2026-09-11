import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';

import { Hero } from '@/components/Hero';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { faqs } from '@/config/site';
import { getSiteContent } from '@/lib/content';

const fleetImages = [
  'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
];

const featureImage =
  'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80';

export default function Home() {
  const { services, fleet, site } = getSiteContent();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
  };

  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* Structured Data                                                    */}
      {/* ------------------------------------------------------------------ */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Hero />

      {/* ------------------------------------------------------------------ */}
      {/* Services                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="A higher standard"
            title="Private travel, without the ordinary."
            body="From the first enquiry to the final arrival, every touchpoint is designed around comfort, discretion and reliability."
          />

          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
            {services.slice(0, 3).map((service, index) => {
              const [title, description, url] = service;

              return (
                <Reveal key={title}>
                  <Link
                    href={url}
                    className="group block min-h-[250px] bg-[#0b0c0d] p-8 transition hover:bg-[#101213]"
                  >
                    <div className="text-xs text-neutral-600">
                      0{index + 1}
                    </div>

                    <h3 className="serif mt-12 text-3xl">
                      {title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-neutral-400">
                      {description}
                    </p>

                    <div className="mt-7 text-xs uppercase tracking-[.16em] text-[#b9a47a] transition group-hover:text-[#d2bd8e]">
                      Explore service ↗
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/services" className="btn secondary">
              View all services
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Fleet                                                              */}
      {/* ------------------------------------------------------------------ */}

      <section className="section bg-[#f5f3ee] text-[#0b0c0d]">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-end">
            <SectionHeader
              eyebrow="The fleet"
              title="Quiet confidence on the road."
              body="A flexible fleet of premium vehicles designed for executive travel, airport transfers, private journeys and group transportation."
            />

            <Link
              href="/fleet"
              className="justify-self-start btn"
            >
              View fleet
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {fleet.map((vehicle, index) => (
              <Reveal key={vehicle.id}>
                <div className="overflow-hidden border border-black/10 bg-white p-7">
                  {/* Vehicle image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                    <Image
                      src={vehicle.imageUrl || fleetImages[index % fleetImages.length]}
                      alt={vehicle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 hover:scale-105"
                      unoptimized={Boolean(vehicle.imageUrl)}
                    />
                  </div>

                  {/* Vehicle information */}
                  <div className="mt-6 text-xs uppercase tracking-[.15em] text-neutral-500">
                    Premium Chauffeur Vehicle
                  </div>

                  <h3 className="serif mt-2 text-3xl">
                    {vehicle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-5 flex gap-5 text-xs text-neutral-500">
                    <span>
                      {vehicle.capacity} passengers
                    </span>

                    <span>
                      {vehicle.luggageCapacity} luggage
                    </span>
                  </div>

                  <p className="mt-5 border-t border-black/10 pt-5 text-xs leading-5 text-neutral-500">
                    {vehicle.features}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Why Choose Us                                                      */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container grid gap-14 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Why choose us"
              title="Service that knows when to be seen — and when not to be."
            />

            <div className="mt-10 grid gap-6">
              {[
                'Professional presentation',
                'Comfort-first private travel',
                'Airport and corporate readiness',
                'Clear, considered communication',
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex gap-4 border-b border-white/10 pb-5"
                >
                  <Check
                    className="shrink-0 text-[#b9a47a]"
                    size={18}
                  />

                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[480px] overflow-hidden">
            <Image
              src={featureImage}
              alt="Premium luxury vehicle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How It Works                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section className="section border-y border-white/10">
        <div className="container grid gap-14 md:grid-cols-2">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps. No unnecessary friction."
          />

          <div className="grid gap-8">
            {[
              [
                '01',
                'Request',
                'Tell us where, when and how you would like to travel.',
              ],
              [
                '02',
                'Confirm',
                'The team reviews your request and confirms availability and commercial terms.',
              ],
              [
                '03',
                'Arrive',
                'Your chauffeur takes care of the journey while you focus on what matters.',
              ],
            ].map(([number, title, description]) => (
              <Reveal key={number}>
                <div className="flex gap-6">
                  <div className="text-xs text-[#b9a47a]">
                    {number}
                  </div>

                  <div>
                    <h3 className="serif text-3xl">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQs                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Frequently asked"
            title="The details, considered."
          />

          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <div
                key={question}
                className="bg-[#0b0c0d] p-7"
              >
                <h3 className="text-base font-medium">
                  {question}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Final CTA                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="section bg-[#f5f3ee] text-[#0b0c0d]">
        <div className="container text-center">
          <div className="eyebrow">
            Your next journey
          </div>

          <h2 className="serif mx-auto mt-4 max-w-3xl text-5xl md:text-7xl">
            Travel well.
            <br />
            Arrive composed.
          </h2>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#quote-form" className="btn">
              GET A QUOTE
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}