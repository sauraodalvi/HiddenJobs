import { Metadata } from 'next';
import { getSeoMetadata, getBreadcrumbSchema, getJobPostingSchema } from '@/lib/seo-utils';
import { notFound } from 'next/navigation';
import { ResultsSection } from '@/components/results/ResultsSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { db } from '@/lib/db';
import { cities, jobRoles } from '@/lib/db/schema';
import { DIRECTORY_PLATFORMS } from '@/lib/constants';

interface Props {
    params: Promise<{
        platform: string;
        role: string;
        location: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { platform, role, location } = await params;
    const seo = await getSeoMetadata(role, location);

    if (!seo) return { title: 'Jobs | HiddenJobs' };

    const platformLabel = DIRECTORY_PLATFORMS.find(p => p.slug === platform)?.label || platform;

    return {
        title: `${seo.role.name} Roles in ${seo.location.name} on ${platformLabel} | HiddenJobs`,
        description: `Browse ${seo.role.name} job opportunities in ${seo.location.name} specifically indexed from ${platformLabel}. ${seo.description}`,
        alternates: {
            canonical: `https://hiddenjobs.vercel.app/jobs/platform/${platform}/${role}/${location}`,
        },
    };
}

export default async function PlatformJobPage({ params }: Props) {
    const { platform, role, location } = await params;
    const seo = await getSeoMetadata(role, location);

    if (!seo) notFound();

    const platformLabel = DIRECTORY_PLATFORMS.find(p => p.slug === platform)?.label || platform;

    // Structured Data for AEO/GEO
    const breadcrumbs = getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: `By Platform`, item: '/jobs/platform' },
        { name: `${platformLabel}`, item: `/jobs/platform/${platform}` },
        { name: `${seo.role.name} in ${seo.location.name}`, item: `/jobs/platform/${platform}/${role}/${location}` }
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        {platformLabel} Exclusive
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
                        <span className="text-primary">{seo.role.name}</span> Roles in <span className="text-primary">{seo.location.name}</span>
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-slate-500 dark:text-slate-400">
                        {seo.description} Optimized for {platformLabel} postings.
                    </p>
                </header>

                {/* Results UI with Platform lock */}
                <div className="mt-12">
                    <ResultsSection
                        initialRole={seo.role.name}
                        initialLocation={seo.location.name}
                        initialPlatform={platformLabel}
                    />
                </div>

                {/* AI Overview Section for GEO */}
                {seo.aiOverview && (
                    <section className="max-w-4xl mx-auto mt-20 mb-20 bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white italic opacity-80 uppercase tracking-widest text-xs">Market Insights & Outlook</h2>
                        <div
                            className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300"
                            dangerouslySetInnerHTML={{ __html: seo.aiOverview }}
                        />
                    </section>
                )}

                {/* AEO FAQ Section */}
                {seo.faqs && (
                    <section className="mt-32 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">People also ask about {seo.role.name} roles</h2>
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
