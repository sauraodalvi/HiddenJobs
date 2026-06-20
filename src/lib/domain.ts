import { headers } from 'next/headers';

/**
 * The canonical production domain used for self-referencing canonical tags,
 * sitemap entries, and structured data. This function NEVER reads request headers
 * — it only uses environment variables or the hard-coded production fallback.
 *
 * Use this in:
 *   - generateMetadata() alternates.canonical
 *   - sitemap.ts URLs
 *   - JSON-LD schema URLs
 *
 * REQUIRED: Set NEXT_PUBLIC_SITE_URL=https://hiddenjobs.netlify.app in both
 * Netlify AND Vercel environment variables to ensure consistent canonicals.
 */
export function getCanonicalBaseUrl(): string {
    // Always enforce the production domain for canonicals, sitemaps, and JSON-LD structured data.
    // This prevents sitemap validation errors when building on platforms like Vercel with different hostnames.
    return 'https://hiddenjobs.netlify.app';
}

/**
 * Returns the current base URL for the application at runtime.
 * Uses request headers for dynamic host detection (e.g., for API responses).
 *
 * DO NOT use this for canonical tags or sitemap entries — use getCanonicalBaseUrl() instead.
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

    // 5. Configured fallback URL (cross-platform failover)
    if (process.env.NEXT_PUBLIC_FALLBACK_URL) {
        return process.env.NEXT_PUBLIC_FALLBACK_URL.replace(/\/$/, '');
    }

    // 6. Hard default
    return 'https://hiddenjobs.netlify.app';
}
