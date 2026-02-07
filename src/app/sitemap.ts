import { MetadataRoute } from 'next';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hiddenjobs.netlify.app';

    // Core pages
    const routes = [
        '',
        '/jobs',
        '/pricing',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // Aggregation Hubs
    const hubs: MetadataRoute.Sitemap = [];

    // Location Hubs
    DIRECTORY_LOCATIONS.forEach(loc => {
        hubs.push({
            url: `${baseUrl}/jobs/location/${loc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        });
    });

    // Role Hubs
    DIRECTORY_ROLES.forEach(role => {
        hubs.push({
            url: `${baseUrl}/jobs/role/${role.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        });
    });

    // Platform Hubs
    DIRECTORY_PLATFORMS.forEach(platform => {
        hubs.push({
            url: `${baseUrl}/jobs/platform/${platform.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        });
    });

    // Deep Dynamic Job Pages
    const jobRoutes: MetadataRoute.Sitemap = [];
    DIRECTORY_PLATFORMS.forEach(platform => {
        DIRECTORY_ROLES.forEach(role => {
            DIRECTORY_LOCATIONS.forEach(location => {
                jobRoutes.push({
                    url: `${baseUrl}/jobs/${platform.slug}/${role.slug}/${location.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                });
            });
        });
    });

    return [...routes, ...hubs, ...jobRoutes];
}
