import { permanentRedirect, notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        platform: string;
        role: string;
        location: string;
    }>;
}

/**
 * Legacy Redirect Handler: /jobs/[platform]/[role]/[location]
 * Redirects to the canonical hub URL: /jobs/[role]-in-[location]
 *
 * IMPORTANT: This page must NEVER be indexed by Google.
 * It is a redirect-only page with no content.
 */
export const metadata = {
    robots: { index: false, follow: false },
};

// Force dynamic so this never causes build-time 500s from missing params
export const dynamic = 'force-dynamic';

export default async function LegacyJobRedirectPage({ params }: Props) {
    try {
        const { role, location } = await params;

        // Validate params — prevent redirect to invalid URLs
        if (!role || !location || typeof role !== 'string' || typeof location !== 'string') {
            notFound();
        }

        // Only allow valid slug characters (letters, numbers, hyphens)
        const slugPattern = /^[a-z0-9-]+$/;
        if (!slugPattern.test(role) || !slugPattern.test(location)) {
            notFound();
        }

        // Perform permanent redirect (308) to the canonical SEO-friendly URL
        permanentRedirect(`/jobs/${role}-in-${location}`);
    } catch (error: any) {
        // permanentRedirect throws a NEXT_REDIRECT error — re-throw it
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        // Any other error (params unavailable, etc.) → 404, never 500
        notFound();
    }
}
