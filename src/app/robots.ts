import { MetadataRoute } from 'next';

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
        sitemap: 'https://hiddenjobs.netlify.app/sitemap.xml',
    };
}
