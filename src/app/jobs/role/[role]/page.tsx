import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getRoleSeoMetadata } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, ChevronRight, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{
        role: string;
    }>;
}

export async function generateStaticParams() {
    return DIRECTORY_ROLES.map(role => ({
        role: role.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { role: roleSlug } = await params;
    const seo = getRoleSeoMetadata(roleSlug);

    if (!seo) return { title: 'Not Found' };

    return {
        title: seo.title,
        description: seo.description,
    };
}

export default async function RoleDirectoryPage({ params }: PageProps) {
    const { role: roleSlug } = await params;
    const seo = getRoleSeoMetadata(roleSlug);

    if (!seo) notFound();

    const { role } = seo;

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
                    <span className="capitalize">{role.label}</span>
                </nav>

                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-6">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Role Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        Unlisted <span className="text-primary">{role.label}</span> Opportunities
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Exposing {role.label} roles directly from company recruitment portals. No aggregators, no ghost jobs—just direct links to the source.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Top Locations for this role */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Top Locations for {role.label}s</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_LOCATIONS.map(loc => (
                                <Link
                                    key={loc.slug}
                                    href={`/jobs/greenhouse/${roleSlug}/${loc.slug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{role.label} in {loc.label}</h3>
                                            <p className="text-sm text-slate-500">View hidden roles in {loc.label}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platforms for this role */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary">
                                <Search className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Platforms Hiring {role.label}s</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_PLATFORMS.map(platform => (
                                <Link
                                    key={platform.slug}
                                    href={`/jobs/${platform.slug}/${roleSlug}/remote`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{platform.label} Hub</h3>
                                            <p className="text-sm text-slate-500">Search {role.label} roles on {platform.label}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* GEO/AEO Content Block */}
                <div className="mt-32 p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Mastering the {role.label} Job Hunt</h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                In today's market, speed is everything. By the time a {role.label} role reaches a main job board, it likely has hundreds of applicants. Using HiddenJobs allows you to apply within the first few hours of a company posting to their own site.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-2">Direct Access</h4>
                                <p className="text-sm text-slate-400">Apply via original ATS links to ensure your profile reaches a human recruiter faster.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold mb-2">Verified Sources</h4>
                                <p className="text-sm text-slate-400">We exclusively index technical ATS platforms used by modern tech startups and unicorns.</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-48 -mt-48" />
                </div>
            </main>

            <Footer />
        </div>
    );
}
