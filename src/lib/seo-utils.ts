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

export function generateSeoDork(platformDomain: string, roleLabel: string, locationLabel: string) {
    // Generate a default dork for SEO pages
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
