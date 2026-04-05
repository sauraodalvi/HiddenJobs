import { Metadata } from 'next';
import { getSeoMetadata, getBreadcrumbSchema, getJobPostingSchema } from '@/lib/seo-utils';
import { notFound } from 'next/navigation';
import { ResultsSection } from '@/components/results/ResultsSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

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
            canonical: `https://hiddenjobs.vercel.app/jobs/${roleAndCity}`,
        },
    };
}

export default async function JobPage({ params }: Props) {
    const { roleAndCity } = await params;
    const parts = roleAndCity.split('-in-');

    if (parts.length !== 2) notFound();

    const [roleSlug, locationSlug] = parts;
    const seo = await getSeoMetadata(roleSlug, locationSlug);

    if (!seo) notFound();

    // Structured Data for AEO/GEO
    const breadcrumbs = getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: `${seo.role.name} in ${seo.location.name}`, item: `/jobs/${roleAndCity}` }
    ]);

    const jobSchema = getJobPostingSchema(seo.role.name, seo.location.name, seo.description);

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

                <header className="mb-16 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
                        Explore <span className="text-primary">{seo.role.name}</span> Roles in <span className="text-primary">{seo.location.name}</span>
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-slate-500 dark:text-slate-400">
                        {seo.description}
                    </p>
                </header>

                {/* AI Overview Section for GEO */}
                {seo.aiOverview && (
                    <section className="max-w-4xl mx-auto mb-20 bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white italic opacity-80 uppercase tracking-widest text-xs">Market Insights & Outlook</h2>
                        <div
                            className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300"
                            dangerouslySetInnerHTML={{ __html: seo.aiOverview }}
                        />
                    </section>
                )}

                {/* Results UI */}
                <div className="mt-12">
                    <ResultsSection
                        initialRole={seo.role.name}
                        initialLocation={seo.location.name}
                    />
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
            </main>
            <Footer />
        </div>
    );
}
