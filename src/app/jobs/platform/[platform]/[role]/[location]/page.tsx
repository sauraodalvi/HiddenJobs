import { Metadata } from 'next';
import { Suspense } from 'react';
import { getSeoMetadata, getBreadcrumbSchema, getJobPostingSchema } from '@/lib/seo-utils';
import { notFound } from 'next/navigation';
import { ResultsSection } from '@/components/results/ResultsSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getBaseUrl } from '@/lib/domain';
import { DIRECTORY_PLATFORMS } from '@/lib/constants';
import { DynamicAiPanels, DynamicAiPanelsSkeleton } from '@/components/seo/DynamicAiPanels';

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
            canonical: `${getBaseUrl()}/jobs/platform/${platform}/${role}/${location}`,
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

                <Suspense fallback={
                    <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                }>
                    <div className="mt-12">
                        <ResultsSection
                            initialRole={seo.role.name}
                            initialLocation={seo.location.name}
                            initialPlatform={platformLabel}
                        />
                    </div>
                </Suspense>

                <Suspense fallback={
                    <DynamicAiPanelsSkeleton roleName={seo.role.name} cityName={seo.location.name} />
                }>
                    <DynamicAiPanels
                        roleName={seo.role.name}
                        cityName={seo.location.name}
                        platformLabel={platformLabel}
                        initialOverview={seo.aiOverview}
                        initialFaqs={seo.faqs}
                    />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
