import { Metadata } from 'next';
import { Suspense } from 'react';
import { getSeoMetadata, getBreadcrumbSchema, getJobPostingSchema, getFallbackSeoMetadata, getFaqSchema } from '@/lib/seo-utils';
import { notFound } from 'next/navigation';
import { ResultsSection } from '@/components/results/ResultsSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/domain';
import { AffiliateRail } from '@/components/affiliate/AffiliateRail';

import { CareerIntelligence } from '@/components/seo/CareerIntelligence';

interface Props {
    params: Promise<{
        roleAndCity: string;
    }>;
}

export async function generateStaticParams() {
    // Pre-render the top 100 combinations by population to ensure fast loading for major markets
    try {
        const topCities = await db.select().from(cities).orderBy(desc(cities.population)).limit(10);
        const topRoles = await db.select().from(jobRoles).limit(10);

        if (!Array.isArray(topCities) || !Array.isArray(topRoles)) return [];

        const params = [];
        for (const city of topCities) {
            for (const role of topRoles) {
                params.push({
                    roleAndCity: `${role.slug}-in-${city.slug}`,
                });
            }
        }
        return params;
    } catch (error) {
        console.error('[generateStaticParams] DB error, skipping pre-render:', error);
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { roleAndCity } = await params;
    const parts = roleAndCity.split('-in-');

    if (parts.length !== 2) return { title: 'Jobs' };

    const [roleSlug, locationSlug] = parts;
    const seo = await getSeoMetadata(roleSlug, locationSlug);

    if (!seo) return { title: 'Jobs' };

    const baseUrl = await getBaseUrl();

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `${baseUrl}/jobs/${roleAndCity}`,
        },
        robots: seo.robots || 'index, follow',
    };
}

export default async function JobPage({ params }: Props) {
    const { roleAndCity } = await params;
    const parts = roleAndCity.split('-in-');

    if (parts.length !== 2) {
        notFound();
    }

    const [roleSlug, locationSlug] = parts;
    let seo = await getSeoMetadata(roleSlug, locationSlug);

    // Graceful fallback for valid role/location slugs missing specific DB content
    if (!seo) {
        seo = await getFallbackSeoMetadata(roleSlug, locationSlug);
    }

    if (!seo) {
        notFound();
    }

    // Structured Data for AEO/GEO
    const breadcrumbs = await getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: `${seo.role.name} in ${seo.location.name}`, item: `/jobs/${roleAndCity}` }
    ]);

    const jobSchema = await getJobPostingSchema(seo.role.name, seo.location.name, seo.description);
    const faqSchema = seo.faqs ? getFaqSchema(seo.faqs) : null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-4 py-16">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
                />
                {faqSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )}

                <header className="mb-16 text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                         <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                            Verified Unlisted Market
                         </div>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-8 leading-[1.1]">
                        Explore <span className="text-primary">{seo.role.name}</span> Roles in <span className="text-primary">{seo.location.name}</span>
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                        {seo.description}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* AI Overview Section for GEO - Visually Enhanced */}
                        {seo.aiOverview && (
                            <article className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden group">
                                {/* Status bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600" />

                                <header className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-2xl">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Market Intelligence</h2>
                                            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase opacity-70 italic">Verified for {seo.location.name}</p>
                                        </div>
                                    </div>
                                    <aside className="hidden sm:block">
                                         <cite className="text-[10px] font-mono text-slate-400 uppercase not-italic">Source: Internal Index v2.4</cite>
                                    </aside>
                                </header>

                                <div
                                    className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 marker:text-primary"
                                    dangerouslySetInnerHTML={{ __html: seo.aiOverview }}
                                />

                                <footer className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        <Check className="w-3 h-3 text-emerald-500" />
                                        Data Freshness: {new Date(seo.updatedAt).toLocaleDateString()}
                                    </div>
                                    <Link
                                        href="/#pricing"
                                        className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                                    >
                                        Access Global Market Data →
                                    </Link>
                                </footer>
                                
                                {/* Visual Accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000" />
                            </article>
                        )}

                        <Suspense fallback={
                            <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                        }>
                            <ResultsSection
                                initialRole={seo.role.name}
                                initialLocation={seo.location.name}
                            />
                        </Suspense>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <CareerIntelligence />
                        <div className="sticky top-24">
                            <AffiliateRail variant="apply" role={seo.role.name} />
                        </div>
                    </aside>
                </div>

                {/* AEO FAQ Section */}
                {seo.faqs && (
                    <section className="mt-32 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">People also ask about {seo.role.name} roles in {seo.location.name}</h2>
                        <div className="grid gap-6">
                            {seo.faqs.map((faq: any, i: number) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contextual Affiliate Banner - Mid Intent (Research/Learning) */}
                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                    <AffiliateRail variant="research" />
                </div>
            </main>
            <Footer />
        </div>
    );
}
