import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ExploreClient } from "@/components/explore/ExploreClient";
import { DIRECTORY_LOCATIONS, DIRECTORY_ROLES } from "@/lib/constants";
import { getFaqSchema } from "@/lib/seo-utils";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Explore Hidden Tech Hubs | HiddenJobs",
    description: "Interactive map visualizing unlisted tech job density across San Francisco, New York, London, Berlin, and 40+ global tech hubs. Search Greenhouse, Lever, and Ashby roles by location.",
};

const FAQS = [
    { question: "What are hidden tech hubs on this map?", answer: "Hidden tech hubs are cities with high concentrations of unlisted tech jobs posted directly to ATS platforms like Greenhouse, Lever, and Ashby — roles that never appear on LinkedIn or Indeed." },
    { question: "How does this map find unlisted jobs?", answer: "Each marker represents a city where HiddenJobs indexes job listings from company career portals. The pulse intensity shows relative job density. Click any hub to pivot the search." },
    { question: "Which ATS platforms does the map track?", answer: "The map aggregates data from Greenhouse, Lever, Ashby, Workday, and SmartRecruiters — the five most common ATS platforms used by high-growth tech companies." },
];

const faqSchema = getFaqSchema(FAQS);

const CITIES = DIRECTORY_LOCATIONS.filter(l => l.slug && l.label);
const ROLES = DIRECTORY_ROLES.filter(r => r.slug && r.label).slice(0, 8);

export default function ExplorePage() {
    return (
        <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />

            <main className="relative pt-20 pb-32 dot-grid min-h-[calc(100-80px)]">
                <div className="max-w-7xl mx-auto px-6">
                    <Breadcrumbs items={[
                        { label: "Explore" },
                    ]} />

                    {/* Featured snippet definition */}
                    <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 max-w-3xl mx-auto">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What are hidden tech hubs?</h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Hidden tech hubs are cities where companies post roles directly to ATS platforms without syndicating to mass job boards. This interactive map shows real-time job density across 40+ global markets, helping you discover where unlisted opportunities are concentrated.
                        </p>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text dark:text-white text-slate-900">
                            Explore Hidden Tech Hubs
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto italic">
                            Visualize the density of unlisted roles across Greenhouse, Lever, and Ashby.
                        </p>
                    </div>

                    <ExploreClient />
                </div>

                {/* Quick-link grid: top roles in each hub */}
                <section className="max-w-7xl mx-auto px-6 mt-32">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 text-center">Browse by City and Role</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">
                        Click a city below to see unlisted roles in that market.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {CITIES.map(city => (
                            <Link
                                key={city.slug}
                                href={`/jobs/location/${city.slug}`}
                                className="group block p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary hover:shadow-lg transition-all"
                            >
                                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">{city.label}</span>
                                <span className="block text-xs text-slate-400 mt-1">View roles →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Top role quick-links */}
                <section className="max-w-7xl mx-auto px-6 mt-20">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">Top Roles in Tech Hubs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {ROLES.slice(0, 4).map(role => (
                            <Link
                                key={role.slug}
                                href={`/jobs/role/${role.slug}`}
                                className="group p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
                            >
                                <span className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">{role.label}</span>
                                <span className="block text-xs text-slate-400 mt-2">in San Francisco, New York, London →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-6 mt-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
                    <div className="grid gap-6">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
