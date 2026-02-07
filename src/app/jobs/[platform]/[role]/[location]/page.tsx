import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getSeoMetadata, generateSeoDork } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { ExternalLink, Search, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
    params: Promise<{
        platform: string;
        role: string;
        location: string;
    }>;
}

export async function generateStaticParams() {
    const params = [];

    for (const platform of DIRECTORY_PLATFORMS) {
        for (const role of DIRECTORY_ROLES.slice(0, 15)) { // Top 15 roles
            for (const location of DIRECTORY_LOCATIONS.slice(0, 5)) { // Top 5 locations
                params.push({
                    platform: platform.slug,
                    role: role.slug,
                    location: location.slug,
                });
            }
        }
    }

    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { platform, role, location } = await params;
    const seo = getSeoMetadata(platform, role, location);

    if (!seo) return { title: 'Not Found' };

    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
        }
    };
}

export default async function JobDirectoryPage({ params }: PageProps) {
    const { platform: platformSlug, role: roleSlug, location: locationSlug } = await params;
    const seo = getSeoMetadata(platformSlug, roleSlug, locationSlug);

    if (!seo) notFound();

    const { platform, role, location } = seo;
    const dork = generateSeoDork(platform.domain, role.label, location.label);
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hiddenjobs.netlify.app/" },
            { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://hiddenjobs.netlify.app/jobs" },
            { "@type": "ListItem", "position": 3, "name": platform.label, "item": `https://hiddenjobs.netlify.app/jobs/platform/${platformSlug}` },
            { "@type": "ListItem", "position": 4, "name": role.label, "item": `https://hiddenjobs.netlify.app/jobs/role/${roleSlug}` },
            { "@type": "ListItem", "position": 5, "name": location.label, "item": `https://hiddenjobs.netlify.app/jobs/${platformSlug}/${roleSlug}/${locationSlug}` }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-20 pb-32">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="hover:text-primary">Jobs</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="capitalize">{platform.label}</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="capitalize">{role.label}</span>
                </nav>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                {platform.label} Directory
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                                {role.label} Jobs <br />
                                <span className="text-primary">in {location.label}</span>
                            </h1>
                        </div>

                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-600 shadow-inner">
                            <Globe className="w-10 h-10 text-slate-400" />
                        </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        Currently tracking <strong>{role.label}</strong> roles specifically on the <strong>{platform.label}</strong> applicant tracking system for <strong>{location.label}</strong>. These jobs are often unlisted on major job boards.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white shadow-2xl relative overflow-hidden group border border-slate-800">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Search className="w-5 h-5 text-blue-400" />
                                    Live Search Query
                                </h3>
                                <div className="font-mono text-xs md:text-sm bg-black/30 p-4 rounded-xl mb-6 break-all line-clamp-3 group-hover:line-clamp-none transition-all border border-white/5">
                                    {dork}
                                </div>
                                <a
                                    href={googleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                                >
                                    View Live Results
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] -mr-32 -mt-32" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors bg-white dark:bg-slate-800/50">
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Why {platform.label}?</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Most high-growth companies use {platform.label} exclusively. Searching it directly bypasses 90% of your competition.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors bg-white dark:bg-slate-800/50">
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Verified {location.label}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Filtered for local and remote-first companies hiring specifically for {location.label} based talent.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mt-20">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Other Locations</h2>
                    <div className="flex flex-wrap gap-3">
                        {DIRECTORY_LOCATIONS.map(loc => (
                            <Link
                                key={loc.slug}
                                href={`/jobs/${platformSlug}/${roleSlug}/${loc.slug}`}
                                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                            >
                                {loc.label}
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Other Roles on {platform.label}</h2>
                    <div className="flex flex-wrap gap-3">
                        {DIRECTORY_ROLES.map(r => (
                            <Link
                                key={r.slug}
                                href={`/jobs/${platformSlug}/${r.slug}/${locationSlug}`}
                                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                            >
                                {r.label}
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
