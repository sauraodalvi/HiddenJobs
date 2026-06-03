import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getLocationSeoMetadata, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { MapPin, Briefcase, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/domain';

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export async function generateStaticParams() {
    return DIRECTORY_LOCATIONS.map(loc => ({
        location: loc.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: locationSlug } = await params;
    const seo = await getLocationSeoMetadata(locationSlug);

    if (!seo) return { title: 'Not Found' };

    return {
        title: seo.title,
        description: seo.description,
    };
}

export default async function LocationDirectoryPage({ params }: PageProps) {
    const { location: locationSlug } = await params;
    const seo = await getLocationSeoMetadata(locationSlug);

    if (!seo) {
        notFound();
    }

    const { location } = seo;

    const breadcrumbs = await getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: location.name, item: `/jobs/location/${locationSlug}` }
    ]);

    const faqs = [
        { question: `How to find hidden tech jobs in ${location.name}?`, answer: `Search ${location.name} job boards on Greenhouse, Lever, and Ashby directly using HiddenJobs to access unlisted roles before they reach LinkedIn.` },
        { question: `Why do companies in ${location.name} use direct ATS hiring?`, answer: `Tech companies in ${location.name} post directly to ATS platforms to reduce application volume and find more qualified candidates.` },
        { question: `Is it better to search ${location.name} jobs on ATS vs LinkedIn?`, answer: `Yes — roles on ATS boards often have 80-90% fewer applicants than the same role posted on LinkedIn.` }
    ];
    const faqSchema = getFaqSchema(faqs);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <Breadcrumbs items={[
                    { label: 'Jobs', href: '/jobs' },
                    { label: location.name },
                ]} />

                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Hidden Tech Jobs in <span className="text-primary">{location.name}</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Currently tracking software engineering, product, and design roles across all major ATS platforms specifically for {location.name}. Bypass the crowded job boards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Platform Hubs for this location */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary">
                                <Search className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Browse by Platform</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_PLATFORMS.map(platform => (
                                <Link
                                    key={platform.slug}
                                    href={`/jobs/platform/${platform.slug}/software-engineer/${locationSlug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Search {platform.label}</h3>
                                            <p className="text-sm text-slate-500">Find {location.name} roles on {platform.label}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Popular Role Hubs for this location */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Popular Roles in {location.name}</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_ROLES.slice(0, 15).map(role => (
                                <Link
                                    key={role.slug}
                                    href={`/jobs/platform/greenhouse/${role.slug}/${locationSlug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{role.label}</h3>
                                            <p className="text-sm text-slate-500">View unlisted {role.label} openings</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Snippet Definition */}
                <div className="mb-16 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What are hidden tech jobs in {location.name}?</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Hidden tech jobs in {location.name} are roles posted directly to company ATS platforms (Greenhouse, Lever, Ashby) that never reach mass job boards. These roles typically have 90% fewer applicants than syndicated listings. HiddenJobs gives you direct search access to these unlisted opportunities.
                    </p>
                </div>

                {/* FAQ/AEO Section */}
                <section className="mt-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 dark:text-white text-center">Frequently Asked Questions about {location.name} Jobs</h2>
                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
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
