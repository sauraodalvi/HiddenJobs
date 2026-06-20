import { getCanonicalBaseUrl } from "@/lib/domain";

// Use canonical URL for all schema — ensures consistent JSON-LD across deployments
export default function JsonLd() {
    const baseUrl = getCanonicalBaseUrl();

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HiddenJobs",
        "url": baseUrl,
        "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": "192",
            "height": "192"
        },
        "sameAs": [
            "https://twitter.com/HiddenJobs",
            "https://github.com/HiddenJobs"
        ],
        "description": "HiddenJobs is the world's leading search engine for unlisted tech roles on Greenhouse, Lever, and Ashby ATS platforms.",
        "foundingDate": "2024",
        "knowsAbout": [
            "Greenhouse ATS",
            "Lever ATS",
            "Ashby ATS",
            "Hidden Job Market",
            "Tech Recruiting",
            "Software Engineer Jobs"
        ]
    };

    // WebSite schema with SearchAction enables Google Sitelinks Search Box
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "HiddenJobs",
        "url": baseUrl,
        "description": "Search 50,000+ unlisted tech jobs directly on ATS platforms like Greenhouse, Lever, and Ashby. Bypass LinkedIn.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        },
        "publisher": {
            "@type": "Organization",
            "name": "HiddenJobs",
            "url": baseUrl
        }
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HiddenJobs",
        "url": baseUrl,
        "description": "A search engine for the hidden job market that indexes unlisted roles from Greenhouse, Lever, and Ashby.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "Search Greenhouse Jobs",
            "Search Lever Jobs",
            "Search Ashby Jobs",
            "Advanced Boolean Search Generator"
        ],
        "author": {
            "@type": "Organization",
            "name": "HiddenJobs",
            "url": baseUrl
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the 'Hidden Job Market'?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The hidden job market refers to the roughly 60-70% of roles that are never posted on public job boards like LinkedIn or Indeed. These roles live directly on company careers pages and ATS platforms like Greenhouse and Lever."
                }
            },
            {
                "@type": "Question",
                "name": "How does HiddenJobs find these jobs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HiddenJobs uses advanced boolean search techniques to target the technical directories of ATS platforms directly, bypassing noisy job boards and giving you access to roles 48-72 hours before they appear on LinkedIn."
                }
            },
            {
                "@type": "Question",
                "name": "Is HiddenJobs free to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, HiddenJobs has a free tier that allows searching across major ATS platforms. Premium features unlock advanced filters, saved searches, and alert notifications."
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to find hidden jobs in tech",
        "description": "Step-by-step guide to finding unlisted tech jobs using HiddenJobs",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Select your role",
                "text": "Select your target role and desired location from the HiddenJobs search interface."
            },
            {
                "@type": "HowToStep",
                "name": "Generate a boolean query",
                "text": "Generate a precision boolean search query optimized for ATS platforms."
            },
            {
                "@type": "HowToStep",
                "name": "View direct ATS links",
                "text": "View direct links to company ATS platforms like Greenhouse and Lever."
            },
            {
                "@type": "HowToStep",
                "name": "Apply directly",
                "text": "Apply directly on the company careers portal — no middleman, no LinkedIn noise."
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
        </>
    );
}
