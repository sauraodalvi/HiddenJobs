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

    // Dynamic Job Directory Pages
    const jobRoutes: MetadataRoute.Sitemap = [];

    DIRECTORY_PLATFORMS.forEach(platform => {
        DIRECTORY_ROLES.slice(0, 10).forEach(role => {
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

    return [...routes, ...jobRoutes];
}
