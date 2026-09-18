import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Luxury Car With Driver Melbourne',
  description:
    'Luxury car with driver in Melbourne for premium private travel, special occasions and discerning city journeys with a high-end chauffeur experience.',
  path: '/services/luxury-car-with-driver-melbourne',
});

const faqs = [
  {
    question: 'What does a luxury car with driver include?',
    answer:
      'It includes a private chauffeur and premium vehicle for your travel, helping you move in comfort while keeping the focus on your itinerary and privacy.',
  },
  {
    question: 'Is this suitable for private travel and events?',
    answer:
      'Yes. It is often chosen for special occasions, premium airport travel, executive bookings and leisurely city journeys where a more elevated travel experience is desired.',
  },
  {
    question: 'Can the vehicle be booked for business or leisure?',
    answer:
      'Yes. The service works for both business travel and private or celebratory occasions across Melbourne and Victoria.',
  },
  {
    question: 'How do I arrange a luxury car with driver?',
    answer:
      'Get in touch with Veloura to discuss your travel dates, destinations and preferred vehicle type so we can recommend the most suitable option.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Luxury travel"
      title="Luxury Car With Professional Driver in Melbourne"
      intro="A luxury car with driver offers a more considered way to travel through Melbourne. It is ideal for private appointments, airport journeys, special occasions and premium transportation where comfort, presentation and discretion matter."
      highlights={[
        { title: 'Discreet travel', description: 'A premium, professional journey with attention to privacy and smooth logistics.' },
        { title: 'Luxury experience', description: 'Comfortable, refined travel suitable for special days, business needs and premium city journeys.' },
        { title: 'Tailored use', description: 'Booking flexibility for airport transfers, private events and bespoke itineraries.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Luxury Car With Driver Melbourne' },
      ]}
      ctaLabel="Book a Luxury Car With Driver"
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
