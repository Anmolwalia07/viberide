# VibeRide Chauffeurs

Static Next.js website for an Australian premium chauffeur service.

## Stack
Next.js · TypeScript · Tailwind CSS · Framer Motion-ready UI · Zod · Vercel

## Local development
1. Install dependencies with `npm install`.
2. Run `npm run dev`.
3. Visit `http://localhost:3000`.

The production build is configured for static export and writes the deployable site to `out/`.

## Content

Business details, services, fleet, FAQs, and service areas are maintained in `src/config/site.ts`. Update that file when business information changes.

Booking and contact forms open a prefilled email draft using the configured business email. No server, database, authentication, or admin panel is included.

## Checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Deployment

Run `npm run build`, then deploy the generated `out/` directory to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## Business information still required
Verified business name, phone, email, address, domain, social links, actual fleet models/images/capacities, operating service areas, booking/cancellation/payment policies, approved testimonials, and reviewed privacy/terms text.

## Notes
The site deliberately uses a simple email-draft workflow instead of pretending to persist bookings. Local pages are limited to useful service areas rather than thin SEO pages.
