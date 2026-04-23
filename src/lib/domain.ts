import { headers } from 'next/headers';

/**
 * Returns the current base URL for the application.
 * Priority: 
 * 1. Request headers (dynamic)
 * 2. NEXT_PUBLIC_SITE_URL environment variable
 * 3. Netlify specific URL
 * 4. Vercel deployment URL
 * 5. Fallback to a default
 */
export async function getBaseUrl(request?: Request): Promise<string> {
    // 1. Request-based host detection (Highest Priority for dynamic support)
    try {
        const host = request
            ? request.headers.get('host')
            : (await headers()).get('host');

        if (host) {
            const protocol = host.includes('localhost') ? 'http' : 'https';
            return `${protocol}://${host}`;
        }
    } catch (e) {
        // Fallback if headers() is called in a context where it's not available
        // (e.g. during certain static optimization phases)
    }

    // 2. Explicitly configured site URL
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    }

    // 3. Netlify specific URL
    if (process.env.URL) {
        return process.env.URL.replace(/\/$/, '');
    }

    // 4. Vercel deployment URL
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // 5. Default fallback
    return 'https://hiddenjobs.netlify.app';
}
