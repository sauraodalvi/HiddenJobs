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

    if (parts.length !== 2) return { title: 'Jobs | HiddenJobs' };

    const [roleSlug, locationSlug] = parts;
    const seo = await getSeoMetadata(roleSlug, locationSlug);

    if (!seo) return { title: 'Jobs | HiddenJobs' };

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `${getBaseUrl()}/jobs/${roleAndCity}`,
        },
        robots: seo.robots || 'index, follow',
    };
}

export default async function JobPage({ params }: Props) {
    const { roleAndCity } = await params;
    const parts = roleAndCity.split('-in-');

    if (parts.length !== 2) notFound();

    const [roleSlug, locationSlug] = parts;
    let seo = await getSeoMetadata(roleSlug, locationSlug);

    // Graceful fallback for valid role/location slugs missing specific DB content
    if (!seo) {
        seo = await getFallbackSeoMetadata(roleSlug, locationSlug);
    }

    if (!seo) notFound();

    // Structured Data for AEO/GEO
    const breadcrumbs = getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: `${seo.role.name} in ${seo.location.name}`, item: `/jobs/${roleAndCity}` }
    ]);

    const jobSchema = getJobPostingSchema(seo.role.name, seo.location.name, seo.description);
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
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
                        Explore <span className="text-primary">{seo.role.name}</span> Roles in <span className="text-primary">{seo.location.name}</span>
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-slate-500 dark:text-slate-400">
                        {seo.description}
                    </p>
                </header>

                {/* AI Overview Section for GEO - Visually Enhanced */}
                {seo.aiOverview && (
                    <section className="max-w-4xl mx-auto mb-20 bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden group">
                        {/* Status bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/50 to-blue-600/50" />

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Market Intelligence</h2>
                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase opacity-70">AI-Generated Insights for {seo.location.name}</p>
                            </div>
                        </div>

                        <div
                            className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 marker:text-primary"
                            dangerouslySetInnerHTML={{ __html: seo.aiOverview }}
                        />

                        {/* Subtle interactive element */}
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    Last Scanned: {new Date(seo.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="text-[10px] text-slate-400 font-medium italic">
                                    Curated by HiddenJobs Analysis Team
                                </div>
                            </div>
                            <Link
                                href="/#pricing"
                                className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                            >
                                Get Deeper Market Data →
                            </Link>
                        </div>
                    </section>
                )}

                <Suspense fallback={
                    <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                }>
                    <div className="mt-12">
                        <ResultsSection
                            initialRole={seo.role.name}
                            initialLocation={seo.location.name}
                        />
                    </div>
                </Suspense>

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
            </main>
            <Footer />
        </div>
    );
}
