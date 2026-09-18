import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Hourly Chauffeur Melbourne',
  description:
    'Hourly chauffeur service in Melbourne for meetings, events, shopping, multi-stop travel and flexible private transport across Melbourne and Victoria.',
  path: '/services/hourly-chauffeur-melbourne',
});

const faqs = [
  {
    question: 'When is hourly chauffeur service useful?',
    answer:
      'Hourly chauffeur service is useful for meetings, shopping, events, multi-stop private travel and flexible bookings where you need a vehicle and driver available for several hours.',
  },
  {
    question: 'Can I use an hourly chauffeur for multiple stops?',
    answer:
      'Yes. The service is especially practical for multi-stop itineraries, from business appointments to private outings and event schedules.',
  },
  {
    question: 'Is hourly chauffeur service suitable for private occasions?',
    answer:
      'It works well for special occasions, family outings, event attendance and any day where you want a professional driver available for the full duration of your plans.',
  },
  {
    question: 'Do you offer flexible city bookings?',
    answer:
      'Yes. We support flexible hourly chauffeur bookings across Melbourne for both business and personal travel needs.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Flexible chauffeur hire"
      title="Hourly Chauffeur Service in Melbourne"
      intro="An hourly chauffeur is a practical way to maintain flexibility without compromising comfort or punctuality. It is well suited to business meetings, events, multiple stops, shopping, leisure and any private itinerary that requires a premium driver on standby."
      highlights={[
        { title: 'Flexible timing', description: 'A dedicated chauffeur available for the duration of your day or itinerary.' },
        { title: 'Multiple destinations', description: 'Ideal for meetings, shopping, hotel transfers and multi-stop city routes across Melbourne.' },
        { title: 'Private and business use', description: 'Suitable for executive schedules, family plans and events where convenience matters.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Hourly Chauffeur Melbourne' },
      ]}
      ctaLabel="Book Hourly Chauffeur"
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
