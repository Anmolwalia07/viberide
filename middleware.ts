import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/admin') {
		return NextResponse.next();
	}

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !anonKey) {
		return NextResponse.redirect(new URL('/admin', request.url));
	}

	const response = NextResponse.next({ request });
	const supabase = createServerClient(url, anonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookies) {
				cookies.forEach(({ name, value, options }) => {
					request.cookies.set(name, value);
					response.cookies.set(name, value, options);
				});
			},
		},
	});

	const { data: userData } = await supabase.auth.getUser();
	const user = userData.user;

	if (!user) {
		return NextResponse.redirect(new URL('/admin', request.url));
	}

	const { data: admin } = await supabase
		.from('admins')
		.select('id')
		.eq('id', user.id)
		.maybeSingle();

	if (!admin) {
		return NextResponse.redirect(new URL('/admin', request.url));
	}

	return response;
}

export const config = { matcher: ['/admin/:path*'] };
