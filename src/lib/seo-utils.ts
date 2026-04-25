import { db } from "./db";
import { cities, jobRoles, seoContent } from "./db/schema";
import { eq, and } from "drizzle-orm";
import { buildDorkComponents, assembleDork } from "./utils";
import { generateJobCityContent } from "./gemini";

import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from "./constants";

export interface PlatformSeoMetadata {
    title: string;
    description: string;
    platform: typeof DIRECTORY_PLATFORMS[0];
    updatedAt: string;
    robots: string;
}

export interface RegionalSeoMetadata {
    title: string;
    description: string;
    role: { id: number; name: string; slug: string };
    location: { id: number; name: string; slug: string; jobCount?: number };
    aiOverview?: string | null;
    faqs?: any[] | null;
    updatedAt: Date | string;
    robots: string;
}

export function getPlatformSeoMetadata(platformSlug: string): PlatformSeoMetadata | null {
    const platform = DIRECTORY_PLATFORMS.find(p => p.slug === platformSlug);
    if (!platform) return null;

    return {
        title: `Explore ${platform.label} Hidden Jobs | Apply Directly to Greenhouse, Lever, Ashby | HiddenJobs`,
        description: `Stop applying on crowded job boards. Search ${platform.label} directly to find roles before they are indexed. Instant access to public ${platform.label} job boards.`,
        platform,
        updatedAt: new Date().toISOString(),
        robots: 'index, follow' // Platforms always indexed
    };
}

export async function getSeoMetadata(roleSlug: string, locationSlug: string): Promise<RegionalSeoMetadata | null> {
    // Fallback for local development without DB
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
        const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);

        if (!role || !location) return null;

        return {
            role: { id: 0, name: role.label, slug: role.slug },
            location: { id: 0, name: location.label, slug: location.slug },
            title: `Hidden Jobs: ${role.label} Roles in ${location.label} | Unlisted Tech Jobs`,
            description: `Find unlisted ${role.label} job listings in ${location.label}.`,
            aiOverview: `<h3>Market Outlook for ${role.label} in ${location.label}</h3><p>Local development mode: AI overviews require GEMINI_API_KEY. This is a preview of the dynamic page structure.</p>`,
            faqs: [],
            updatedAt: new Date(),
            robots: 'index, follow'
        };
    }

    // 1. Fetch Role and Location from DB
    try {
        const [role] = await db.select().from(jobRoles).where(eq(jobRoles.slug, roleSlug));
        const [location] = await db.select().from(cities).where(eq(cities.slug, locationSlug));

        if (!role || !location) return null;

        // 2. Fetch cached SEO content
        let [content] = await db.select().from(seoContent).where(
            and(
                eq(seoContent.roleId, role.id),
                eq(seoContent.cityId, location.id)
            )
        );

        // IMMEDIATE RESPONSE: Return shell if content is missing
        // This solves the TTFB / LCP bottleneck by allowing the page to paint 
        // without waiting for Gemini/Groq.
        const title = content?.title || `How to find unlisted ${role.name} jobs in ${location.name}? | HiddenJobs`;
        const description = content?.description || `Looking for ${role.name} roles in ${location.name}? Access the hidden job market by searching Greenhouse, Lever, and Ashby boards directly.`;

        return {
            title,
            description,
            role,
            location,
            aiOverview: content?.aiOverview || null,
            faqs: content?.faqs ? JSON.parse(content.faqs) : null,
            updatedAt: content?.updatedAt || new Date(),
            robots: (location.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
        };
    } catch (error) {
        console.error('[seo-utils] getSeoMetadata DB error:', error);
        return null;
    }
}

export async function getLocationSeoMetadata(locationSlug: string): Promise<RegionalSeoMetadata | null> {
    // Fallback: use static constants if DB is not configured
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);
        if (!location) return null;
        return {
            title: `Hidden Jobs in ${location.label} | Open Tech Roles | HiddenJobs`,
            description: `Explore unlisted tech jobs in ${location.label}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${location.label}.`,
            location: { id: 0, name: location.label, slug: location.slug, jobCount: location.jobCount },
            role: { id: 0, name: 'Tech', slug: 'tech' },
            updatedAt: new Date(),
            robots: (location.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
        };
    }

    try {
        const [location] = await db.select().from(cities).where(eq(cities.slug, locationSlug));

        if (!location) {
            // Final fallback to static constants if DB is configured but entry missing
            const staticLoc = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);
            if (!staticLoc) return null;
            return {
                title: `Hidden Jobs in ${staticLoc.label} | Open Tech Roles | HiddenJobs`,
                description: `Explore unlisted tech jobs in ${staticLoc.label}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${staticLoc.label}.`,
                location: { id: 0, name: staticLoc.label, slug: staticLoc.slug, jobCount: staticLoc.jobCount },
                role: { id: 0, name: 'Tech', slug: 'tech' },
                updatedAt: new Date(),
                robots: (staticLoc.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
            };
        }

        return {
            title: `Hidden Jobs in ${location.name} | Open Tech Roles | HiddenJobs`,
            description: `Explore unlisted tech jobs in ${location.name}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${location.name}.`,
            location,
            role: { id: 0, name: 'Tech', slug: 'tech' },
            updatedAt: new Date(),
            robots: (location.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
        };
    } catch (error) {
        console.error('[seo-utils] getLocationSeoMetadata DB error:', error);
        return null;
    }
}

