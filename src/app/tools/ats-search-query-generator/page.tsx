import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AtsQueryGenerator } from "@/components/tools/AtsQueryGenerator";
import { getCanonicalBaseUrl } from "@/lib/domain";

const canonicalBase = getCanonicalBaseUrl();

export const metadata: Metadata = {
    title: "ATS Search Query Generator | Find Greenhouse, Lever & Ashby Jobs",
    description: "Generate Google search queries for direct ATS jobs on Greenhouse, Lever, Ashby, Workday, and SmartRecruiters by role, location, and seniority.",
    alternates: {
        canonical: `${canonicalBase}/tools/ats-search-query-generator`,
    },
};

export default function AtsSearchQueryGeneratorPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ATS Search Query Generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "url": `${canonicalBase}/tools/ats-search-query-generator`,
        "description": "A free tool for generating Google search queries that find direct ATS job listings on Greenhouse, Lever, Ashby, Workday, and SmartRecruiters.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "publisher": {
            "@type": "Organization",
            "name": "HiddenJobs",
            "url": canonicalBase
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
            <Header />
            <main className="mx-auto max-w-6xl px-6 py-16 pb-28">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />

                <header className="mb-10 max-w-4xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
                        <Search className="h-4 w-4" />
                        Free Job Search Tool
                    </div>
                    <h1 className="mb-5 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-6xl">
                        ATS Search Query Generator
                    </h1>
                    <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        Build precise Google queries for direct job listings on Greenhouse, Lever, Ashby, Workday, and SmartRecruiters. Use it to find roles before they are crowded by public job boards.
                    </p>
                </header>

                <AtsQueryGenerator />

                <section className="mt-16 grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-3 text-lg font-black">Search the source</h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            The generated query targets the ATS domain directly, so results come from company career systems instead of job aggregators.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-3 text-lg font-black">Filter by intent</h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            Add role, seniority, location, and keyword filters to reduce noisy listings and focus on jobs that match your actual search.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-3 text-lg font-black">Move faster</h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            The query includes recency logic so you can focus on recently indexed roles and apply before applicant volume spikes.
                        </p>
                    </div>
                </section>

                <section className="mt-16 rounded-3xl bg-slate-950 p-8 text-white">
                    <h2 className="mb-3 text-2xl font-black">Want browsable directories instead?</h2>
                    <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-300">
                        Use the HiddenJobs directory to browse direct ATS opportunities by role, location, and platform without writing the query yourself.
                    </p>
                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                    >
                        Browse Job Directories
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
}
