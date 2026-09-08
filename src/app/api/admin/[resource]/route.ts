import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/admin';

const resources = {
  services: {
    table: 'services',
    schema: z.object({ name: z.string().trim().min(2).max(120), slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/), description: z.string().trim().max(1000), active: z.boolean() }),
  },
  vehicles: {
    table: 'vehicles',
    schema: z.object({ name: z.string().trim().min(2).max(120), category: z.string().trim().min(2).max(80), image_url: z.string().trim().url().or(z.literal('')), passenger_capacity: z.coerce.number().int().min(1).max(100), luggage_capacity: z.coerce.number().int().min(0).max(100), features: z.array(z.string().trim().min(1).max(120)).max(20), description: z.string().trim().max(1000), status: z.enum(['ACTIVE', 'INACTIVE']) }),
  },
  testimonials: {
    table: 'testimonials',
    schema: z.object({ customer_name: z.string().trim().min(2).max(120), quote: z.string().trim().min(10).max(1000), approved: z.boolean() }),
  },
  'service-areas': {
    table: 'service_areas',
    schema: z.object({ name: z.string().trim().min(2).max(120), slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/), description: z.string().trim().max(1000), active: z.boolean() }),
  },
} as const;

type Resource = keyof typeof resources;

function getResource(value: string) {
  return Object.prototype.hasOwnProperty.call(resources, value) ? resources[value as Resource] : null;
}

export async function GET(_request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource: resourceName } = await context.params;
  const resource = getResource(resourceName);
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { data, error } = await supabase.from(resource.table).select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Unable to load resource' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource: resourceName } = await context.params;
  const resource = getResource(resourceName);
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const parsed = resource.schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid resource data', details: parsed.error.flatten() }, { status: 400 });

  const { data, error } = await supabase.from(resource.table).insert(parsed.data as never).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource: resourceName } = await context.params;
  const resource = getResource(resourceName);
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await request.json();
  const id = typeof body.id === 'string' ? body.id : '';
  const parsed = resource.schema.partial().safeParse(body.data);
  if (!id || !parsed.success) return NextResponse.json({ error: 'Invalid resource update' }, { status: 400 });

  const { data, error } = await supabase.from(resource.table).update(parsed.data as never).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource: resourceName } = await context.params;
  const resource = getResource(resourceName);
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const { supabase, user } = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await request.json();
  if (typeof body.id !== 'string' || !body.id) return NextResponse.json({ error: 'Missing resource id' }, { status: 400 });

  const { error } = await supabase.from(resource.table).delete().eq('id', body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}