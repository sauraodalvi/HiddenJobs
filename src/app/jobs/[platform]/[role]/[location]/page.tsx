import { permanentRedirect } from 'next/navigation';

interface Props {
    params: Promise<{
        platform: string;
        role: string;
        location: string;
    }>;
}

/**
 * Robust Legacy Redirect Handler
 * Handles: /jobs/[platform]/[role]/[location]
 * Redirects to: /jobs/[role]-in-[location]
 * 
 * This filesystem-based redirect is more reliable on Netlify/Next.js than next.config.ts
 * for these specific dynamic patterns.
 */
export default async function LegacyJobRedirectPage({ params }: Props) {
    const { role, location } = await params;
    
    // Perform permanent redirect (308) to the SEO-friendly URL
    permanentRedirect(`/jobs/${role}-in-${location}`);
}
