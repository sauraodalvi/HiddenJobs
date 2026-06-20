import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';
import { DIRECTORY_PLATFORMS, DIRECTORY_LOCATIONS, DIRECTORY_ROLES } from '@/lib/constants';
import { getCanonicalBaseUrl } from '@/lib/domain';
import { desc, gt, InferSelectModel } from 'drizzle-orm';

type City = InferSelectModel<typeof cities>;
type JobRole = InferSelectModel<typeof jobRoles>;

// Force static generation — sitemap should never trigger a 5xx from headers()
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // CRITICAL: Use canonical URL, never request-derived URL
    // This prevents sitemap entries from pointing to preview/Vercel URLs
    const baseUrl = getCanonicalBaseUrl();

    // ── 1. Core static pages (always indexed) ────────────────────────────────
    const coreRoutes: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/explore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        // NOTE: /job-map excluded — requires JavaScript/WebGL, Google cannot render it
        // NOTE: /test-env, /test-search excluded — internal pages, should not be indexed
    ];

    // ── 2. Platform hub pages (always indexed — high-value) ──────────────────
    const platformRoutes: MetadataRoute.Sitemap = DIRECTORY_PLATFORMS.map(platform => ({
        url: `${baseUrl}/jobs/platform/${platform.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    // ── 3. Role hub pages (always indexed — high-value) ──────────────────────
    const roleRoutes: MetadataRoute.Sitemap = DIRECTORY_ROLES.map(role => ({
        url: `${baseUrl}/jobs/role/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // ── 4. Location hub pages (only locations with jobs > 0) ─────────────────
    const locationRoutes: MetadataRoute.Sitemap = DIRECTORY_LOCATIONS
        .filter(loc => (loc.jobCount || 0) > 0 || loc.slug === 'remote')
        .map(loc => ({
            url: `${baseUrl}/jobs/location/${loc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: loc.slug === 'remote' ? 0.9 : 0.85,
        }));

    // ── 5. Company hub pages (curated list from constants) ───────────────────
    const companyDomains = new Set<string>();
    DIRECTORY_LOCATIONS.forEach(loc => {
        if (loc.companies) {
            loc.companies.forEach(d => companyDomains.add(d));
        }
    });
    const companyRoutes: MetadataRoute.Sitemap = Array.from(companyDomains).map(domain => ({
        url: `${baseUrl}/company/${domain}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Guard: skip DB routes if DATABASE_URL is not configured
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        return [...coreRoutes, ...platformRoutes, ...roleRoutes, ...locationRoutes, ...companyRoutes];
    }

    // ── 6. Job combo pages from DB (only high-value, indexed pages) ──────────
    // RULE: Only include pages where jobCount > 0 (noindex pages must not appear in sitemap)
    // RULE: Never include /jobs/platform/[platform]/[role]/[location] — those are redirects
    const jobComboRoutes: MetadataRoute.Sitemap = [];

    try {
        // Parallelize DB queries for speed, with a 5s timeout safety net
        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('DB timeout')), 5000)
        );

        const dbQuery = Promise.all([
            db.select().from(cities).where(gt(cities.population, 0)).orderBy(desc(cities.population)).limit(50),
            db.select().from(jobRoles).limit(100),
        ]);

        const [dbCities, dbRoles] = await Promise.race([dbQuery, timeout]) as [City[], JobRole[]];

        // Only include city-role combos where city has jobs
        const indexableCities = Array.isArray(dbCities)
            ? dbCities.filter((c: any) => (c.jobCount || 0) > 0)
            : [];

        const topRoles = Array.isArray(dbRoles) ? dbRoles : [];

        // Cap at 5000 job combos total to respect crawl budget
        let count = 0;
        const MAX_JOB_COMBOS = 5000;

        for (const city of indexableCities) {
            if (count >= MAX_JOB_COMBOS) break;
            for (const role of topRoles) {
                if (count >= MAX_JOB_COMBOS) break;
                jobComboRoutes.push({
                    url: `${baseUrl}/jobs/${role.slug}-in-${city.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: (city.population || 0) > 1_000_000 ? 0.8 : 0.65,
                });
                count++;
            }
        }
    } catch (error) {
        // DB unavailable or timed out — return static routes only, never 500
        console.error('[sitemap] DB error, using static routes only:', error);
    }

    return [
        ...coreRoutes,
        ...platformRoutes,
        ...roleRoutes,
        ...locationRoutes,
        ...companyRoutes,
        ...jobComboRoutes,
    ];
}
