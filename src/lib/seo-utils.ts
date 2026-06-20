import { db } from "./db";
import { cities, jobRoles, seoContent } from "./db/schema";
import { eq, and, InferSelectModel } from "drizzle-orm";
import { buildDorkComponents, assembleDork } from "./utils";
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from "./constants";

type SeoContentRow = InferSelectModel<typeof seoContent>;

/** Timeout sentinel to safely cut off slow DB queries without losing types */
const DB_TIMEOUT_MS = 5000;

function dbTimeout(): Promise<never> {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error('DB query timed out')), DB_TIMEOUT_MS)
    );
}

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
        title: `${platform.label} Jobs (ATS Direct Apply)`,
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
            title: `${role.label} Jobs in ${location.label} (Direct ATS)`,
            description: `Find unlisted ${role.label} job listings in ${location.label}.`,
            aiOverview: `<h3>Market Outlook for ${role.label} in ${location.label}</h3><p>Local development mode: AI overviews require GEMINI_API_KEY. This is a preview of the dynamic page structure.</p>`,
            faqs: [],
            updatedAt: new Date(),
            robots: 'index, follow'
        };
    }

    // 1. Fetch Role and Location from DB (with timeout)
    try {
        const [roleResult, locationResult] = await Promise.race([
            Promise.all([
                db.select().from(jobRoles).where(eq(jobRoles.slug, roleSlug)),
                db.select().from(cities).where(eq(cities.slug, locationSlug)),
            ]),
            dbTimeout().then(() => { throw new Error('DB timeout'); }),
        ]);

        const role = roleResult.length > 0 ? roleResult[0] : null;
        const location = locationResult.length > 0 ? locationResult[0] : null;

        if (!role || !location) return null;

        // 2. Fetch cached SEO content (with timeout)
        const contentRows: SeoContentRow[] = await Promise.race([
            db.select().from(seoContent).where(
                and(
                    eq(seoContent.roleId, role.id),
                    eq(seoContent.cityId, location.id)
                )
            ),
            dbTimeout().then(() => [] as SeoContentRow[]),
        ]);

        const content = contentRows.length > 0 ? contentRows[0] : undefined;

        // IMMEDIATE RESPONSE: Return shell if content is missing
        const title = content?.title || `${role.name} Jobs in ${location.name} (Direct ATS)`;
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
            title: `${location.label} Tech Jobs (Direct ATS)`,
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
                title: `${staticLoc.label} Tech Jobs (Direct ATS)`,
                description: `Explore unlisted tech jobs in ${staticLoc.label}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${staticLoc.label}.`,
                location: { id: 0, name: staticLoc.label, slug: staticLoc.slug, jobCount: staticLoc.jobCount },
                role: { id: 0, name: 'Tech', slug: 'tech' },
                updatedAt: new Date(),
                robots: (staticLoc.jobCount || 0) === 0 ? 'noindex, nofollow' : 'index, follow'
            };
        }

        return {
            title: `${location.name} Tech Jobs (Direct ATS)`,
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
            title: `${role.label} Jobs (ATS Direct Apply)`,
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
                title: `${staticRole.label} Jobs (ATS Direct Apply)`,
                description: `Find unlisted ${staticRole.label} jobs. We scan internal Greenhouse and Lever boards directly so you can apply first.`,
                role: { id: 0, name: staticRole.label, slug: staticRole.slug },
                location: { id: 0, name: 'Global', slug: 'global', jobCount: 1000 },
                updatedAt: new Date(),
                robots: 'index, follow'
            };
        }

        return {
            title: `${role.name} Jobs (ATS Direct Apply)`,
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
        title: `${name} Jobs (ATS Direct Apply)`,
        description: `Bypass the 1000+ applicants on LinkedIn. Search ${name}'s public Greenhouse and Lever boards directly. Find hidden roles before they are indexed.`,
        companyName: name,
        domain,
        updatedAt: new Date().toISOString()
    };
}

function slugToTitle(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function getFallbackSeoMetadata(roleSlug: string, locationSlug: string): Promise<RegionalSeoMetadata | null> {
    const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
    const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);

    // Dynamic fallback: If not in static directory, generate names from slugs
    const roleName = role?.label || slugToTitle(roleSlug);
    const locationName = location?.label || slugToTitle(locationSlug);
    const jobCount = location?.jobCount || 0;

    return {
        title: `${roleName} Jobs in ${locationName} (Direct ATS)`,
        description: `Looking for ${roleName} roles in ${locationName}? Access the hidden job market by searching Greenhouse, Lever, and Ashby boards directly.`,
        role: { id: 0, name: roleName, slug: roleSlug },
        location: { id: 0, name: locationName, slug: locationSlug, jobCount },
        aiOverview: null,
        faqs: null,
        updatedAt: new Date(),
        robots: jobCount === 0 ? 'noindex, nofollow' : 'index, follow'
    };
}

export function getRegionalSeoMetadata(role: string, location: string, jobCount: number = 0) {
    const updatedAt = new Date().toISOString();
    const isThinContent = jobCount === 0;

    return {
        title: `${role} Jobs in ${location} (Direct ATS)`,
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
        "industry": "Technology, Software, Engineering",
        "occupationalCategory": "15-1132.00, Software Developers, Applications",
        "jobBenefits": "Remote Work Options, Competitive Salary, Direct ATS Application",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Verified Tech Companies via HiddenJobs",
            "sameAs": baseUrl,
            "logo": `${baseUrl}/logo.png`
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Various Tech Hubs",
                "addressLocality": locationName,
                "addressRegion": locationName,
                "addressCountry": "US"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": 100000,
                "maxValue": 250000,
                "unitText": "YEAR"
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
