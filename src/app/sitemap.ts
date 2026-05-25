import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';
import { DIRECTORY_PLATFORMS, DIRECTORY_LOCATIONS, DIRECTORY_ROLES } from '@/lib/constants';
import { getBaseUrl } from '@/lib/domain';
import { desc } from 'drizzle-orm';

// export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = await getBaseUrl();

    // 1. Core pages (always present)
    const routes = ['', '/jobs', '/explore', '/about', '/pricing', '/privacy', '/terms', '/job-map'].map((route: string) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // Guard: skip DB routes if DATABASE_URL is not configured
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        return routes;
    }

    try {
        // Parallelize DB queries for speed
        const [dbCities, dbRoles] = await Promise.all([
            db.select().from(cities).orderBy(desc(cities.population)).limit(500),
            db.select().from(jobRoles).limit(200)
        ]);

        // 2. Location Hubs (Only if jobs > 0)
        const locationHubs = Array.isArray(dbCities)
            ? dbCities.filter((c: any) => (c.jobCount || 0) > 0).map((city: any) => ({
                url: `${baseUrl}/jobs/location/${city.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }))
            : [];

        // 3. Role Hubs (Always include standardized roles)
        const roleHubs = Array.isArray(dbRoles)
            ? dbRoles.map((role: any) => ({
                url: `${baseUrl}/jobs/role/${role.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }))
            : [];

        // 4. Job Combo Pages (Programmatic SEO)
        // High Intent: Top 50 cities and Top 100 roles (5000 pages)
        const topCities = Array.isArray(dbCities)
            ? dbCities.filter((c: any) => (c.jobCount || 0) > 0).slice(0, 50)
            : [];
        const topRoles = Array.isArray(dbRoles) ? dbRoles.slice(0, 100) : [];

        const jobRoutes: MetadataRoute.Sitemap = [];

        for (const city of topCities) {
            for (const role of topRoles) {
                jobRoutes.push({
                    url: `${baseUrl}/jobs/${role.slug}-in-${city.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: (city.population || 0) > 1000000 ? 0.8 : 0.6,
                });
            }
        }

        // 5. Platform-Specific Pages (Focus on major platforms and top markets)
        for (const platform of DIRECTORY_PLATFORMS) {
            jobRoutes.push({
                url: `${baseUrl}/jobs/platform/${platform.slug}`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.9,
            });

            // Platform combos (Capped for crawl budget: Top 10 cities x Top 20 roles = 200 per platform)
            for (const city of topCities.slice(0, 10)) {
                for (const role of topRoles.slice(0, 20)) {
                    jobRoutes.push({
                        url: `${baseUrl}/jobs/platform/${platform.slug}/${role.slug}/${city.slug}`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly' as const,
                        priority: 0.7,
                    });
                }
            }
        }

        // 6. Company Hub Pages (Tier 2 Scaling)
        const companyDomains = new Set<string>();
        DIRECTORY_LOCATIONS.forEach((loc: any) => {
            if ((loc.jobCount || 0) > 0 && loc.companies) {
                loc.companies.forEach((d: string) => companyDomains.add(d));
            }
        });

        Array.from(companyDomains).slice(0, 500).forEach((domain: string) => {
            jobRoutes.push({
                url: `${baseUrl}/company/${domain}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            });
        });

        return [...routes, ...locationHubs, ...roleHubs, ...jobRoutes];
    } catch (error) {
        console.error('[sitemap] DB error:', error);
        return routes;
    }
}
