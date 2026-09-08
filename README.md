# [BUSINESS NAME] — Premium Chauffeur Website

Production-oriented Next.js App Router starter for an Australian chauffeur business.

## Stack
Next.js · TypeScript · Tailwind CSS · Supabase/PostgreSQL · Framer Motion · React Three Fiber-ready architecture · Zod · Vercel

## Local development
1. Copy `.env.example` to `.env.local` and fill verified values.
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Visit `http://localhost:3000`.

## Supabase
Create a Supabase project, then run `supabase/migrations/001_initial.sql`, `supabase/migrations/002_seed_initial_content.sql`, `supabase/migrations/003_booking_statuses.sql`, `supabase/migrations/004_contact_and_business_settings.sql`, and `supabase/migrations/005_booking_references.sql` in the SQL editor or via Supabase CLI. For a new project, run them in that order. For an existing project that already ran the earlier migrations, run only the migrations that have not yet been applied.

```sql
insert into public.admins (id)
select id from auth.users where email = 'verified-admin@example.com'
on conflict (id) do nothing;
```

The admin panel is available at `/admin`. The Auth account must exist in Supabase Authentication and its user ID must be present in `public.admins`.

The service role key is server-only. Never prefix it with `NEXT_PUBLIC_` and never send it to the browser.

## Checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Vercel
Import the Git repository, add the `.env.example` variables in Vercel Project Settings, deploy, then set the production domain in `NEXT_PUBLIC_SITE_URL`. Do not commit `.env.local`.

## Business information still required
Verified business name, phone, email, address, domain, social links, actual fleet models/images/capacities, operating service areas, pricing rules, booking/cancellation/payment policies, approved testimonials, privacy/terms text, Supabase project, email provider and optional Google Maps credentials.

## Notes
The booking UI currently provides a safe request workflow but does not persist records until the server-side Supabase booking action is connected. Email is intentionally abstracted until provider credentials are supplied. Local pages are deliberately limited to a few useful locations rather than generating thin SEO pages.
