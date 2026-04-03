import { db } from "./db";
import { cities, jobRoles, seoContent } from "./db/schema";
import { eq, and } from "drizzle-orm";
import { buildDorkComponents, assembleDork } from "./utils";
import { generateJobCityContent } from "./gemini";

import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS } from "./constants";

export async function getSeoMetadata(roleSlug: string, locationSlug: string) {
    // Fallback for local development without DB
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_DATABASE_URL')) {
        const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
        const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);

        if (!role || !location) return null;

        return {
            role: { id: 0, name: role.label, slug: role.slug },
            location: { id: 0, name: location.label, slug: location.slug },
            content: {
                title: `Hidden Jobs: ${role.label} Roles in ${location.label} | Unlisted Tech Jobs`,
                description: `Find unlisted ${role.label} job listings in ${location.label}.`,
                aiOverview: `<h3>Market Outlook for ${role.label} in ${location.label}</h3><p>Local development mode: AI overviews require GEMINI_API_KEY. This is a preview of the dynamic page structure.</p>`,
                faqs: '[]'
            }
        };
    }

    // 1. Fetch Role and Location from DB
    const [role] = await db.select().from(jobRoles).where(eq(jobRoles.slug, roleSlug));
    const [location] = await db.select().from(cities).where(eq(cities.slug, locationSlug));

    if (!role || !location) return null;

    // 2. Fetch or Generate cached SEO content
    let [content] = await db.select().from(seoContent).where(
        and(
            eq(seoContent.roleId, role.id),
            eq(seoContent.cityId, location.id)
        )
    );

    // Dynamic AI Generation (JIT) if cache is missing
    if (!content && process.env.GEMINI_API_KEY) {
        const aiData = await generateJobCityContent(role.name, location.name);
        if (aiData) {
            const [newContent] = await db.insert(seoContent).values({
                roleId: role.id,
                cityId: location.id,
                title: `Hidden Jobs: ${role.name} Roles in ${location.name} | Unlisted Tech Jobs`,
                description: aiData.metaDescription,
                aiOverview: aiData.aiOverview,
                faqs: JSON.stringify(aiData.faqs)
            }).returning();
            content = newContent;
        }
    }

    const title = content?.title || `Hidden Jobs: ${role.name} Roles in ${location.name} | Unlisted Tech Jobs`;
    const description = content?.description || `Find unlisted ${role.name} job listings in ${location.name}. Bypass the competition and apply directly to companies in ${location.name}.`;

    return {
        title,
        description,
        role,
        location,
        aiOverview: content?.aiOverview,
        faqs: content?.faqs ? JSON.parse(content.faqs) : null
    };
}

export async function getLocationSeoMetadata(locationSlug: string) {
    const [location] = await db.select().from(cities).where(eq(cities.slug, locationSlug));
    if (!location) return null;

    return {
        title: `Hidden Jobs in ${location.name} | Open Tech Roles | HiddenJobs`,
        description: `Explore unlisted tech jobs in ${location.name}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${location.name}.`,
        location
    };
}

export async function getRoleSeoMetadata(roleSlug: string) {
    const [role] = await db.select().from(jobRoles).where(eq(jobRoles.slug, roleSlug));
    if (!role) return null;

    return {
        title: `${role.name} Hidden Jobs | Unlisted ${role.name} Roles | HiddenJobs`,
        description: `Find unlisted ${role.name} positions across top ATS platforms. Bypass job boards and apply directly.`,
        role
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

export function getBreadcrumbSchema(items: { name: string, item: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://hiddenjobs.netlify.app${item.item}`
        }))
    };
}

export function getJobPostingSchema(roleName: string, locationName: string, description: string) {
    return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": roleName,
        "description": description,
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": locationName
            }
        },
        "hiringOrganization": {
            "@id": "https://hiddenjobs.netlify.app#organization"
        }
    };
}
