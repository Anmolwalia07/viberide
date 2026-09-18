import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Wedding Chauffeur Melbourne',
  description:
    'Wedding and event chauffeur service in Melbourne for premium arrivals, guest transport and seamless travel around important occasions.',
  path: '/services/wedding-chauffeur-melbourne',
});

const faqs = [
  {
    question: 'Can I book chauffeur transport for a wedding?',
    answer:
      'Yes. Veloura can support wedding travel, guest transportation and premium arrival and departure experiences for important occasions.',
  },
  {
    question: 'Is this service suitable for private events and celebrations?',
    answer:
      'Absolutely. We support private events, milestone celebrations and elegant transport planning where professionalism and smooth logistics matter.',
  },
  {
    question: 'Can the chauffeur wait for the event?',
    answer:
      'Depending on the booking and itinerary, we can coordinate a vehicle and chauffeur for the duration of your event or for scheduled pickups and drop-offs.',
  },
  {
    question: 'Do you offer guest transport for formal occasions?',
    answer:
      'Yes. Chauffeur transport can support guest arrival, departure and event movement in a polished and comfortable way.',
  },
];

export default function Page() {
  return (
    <ServiceLandingPage
      eyebrow="Weddings & events"
      title="Wedding & Event Chauffeur Service"
      intro="From private celebrations to elegant wedding day plans, chauffeur transport helps your day feel smooth, polished and seamlessly timed. A premium chauffeur service can support arrivals, departures, guest movement and private travel around the event without unnecessary stress."
      highlights={[
        { title: 'Wedding travel', description: 'Confident, polished transport for weddings, ceremonies and private celebrations.' },
        { title: 'Guest transport', description: 'Professional chauffeur support for guests travelling to and from your event or venue.' },
        { title: 'Premium arrivals', description: 'Create a refined first impression with a polished arrival and departure experience.' },
      ]}
      faqs={faqs}
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Wedding Chauffeur Melbourne' },
      ]}
      ctaLabel="Book Wedding Chauffeur"
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
