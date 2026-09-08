import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HomeBookingForm } from './HomeBookingForm';

export function Hero() {
  return (
    <section className="relative min-h-[780px] overflow-hidden pt-28 md:min-h-[820px] md:pt-32">
      <Image
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=82"
        alt="Luxury vehicle on a cinematic road"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-black/20" />

      <div className="relative container flex min-h-[650px] items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_460px] xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-20">

          {/* LEFT */}
          <div className="max-w-3xl">
            <div className="eyebrow">
              Private chauffeur service · Melbourne
            </div>

            <h1 className="serif mt-6 text-6xl leading-[0.88] md:text-8xl lg:text-9xl">
              Arrive in
              <br />
              <em>style.</em>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-neutral-300 md:text-lg">
              Professional chauffeurs, premium vehicles and considered
              service for airport transfers, corporate travel and private
              journeys.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/booking" className="btn">
                Book a Chauffeur
                <ArrowUpRight size={15} />
              </Link>

              <Link href="/services" className="btn secondary">
                Explore Services
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              <span>Professional chauffeurs</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Premium vehicles</span>
              <span className="hidden sm:inline h-px w-8 bg-white/20" />
              <span className="hidden sm:inline">Private journeys</span>
            </div>
          </div>

          {/* RIGHT */}
          <div
            id="request"
            className="w-full scroll-mt-24 lg:justify-self-end"
          >
            <HomeBookingForm requestType="QUOTED" />
          </div>

        </div>
      </div>
    </section>
  );
}