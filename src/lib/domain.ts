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

    // 3. Request-based host detection (most accurate for failover)
    if (request) {
        const host = request.headers.get('host');
        if (host) {
            const protocol = host.includes('localhost') ? 'http' : 'https';
            return `${protocol}://${host}`;
        }
    }

    // 4. Default fallbacks (prioritize Netlify as main link if nothing else works)
    return 'https://hiddenjobs.netlify.app';
}
