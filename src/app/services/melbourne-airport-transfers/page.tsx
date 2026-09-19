import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Melbourne Airport Transfers',
  description:
    'Private Melbourne Airport transfers for Tullamarine and Avalon arrivals, corporate travel, CBD routes and family transport with professional chauffeurs.',
  path: '/services/melbourne-airport-transfers',
  keywords: [
    'chauffeur service melbourne',
    'chauffeur cars melbourne',
    'Melbourne airport transfer',
    'airport transfer from melbourne airport to city',
    'melbourne airport to city transfer',
    'transfer melbourne airport to city',
    'private chauffeur Melbourne',
    'airport transfers Melbourne',
    'private car service for long distance travel cost in australia',
  ],
});

const faqs = [
  {
    question: 'Do you provide Melbourne Airport chauffeur services?',
    answer:
      'Yes. Veloura provides private chauffeur service to and from Melbourne Airport, including city and suburban drop-offs across Melbourne and Victoria.',
  },
  {
    question: 'Can I book an airport pickup for the CBD or Southbank?',
    answer:
      'Yes. Many clients book Melbourne Airport transfers to Melbourne CBD, Southbank, Docklands, Richmond, South Yarra and nearby business or residential locations.',
  },
  {
    question: 'Do you offer early or late airport transfers?',
    answer:
      'We plan around your flight schedule and travel requirements, helping with early morning departures, delayed flights and late-evening arrivals.',
  },
  {
    question: 'Are suitcases handled by the chauffeur?',
    answer:
      'Our chauffeurs are available for practical, comfortable door-to-door airport travel and can assist with suitcases as needed within the normal service arrangement.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Airport transfers"
      title="Private Melbourne Airport Transfers"
      intro="Travel to or from Melbourne Airport with a calm, reliable chauffeur service designed around your schedule, suitcase needs and destination. Whether you need a Melbourne airport to city transfer, an airport transfer from Melbourne Airport to the city, or a direct chauffeur service for the CBD, Southbank, Richmond, Moonee Ponds or a nearby business meeting, your airport travel is handled with privacy and precision."
      highlights={[
        { title: 'Melbourne Airport', description: 'Private pickup and drop-off for Tullamarine arrivals, departures and onward journeys.' },
        { title: 'CBD transfers', description: 'Direct chauffeur travel to the Melbourne CBD, Southbank, Docklands and surrounding commercial hubs.' },
        { title: 'Corporate-ready', description: 'Professional airport transfers for executives, teams and time-sensitive business travel.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Melbourne Airport Transfers' },
      ]}
      ctaLabel="Book Melbourne Airport Transfer"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  );
}
