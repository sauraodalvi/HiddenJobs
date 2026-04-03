import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';

// Force static generation for better reliability on Netlify
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://hiddenjobs.netlify.app';

    // 1. Core pages
    const routes = ['', '/jobs', '/explore'].map((route: string) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // 2. Location Hubs (All cities from DB)
    const dbCities = await db.select().from(cities);
    const locationHubs = dbCities.map((city: any) => ({
        url: `${baseUrl}/jobs/location/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 3. Role Hubs (All roles from DB)
    const dbRoles = await db.select().from(jobRoles);
    const roleHubs = dbRoles.map((role: any) => ({
        url: `${baseUrl}/jobs/role/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. Global Job Combo Pages ([role]-in-[city])
    // We only index the top 50,000 combinations in the main sitemap to avoid timeouts
    // For a true 10M+ scale, we would use sitemap index files
    const topCities = dbCities.slice(0, 100);
    const topRoles = dbRoles.slice(0, 500);

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
}
