import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/domain';


export default async function robots(): Promise<MetadataRoute.Robots> {
    const baseUrl = await getBaseUrl();
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'CCBot',
                    'Google-Extended',
                    'PerplexityBot',
                    'anthropic-ai',
                    'Claude-Web',
                    'Applebot-Extended',
                    'OAI-SearchBot'
                ],
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
