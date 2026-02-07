import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getLocationSeoMetadata } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, ChevronRight, Briefcase, Search } from 'lucide-react';
import Link from 'next/link';

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
    const seo = getLocationSeoMetadata(locationSlug);

    if (!seo) return { title: 'Not Found' };

    return {
        title: seo.title,
        description: seo.description,
    };
}

export default async function LocationDirectoryPage({ params }: PageProps) {
    const { location: locationSlug } = await params;
    const seo = getLocationSeoMetadata(locationSlug);

    if (!seo) notFound();

    const { location } = seo;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="capitalize">{location.label}</span>
                </nav>

                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Hidden Tech Jobs in <span className="text-primary">{location.label}</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Currently tracking software engineering, product, and design roles across all major ATS platforms specifically for {location.label}. Bypass the crowded job boards.
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
                                    href={`/jobs/${platform.slug}/software-engineer/${locationSlug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Search {platform.label}</h3>
                                            <p className="text-sm text-slate-500">Find {location.label} roles on {platform.label}</p>
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
                            <h2 className="text-2xl font-bold dark:text-white">Popular Roles in {location.label}</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_ROLES.slice(0, 8).map(role => (
                                <Link
                                    key={role.slug}
                                    href={`/jobs/greenhouse/${role.slug}/${locationSlug}`}
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

                {/* FAQ/AEO Section */}
                <div className="mt-32 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                    <h2 className="text-3xl font-bold mb-12 dark:text-white">Finding Jobs in {location.label}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 dark:text-white">Why are these jobs "hidden"?</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                Many high-growth tech companies in {location.label} post directly to their ATS (like Greenhouse or Lever) but don't always pay to promote those same listings on LinkedIn or Indeed. We track those direct URLs.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 dark:text-white">How to apply directly?</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                Our search queries take you straight to the source. When you find a link through our directory, you're often applying through the company's own portal, ensuring your resume lands directly in their recruiter's dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
