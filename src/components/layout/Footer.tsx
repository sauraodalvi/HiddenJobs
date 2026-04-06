import Link from 'next/link';
import { DIRECTORY_PLATFORMS, DIRECTORY_ROLES, DIRECTORY_LOCATIONS } from '@/lib/constants';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-20 pb-12 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full border-2 border-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">HiddenJobs</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                            Uncovering the 60% of tech roles that never reach public boards. Search Greenhouse, Lever, and Ashby directly.
                        </p>
                    </div>

                    {/* Platforms */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platforms</h4>
                        <ul className="space-y-4">
                            {DIRECTORY_PLATFORMS.map(platform => (
                                <li key={platform.slug}>
                                    <Link
                                        href={`/jobs/platform/${platform.slug}`}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {platform.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Roles */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Top Roles</h4>
                        <ul className="space-y-4">
                            {DIRECTORY_ROLES.slice(0, 8).map(role => (
                                <li key={role.slug}>
                                    <Link
                                        href={`/jobs/role/${role.slug}`}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {role.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Discovery</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-sm text-slate-500 hover:text-primary transition-colors hover:translate-x-1 inline-block">
                                    About HiddenJobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="text-sm text-primary hover:underline transition-colors font-bold flex items-center gap-1">
                                    Browse All Directories
                                </Link>
                            </li>

                            {DIRECTORY_LOCATIONS.map(loc => (
                                <li key={loc.slug}>
                                    <Link
                                        href={`/jobs/location/${loc.slug}`}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                                    >
                                        Jobs in {loc.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-slate-400 font-medium">
                        © 2026 HiddenJobs. Built for the hidden job market.
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Privacy</Link>
                        <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Terms</Link>
                    </div>
                </div>
            </div>
        </footer >
    );
}
