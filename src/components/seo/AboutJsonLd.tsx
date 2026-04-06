import { getBaseUrl } from "@/lib/domain";

export default function AboutJsonLd() {
    const baseUrl = getBaseUrl();

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Saurao Dalvi",
        "url": "https://www.linkedin.com/in/saurao-dalvi/",
        "jobTitle": "Creator & Engineer",
        "knowsAbout": [
            "Software Engineering",
            "Hidden Job Market",
            "ATS Optimization",
            "Next.js",
            "AI Engineering"
        ],
        "sameAs": [
            "https://www.linkedin.com/in/saurao-dalvi/",
            "https://github.com/sauraodalvi"
        ]
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "WebApplication",
            "name": "HiddenJobs",
            "url": baseUrl,
            "description": "The #1 Search Engine for the 'Hidden Job Market'. Bypass LinkedIn and search 50,000+ unlisted tech jobs directly on ATS platforms.",
            "applicationCategory": "BusinessApplication",
            "author": personSchema
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is HiddenJobs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HiddenJobs is a specialized search engine that indexes careers pages directly from ATS platforms like Greenhouse, Lever, and Ashby, revealing jobs that are often not posted on public boards."
                }
            },
            {
                "@type": "Question",
                "name": "Who is Saurao Dalvi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Saurao Dalvi is the engineer and product creator behind HiddenJobs, dedicated to making the tech job search more transparent and efficient."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
