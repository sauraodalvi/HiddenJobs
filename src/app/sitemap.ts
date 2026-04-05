import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';

// Force static generation for better reliability on Netlify
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://hiddenjobs.vercel.app';

    // 1. Core pages (always present)
    const routes = ['', '/jobs', '/explore'].map((route: string) => ({
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
        // 2. Location Hubs
        const dbCities = await db.select().from(cities);
        const locationHubs = Array.isArray(dbCities) ? dbCities.map((city: any) => ({
            url: `${baseUrl}/jobs/location/${city.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        })) : [];

        // 3. Role Hubs
        const dbRoles = await db.select().from(jobRoles);
        const roleHubs = Array.isArray(dbRoles) ? dbRoles.map((role: any) => ({
            url: `${baseUrl}/jobs/role/${role.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        })) : [];

        // 4. Job Combo Pages (capped to prevent timeout)
        const topCities = Array.isArray(dbCities) ? dbCities.slice(0, 50) : [];
        const topRoles = Array.isArray(dbRoles) ? dbRoles.slice(0, 100) : [];

        const jobRoutes: MetadataRoute.Sitemap = [];
        for (const city of topCities) {
            for (const role of topRoles) {
                jobRoutes.push({
                    url: `${baseUrl}/jobs/${role.slug}-in-${city.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.7,
                });
            }
        }

        return [...routes, ...locationHubs, ...roleHubs, ...jobRoutes];
    } catch (error) {
        // If DB is unreachable, return only static routes to avoid a 500
        console.error('[sitemap] DB error, falling back to static routes:', error);
        return routes;
    }
}
