import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host');

    // If the request is coming from the Netlify domain, redirect to Vercel
    if (hostname && (hostname.includes('hiddenjobs.netlify.app') || hostname.includes('hidden-apply.netlify.app'))) {
        const url = request.nextUrl.clone();
        url.hostname = 'hiddenjobs.vercel.app';
        url.port = ''; // Ensure no port is carried over (Netlify/Vercel standard)
        return NextResponse.redirect(url, 301); // Permanent Redirect for SEO
    }

    return NextResponse.next();
}

// Ensure middleware runs on all paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
