alter table business_settings
  add column if not exists whatsapp text;

create table if not exists contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW', 'READ', 'CLOSED')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_enquiries_status_idx on contact_enquiries(status);
create index if not exists contact_enquiries_created_at_idx on contact_enquiries(created_at desc);

alter table contact_enquiries enable row level security;

create policy "admins manage contact enquiries" on contact_enquiries
  for all to authenticated
  using (exists(select 1 from admins a where a.id = auth.uid()))
  with check (exists(select 1 from admins a where a.id = auth.uid()));