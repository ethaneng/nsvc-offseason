import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
	const requestHeaders = new Headers(req.headers)
	requestHeaders.set("x-pathname", req.nextUrl.pathname)

	const res = NextResponse.next({request: {
		headers: requestHeaders
	}});
	
	const supabase = createMiddlewareClient<Database>({ req, res });
	await supabase.auth.getSession();
	return res;
}
