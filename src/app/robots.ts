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
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hiddenjobs.vercel.app'}/sitemap.xml`,
    };
}
