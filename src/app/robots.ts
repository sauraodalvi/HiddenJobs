import { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '@/lib/domain';

// Force static generation — robots.txt must never call headers()
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    // CRITICAL: Use canonical URL for sitemap reference
    const baseUrl = getCanonicalBaseUrl();

    return {
        rules: [
            // ── Main crawl rules ─────────────────────────────────────────────
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    // Internal API routes — should never be indexed
                    '/api/',
                    // Test/debug pages — internal tooling only
                    '/test-env/',
                    '/test-search/',
                    // Admin-like pages
                    '/admin/',
                    // Prevent indexing of pages with tracking query params
                    '/*?utm_*',
                    '/*?ref=*',
                    '/*?source=*',
                    '/*?campaign=*',
                    // Prevent duplicate search result pages
                    '/*?q=*',
                    '/*?search=*',
                    '/*?query=*',
                    // Next.js internal paths
                    '/_next/',
                ],
            },
            // ── AI bots: Allow content pages for GEO (Generative Engine Optimization) ──
            // Only block from API routes and internal pages to protect crawl budget
            // Allowing AI bots on content improves visibility in ChatGPT, Perplexity, etc.
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            {
                userAgent: 'Applebot-Extended',
                allow: '/',
                disallow: ['/api/', '/test-env/', '/test-search/', '/admin/'],
            },
            // CCBot is more aggressive — keep it limited
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
