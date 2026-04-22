import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/domain';


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: ['GPTBot', 'CCBot', 'Google-Extended'],
                allow: '/',
            },
        ],
        sitemap: `${getBaseUrl()}/sitemap.xml`,
    };
}