export async function getRoleSeoMetadata(roleSlug: string): Promise<RegionalSeoMetadata | null> {
    // Fallback: use static constants if DB is not configured
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
        if (!role) return null;

        return {
            title: `${role.label} Jobs: Apply Directly to ATS Boards | HiddenJobs`,
            description: `Find unlisted ${role.label} jobs. We scan internal Greenhouse and Lever boards directly so you can apply first.`,
            role: { id: 0, name: role.label, slug: role.slug },
            location: { id: 0, name: 'Global', slug: 'global', jobCount: 1000 },
            updatedAt: new Date(),
            robots: 'index, follow'
        };
    }

    try {
        const [role] = await db.select().from(jobRoles).where(eq(jobRoles.slug, roleSlug));

        if (!role) {
            // Final fallback to static constants
            const staticRole = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
            if (!staticRole) return null;
            return {
                title: `${staticRole.label} Jobs: Apply Directly to ATS Boards | HiddenJobs`,
                description: `Find unlisted ${staticRole.label} jobs. We scan internal Greenhouse and Lever boards directly so you can apply first.`,
                role: { id: 0, name: staticRole.label, slug: staticRole.slug },
                location: { id: 0, name: 'Global', slug: 'global', jobCount: 1000 },
                updatedAt: new Date(),
                robots: 'index, follow'
            };
        }

        return {
            title: `${role.name} Jobs: Apply Directly to ATS Boards | HiddenJobs`,
            description: `Find unlisted ${role.name} jobs. We scan internal Greenhouse and Lever boards directly so you can apply first.`,
            role,
            location: { id: 0, name: 'Global', slug: 'global', jobCount: 1000 },
            updatedAt: new Date(),
            robots: 'index, follow'
        };
    } catch (error) {
        console.error('[seo-utils] getRoleSeoMetadata DB error:', error);
        return null;
    }
}

export function getCompanySeoMetadata(domain: string) {
    // Simple logic to extract name from domain: "openai.com" -> "OpenAI"
    const name = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);

    return {
        title: `How to find unlisted jobs at ${name}? | HiddenJobs`,
        description: `Bypass the 1000+ applicants on LinkedIn. Search ${name}'s public Greenhouse and Lever boards directly. Find hidden roles before they are indexed.`,
        companyName: name,
        domain,
        updatedAt: new Date().toISOString()
    };
}

export async function getFallbackSeoMetadata(roleSlug: string, locationSlug: string): Promise<RegionalSeoMetadata | null> {
    const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
    const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);

    if (!role || !location) return null;

    return {
        title: `How to find unlisted ${role.label} jobs in ${location.label}? | HiddenJobs`,
        description: `Looking for ${role.label} roles in ${location.label}? Access the hidden job market by searching Greenhouse, Lever, and Ashby boards directly.`,
        role: { id: 0, name: role.label, slug: role.slug },
        location: { id: 0, name: location.label, slug: location.slug, jobCount: location.jobCount },
        aiOverview: null,
        faqs: null,
        updatedAt: new Date(),
        robots: (location.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
    };
}

export function getRegionalSeoMetadata(role: string, location: string, jobCount: number = 0) {
    const updatedAt = new Date().toISOString();
    const isThinContent = jobCount === 0;

    return {
        title: `${role} Jobs in ${location} (Direct ATS Apply) | HiddenJobs`,
        description: `Discover internal job openings for ${role} in ${location}. Apply directly to company internal boards scanned from Greenhouse, Lever, and Ashby.`,
        robots: isThinContent ? 'noindex, nofollow' : 'index, follow',
        other: {
            'last-scanned': updatedAt
        }
    };
}

export function generateSeoDork(platformDomain: string, roleName: string, locationName: string) {
    const components = buildDorkComponents({
        role: roleName,
        customRole: '',
        isCustomRole: false,
        location: locationName.toLowerCase() === 'remote' ? 'remote' : 'specific',
        specificLocation: locationName.toLowerCase() === 'remote' ? '' : locationName,
        exclude: '',
        time: '30',
        exactTitle: true,
    });

    return assembleDork(platformDomain, components);
}

import { getBaseUrl } from "./domain";

export async function getBreadcrumbSchema(items: { name: string, item: string }[]) {
    const baseUrl = await getBaseUrl();
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${baseUrl}${item.item}`
        }))
    };
}

export async function getJobPostingSchema(roleName: string, locationName: string, description: string) {
    const baseUrl = await getBaseUrl();
    const datePosted = new Date().toISOString().split('T')[0];
    const validThrough = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": roleName,
        "description": description,
        "datePosted": datePosted,
        "validThrough": validThrough,
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "HiddenJobs",
            "sameAs": baseUrl,
            "logo": `${baseUrl}/logo.png`
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Remote / ATS Direct",
                "addressLocality": locationName,
                "addressRegion": locationName,
                "postalCode": "00000",
                "addressCountry": "US"
            }
        }
    };
}

export function getFaqSchema(faqs: { question: string, answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}
