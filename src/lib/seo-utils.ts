import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from "./constants";
import { buildDorkComponents, assembleDork } from "./utils";

export function getSeoMetadata(platformSlug: string, roleSlug: string, locationSlug: string) {
    const platform = DIRECTORY_PLATFORMS.find(p => p.slug === platformSlug);
    const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
    const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);

    if (!platform || !role || !location) return null;

    const title = `${role.label} Jobs on ${platform.label} in ${location.label} | HiddenJobs`;
    const description = `Find the latest ${role.label} job openings directly on the ${platform.label} job board for ${location.label}. Bypass LinkedIn and discover the hidden job market.`;

    return {
        title,
        description,
        platform,
        role,
        location
    };
}

export function getLocationSeoMetadata(locationSlug: string) {
    const location = DIRECTORY_LOCATIONS.find(l => l.slug === locationSlug);
    if (!location) return null;

    return {
        title: `Hidden Jobs in ${location.label} | Open Tech Roles | HiddenJobs`,
        description: `Explore unlisted tech jobs in ${location.label}. Search Greenhouse, Lever, and Ashby job boards directly for roles in ${location.label} and avoid the LinkedIn noise.`,
        location
    };
}

export function getRoleSeoMetadata(roleSlug: string) {
    const role = DIRECTORY_ROLES.find(r => r.slug === roleSlug);
    if (!role) return null;

    return {
        title: `${role.label} Hidden Jobs | Unlisted ${role.label} Roles | HiddenJobs`,
        description: `Find unlisted ${role.label} positions across top ATS platforms. Bypass job boards and apply directly to companies hiring for ${role.label} roles.`,
        role
    };
}

export function getPlatformSeoMetadata(platformSlug: string) {
    const platform = DIRECTORY_PLATFORMS.find(p => p.slug === platformSlug);
    if (!platform) return null;

    return {
        title: `${platform.label} Job Directory | Search all ${platform.label} Jobs | HiddenJobs`,
        description: `Search the entire ${platform.label} applicant tracking system for hidden jobs. Find direct links to ${platform.label} job boards for the hottest tech companies.`,
        platform
    };
}

export function generateSeoDork(platformDomain: string, roleLabel: string, locationLabel: string) {
    const components = buildDorkComponents({
        role: roleLabel,
        customRole: '',
        isCustomRole: false,
        location: locationLabel.toLowerCase() === 'remote' ? 'remote' : 'specific',
        specificLocation: locationLabel.toLowerCase() === 'remote' ? '' : locationLabel,
        exclude: '',
        time: '30', // Last 30 days for SEO relevance
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
