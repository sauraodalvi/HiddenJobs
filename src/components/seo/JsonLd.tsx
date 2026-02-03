export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HiddenApply",
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
