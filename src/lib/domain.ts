/**
 * Returns the current base URL for the application.
 * Priority: 
 * 1. NEXT_PUBLIC_SITE_URL environment variable
 * 2. VERCEL_URL if running on Vercel
 * 3. Fallback to a default if nothing else is available
 */
export function getBaseUrl(request?: Request): string {
    // 1. Explicitly configured site URL
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    }

    // 2. Vercel deployment URL
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // 3. Fallback to request host if provided (useful in middleware/server components)
    if (request) {
        const host = request.headers.get('host');
        if (host) {
            const protocol = host.includes('localhost') ? 'http' : 'https';
            return `${protocol}://${host}`;
        }
    }

    // 4. Ultimate fallback (default to vercel for legacy compatibility if everything else fails)
    return 'https://hiddenjobs.vercel.app';
}
