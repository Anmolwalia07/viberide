import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Point-to-Point Chauffeur Melbourne',
  description:
    'Private point-to-point chauffeur service in Melbourne for direct travel between destinations, airports, meetings and events with a premium, stress-free experience.',
  path: '/point-to-point-chauffeur',
});

const faqs = [
  {
    question: 'What is point-to-point chauffeur service?',
    answer:
      'Point-to-point chauffeur service is a direct private transfer between two destinations, ideal for airport runs, business travel and seamless city-to-city journeys without the need to manage the drive yourself.',
  },
  {
    question: 'Is this service good for airport transfers?',
    answer:
      'Yes. It is commonly used for airport pickups and drop-offs as well as travel between hotels, offices, events and private addresses.',
  },
  {
    question: 'Can I book one-way travel?',
    answer:
      'Yes. Point-to-point service is designed for direct one-way or scheduled trips, making it a straightforward option for both business and private travel.',
  },
  {
    question: 'Do you service Melbourne suburbs and nearby destinations?',
    answer:
      'We support point-to-point travel across Melbourne and select Victoria routes, helping travellers move smoothly between major destinations and suburbs.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Private transfers"
      title="Private Point-to-Point Chauffeur Service"
      intro="A point-to-point chauffeur service is the simplest way to move from one destination to another without the distractions of driving, parking or timetables. It is ideal for executive travel, airport routes, business meetings, hotel transfers and private journeys around Melbourne."
      highlights={[
        { title: 'Direct travel', description: 'Single-leg journeys between destinations with a professional chauffeur handling the details of the route.' },
        { title: 'Business-ready', description: 'Ideal for office transfers, client pickup, meetings and airport connections across Melbourne.' },
        { title: 'Comfort-focused', description: 'Tailored to a premium, efficient and stress-free travel experience from pickup to drop-off.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Point-to-Point Chauffeur' },
      ]}
      ctaLabel="Book Point-to-Point Chauffeur"
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
