export default function JsonLd() {
    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HiddenApply",
        "url": "https://hiddenapply.com",
        "description": "A search engine for the hidden job market that indexes unlisted roles from Greenhouse, Lever, and Ashby.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
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
            "name": "HiddenApply"
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
                    "text": "The hidden job market refers to the roughly 60-70% of roles that are never posted on public job boards like LinkedIn or Indeed. These roles live directly on company careers pages."
                }
            },
            {
                "@type": "Question",
                "name": "How does HiddenApply find these jobs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HiddenApply uses advanced boolean search techniques to target the technical directories of ATS platforms directly, bypassing noisy job boards."
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to find hidden jobs in tech",
        "step": [
            {
                "@type": "HowToStep",
                "text": "Select your target role and desired location."
            },
            {
                "@type": "HowToStep",
                "text": "Generate a precision boolean query."
            },
            {
                "@type": "HowToStep",
                "text": "View direct links to company ATS platforms like Greenhouse and Lever."
            },
            {
                "@type": "HowToStep",
                "text": "Apply directly on the company careers portal."
            }
        ]
    };

    return (
        <>
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
