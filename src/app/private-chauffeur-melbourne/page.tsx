import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Private Chauffeur Melbourne',
  description:
    'Private chauffeur service in Melbourne for city travel, airport journeys, events, leisure and tailored private appointments across Melbourne and Victoria.',
  path: '/private-chauffeur-melbourne',
});

const faqs = [
  {
    question: 'What is a private chauffeur service?',
    answer:
      'A private chauffeur service gives you a dedicated chauffeur and premium vehicle for your trip, helping you travel in comfort without the stress of navigating traffic, parking or organising transport on the day.',
  },
  {
    question: 'Can I book chauffeur travel for airport, city and leisure trips?',
    answer:
      'Yes. Private chauffeur bookings are ideal for airport transfers, city travel, event attendance, shopping days, local appointments and relaxed family outings.',
  },
  {
    question: 'Do you offer tailored private journeys?',
    answer:
      'We work with clients on itineraries that include multiple destinations, flexible timing and a premium, personalised travel experience.',
  },
  {
    question: 'Do you cover Melbourne suburbs and nearby areas?',
    answer:
      'Yes. VibeRide supports private travel across Melbourne and select Victoria destinations, including airport routes and key city and suburban locations.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Private travel"
      title="Private Chauffeur Service in Melbourne"
      intro="Whether you are travelling for business, private appointments or a special occasion, a private chauffeur service creates a smoother, more refined day. We arrange professional travel around your schedule, helping you move between locations without rushing or compromising comfort."
      highlights={[
        { title: 'City travel', description: 'Comfortable chauffeur journeys across Melbourne for appointments, leisure, shopping and business needs.' },
        { title: 'Airport travel', description: 'Private pickup and drop-off for airport journeys, designed around your flight and destination.' },
        { title: 'Flexible itineraries', description: 'Tailored private transport for multi-stop trips, special events and personal travel requirements.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Private Chauffeur Melbourne' },
      ]}
      ctaLabel="Book Private Chauffeur Service"
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
