import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | VibeRide Chauffeurs',
  description:
    'Discover VibeRide Chauffeurs — premium private chauffeur services designed around comfort, reliability and a refined travel experience in Melbourne.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | VibeRide Chauffeurs',
    description:
      'Discover VibeRide Chauffeurs — premium private chauffeur services designed around comfort, reliability and a refined travel experience in Melbourne.',
    url: 'https://viberide-chauffeurs.vercel.app/about',
    siteName: 'VibeRide Chauffeurs',
    type: 'website',
  },
};

export default function About() {
  return (
    <main className="bg-black pt-28 text-white">
      <div className="container section">

        {/* Eyebrow */}
        <div className="eyebrow">
          About VibeRide
        </div>

        {/* Main Heading */}
        <h1 className="serif mt-5 max-w-5xl text-6xl leading-[0.95] md:text-8xl">
          The art of
          <br />
          <em>arriving well.</em>
        </h1>

        {/* Intro */}
        <div className="mt-14 grid gap-12 md:grid-cols-2">

          <div>
            <p className="max-w-xl text-xl leading-8 text-neutral-300">
              VibeRide Chauffeurs is built around a simple idea:
              premium travel should feel effortless from the moment
              your journey begins to the moment you arrive.
            </p>
          </div>

          <div className="text-sm leading-7 text-neutral-400">
            <p>
              We provide private chauffeur travel in Melbourne for
              airport transfers, point-to-point journeys, corporate
              travel, events and occasions where comfort and a
              polished experience matter.
            </p>

            <p className="mt-5">
              Our approach is centred on professional service,
              comfortable travel and a seamless experience tailored
              around each journey.
            </p>
          </div>

        </div>

        {/* Philosophy */}
        <section className="mt-24 border-t border-white/10 pt-12">

          <div className="grid gap-12 md:grid-cols-3">

            {/* Service */}
            <div>
              <div className="eyebrow text-neutral-500">
                01
              </div>

              <h2 className="serif mt-4 text-3xl text-white">
                Professional service
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                Every journey is approached with attention to
                timing, communication and the details that make
                private travel feel effortless.
              </p>
            </div>

            {/* Comfort */}
            <div>
              <div className="eyebrow text-neutral-500">
                02
              </div>

              <h2 className="serif mt-4 text-3xl text-white">
                Comfort first
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                From airport transfers to longer private journeys,
                VibeRide is designed around a calm, comfortable and
                refined travel experience.
              </p>
            </div>

            {/* Personal */}
            <div>
              <div className="eyebrow text-neutral-500">
                03
              </div>

              <h2 className="serif mt-4 text-3xl text-white">
                Personal journeys
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-400">
                No two journeys are exactly the same. Our service is
                designed to adapt to your schedule, destination and
                individual travel requirements.
              </p>
            </div>

          </div>

        </section>

        {/* Experience */}
        <section className="mt-24 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2">

          <div>
            <div className="eyebrow text-neutral-500">
              Our approach
            </div>

            <h2 className="serif mt-4 max-w-xl text-4xl leading-tight md:text-5xl">
              More than getting
              <br />
              from A to B.
            </h2>
          </div>

          <div className="text-sm leading-7 text-neutral-400">
            <p>
              A chauffeur journey should be more than simply
              reaching your destination. It should give you the
              space to relax, prepare for the day or simply enjoy
              the journey.
            </p>

            <p className="mt-5">
              Whether you are travelling to or from Melbourne
              Airport, attending an important event, meeting
              clients or arranging private transportation, VibeRide
              focuses on making the journey feel smooth and
              considered.
            </p>
          </div>

        </section>

        {/* Closing CTA */}
        <section className="mt-24 border-t border-white/10 py-16">

          <div className="max-w-3xl">
            <div className="eyebrow text-neutral-500">
              VibeRide Chauffeurs
            </div>

            <h2 className="serif mt-4 text-4xl leading-tight md:text-6xl">
              Travel privately.
              <br />
              <em>Arrive effortlessly.</em>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-400">
              Tell us about your journey and let us take care of
              the road ahead.
            </p>

            <a
              href="/#quote-form"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#b9a47a]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-colors
                hover:bg-[#a69269]
              "
            >
              Get a Quote
            </a>
          </div>

        </section>

      </div>
    </main>
  );
}