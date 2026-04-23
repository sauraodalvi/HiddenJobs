import React from 'react';
import { getBaseUrl } from "@/lib/domain";

export const GlobalSchema = async () => {
    const baseUrl = await getBaseUrl();
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                "name": "HiddenJobs",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/logo.png`
                },
                "description": "Premium search engine for uncovering unlisted jobs in high-growth companies tracking direct-to-ATS openings.",
                "sameAs": [
                    "https://twitter.com/hiddenjobs",
                    "https://linkedin.com/company/hiddenjobs"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                "url": baseUrl,
                "name": "HiddenJobs",
                "publisher": { "@id": `${baseUrl}/#organization` },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/explore?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Person",
                "name": "Saurao Dalvi",
                "jobTitle": "Creator & Engineer",
                "worksFor": { "@id": `${baseUrl}/#organization` },
                "description": "Specialist in Greenhouse and Lever ATS indexing strategies."
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
