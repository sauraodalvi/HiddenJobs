import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getPlatformSeoMetadata, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, ChevronRight, Briefcase, MapPin, ExternalLink, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/domain';

interface PageProps {
    params: Promise<{
        platform: string;
    }>;
}

export async function generateStaticParams() {
    return DIRECTORY_PLATFORMS.map(p => ({
        platform: p.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { platform: platformSlug } = await params;
    const seo = getPlatformSeoMetadata(platformSlug);

    if (!seo) return { title: 'Not Found' };

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `${await getBaseUrl()}/jobs/platform/${platformSlug}`,
        },
        robots: seo.robots || 'index, follow',
    };
}

export default async function PlatformDirectoryPage({ params }: PageProps) {
    const { platform: platformSlug } = await params;
    const seo = getPlatformSeoMetadata(platformSlug);

    if (!seo) notFound();

    const { platform } = seo;

    // Structured Data
    const breadcrumbs = await getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: platform.label, item: `/jobs/platform/${platformSlug}` }
    ]);

    const platformFaqs = [
        {
            question: `How to find jobs on ${platform.label}?`,
            answer: `You can find jobs on ${platform.label} by searching their public job boards. HiddenJobs aggregates these links for you so you can bypass the main job boards.`
        },
        {
            question: `Is ${platform.label} better than LinkedIn for job hunting?`,
            answer: `${platform.label} is an Applicant Tracking System (ATS). Applying directly through a company's ${platform.label} portal often gets your resume seen faster than LinkedIn where there are thousands of applicants.`
        }
    ];

    const faqSchema = getFaqSchema(platformFaqs);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
                        <Search className="w-4 h-4 mr-2" />
                        Platform Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        Explore all <span className="text-primary">{platform.label}</span> Job Boards
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Indexing the technical job database of {platform.label}. We help you find the direct application URLs for thousands of companies using this ATS.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Popular Roles on this platform */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Popular Roles on {platform.label}</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_ROLES.map(role => (
                                <Link
                                    key={role.slug}
                                    href={`/jobs/platform/${platformSlug}/${role.slug}/remote`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{role.label}</h3>
                                            <p className="text-sm text-slate-500">View hidden {role.label} roles</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Top Locations for this platform */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Top Locations</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_LOCATIONS.map(loc => (
                                <Link
                                    key={loc.slug}
                                    href={`/jobs/platform/${platformSlug}/software-engineer/${loc.slug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{platform.label} Jobs in {loc.label}</h3>
                                            <p className="text-sm text-slate-500">Expose unlisted roles in {loc.label}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Overview Block */}
                <div className="mt-32 p-12 rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-xl overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6 dark:text-white uppercase tracking-tighter italic">ATS Intel: {platform.label}</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            {platform.label} is currently used by thousands of engineering-focused companies. Unlike traditional job posters, {platform.label} users often keep their job boards public but unlinked. We bypass the paywalls and indices by targeting these boards directly.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-mono text-slate-600 dark:text-slate-400">
                                site:{platform.domain} "software"
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mt-8">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <Check className="w-3 h-3 text-emerald-500" />
                                Last Scanned: {new Date(seo.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium italic">
                                Curated by HiddenJobs Analysis Team
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-10 dark:opacity-20 translate-x-1/4 translate-y-1/4">
                        <ExternalLink className="w-64 h-64" />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
