import React from 'react';

export const GlobalSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://hiddenjobs.netlify.app/#organization",
                "name": "HiddenJobs",
                "url": "https://hiddenjobs.netlify.app",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://hiddenjobs.netlify.app/logo.png"
                },
                "description": "Premium search engine for uncovering unlisted jobs in high-growth companies tracking direct-to-ATS openings.",
                "sameAs": [
                    "https://twitter.com/hiddenjobs",
                    "https://linkedin.com/company/hiddenjobs"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://hiddenjobs.netlify.app/#website",
                "url": "https://hiddenjobs.netlify.app",
                "name": "HiddenJobs",
                "publisher": { "@id": "https://hiddenjobs.netlify.app/#organization" },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://hiddenjobs.netlify.app/explore?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Person",
                "name": "Alex Rivera",
                "jobTitle": "Lead ATS Researcher",
                "worksFor": { "@id": "https://hiddenjobs.netlify.app/#organization" },
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
