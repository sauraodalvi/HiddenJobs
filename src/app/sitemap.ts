import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://hiddenjobs.netlify.app',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // In the future, we can programmatically add all Role Preset pages here
        // e.g. /search/product-manager
    ];
}
