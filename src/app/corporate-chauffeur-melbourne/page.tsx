import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Corporate Chauffeur Melbourne',
  description:
    'Corporate chauffeur service in Melbourne for executive travel, meetings, airport transfers and discreet business journeys across the city and Victoria.',
  path: '/corporate-chauffeur-melbourne',
});

const faqs = [
  {
    question: 'Can I book a corporate chauffeur for meetings and airport transfers?',
    answer:
      'Yes. Our corporate chauffeur service supports executive meetings, airport travel and point-to-point bookings across Melbourne and surrounding business districts.',
  },
  {
    question: 'Do you offer discreet chauffeur service for executives?',
    answer:
      'Yes. Privacy, reliability and professionalism are core to the experience, especially for executive travel and confidential business movements.',
  },
  {
    question: 'Can I book for multiple team members?',
    answer:
      'Depending on your itinerary, we can organise transport for individual executives or small teams travelling between offices, meetings, events and airports.',
  },
  {
    question: 'What areas do you service for corporate travel?',
    answer:
      'We service the Melbourne CBD, Southbank, Docklands, inner east and key business destinations across Victoria, with airport and point-to-point routes available as needed.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Corporate travel"
      title="Corporate Chauffeur Service in Melbourne"
      intro="When your schedule is packed and your time matters, a professional chauffeur service helps you travel with confidence. We support executive transport, airport transfers, client pickup and business travel across Melbourne, offering punctual, polished and discreet service from point to point."
      highlights={[
        { title: 'Executive travel', description: 'Confidential, professional chauffeur transport for meetings, presentations and business occasions.' },
        { title: 'Airport transfers', description: 'Seamless airport pickup and drop-off for business travel, conferences and time-sensitive schedules.' },
        { title: 'Point-to-point bookings', description: 'Efficient travel between offices, hotels, events and client locations across the city.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Corporate Chauffeur Melbourne' },
      ]}
      ctaLabel="Enquire About Corporate Chauffeur Service"
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
