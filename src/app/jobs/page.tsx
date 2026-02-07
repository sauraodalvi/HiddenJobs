import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { ChevronRight, Briefcase, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Job Directories | HiddenJobs',
    description: 'Browse hidden jobs by platform, role, and location. Explore unlisted opportunities on Greenhouse, Lever, and Ashby.',
};

export default function JobsDirectoryIndex() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Explore <span className="text-primary">Hidden Job</span> Directories
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Access thousands of unlisted roles specifically indexed from major applicant tracking systems. Select a category below to start uncovering your next opportunity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Platforms */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary">
                                <Search className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">By Platform</h2>
                        </div>
                        <div className="space-y-3">
                            {DIRECTORY_PLATFORMS.map(platform => (
                                <Link
                                    key={platform.slug}
                                    href={`/jobs/${platform.slug}/software-engineer/remote`}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{platform.label}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Roles */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">Popular Roles</h2>
                        </div>
                        <div className="space-y-3">
                            {DIRECTORY_ROLES.slice(0, 8).map(role => (
                                <Link
                                    key={role.slug}
                                    href={`/jobs/greenhouse/${role.slug}/remote`}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{role.label}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">Top Locations</h2>
                        </div>
                        <div className="space-y-3">
                            {DIRECTORY_LOCATIONS.map(loc => (
                                <Link
                                    key={loc.slug}
                                    href={`/jobs/greenhouse/software-engineer/${loc.slug}`}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{loc.label}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SEO Text Block */}
                <div className="mt-32 p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">Why use the HiddenJobs Directory?</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Most job seekers wait for a role to appear on LinkedIn or Indeed. By then, the position already has hundreds of applicants. Our directory gives you direct access to the source code of the recruitment world—applicant tracking systems.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Search Greenhouse, Lever, Ashby, and Workday directly. Filter by role and location with precision dorking strings that traditional search engines hide.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -mr-48 -mt-48" />
                </div>
            </main>
        </div>
    );
}
