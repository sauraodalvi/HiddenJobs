import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS, DIRECTORY_PLATFORMS } from '@/lib/constants';
import { getRoleSeoMetadata, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Briefcase, MapPin, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AIAnswerBlock } from '@/components/seo/AIAnswerBlock';
import { AuthorBio } from '@/components/seo/AuthorBio';
import { ExpertReviewedBadge } from '@/components/seo/ExpertReviewedBadge';
import { getCanonicalBaseUrl } from '@/lib/domain';

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
    const seo = await getRoleSeoMetadata(roleSlug);

    if (!seo) return { title: 'Not Found', robots: { index: false, follow: false } };

    const canonicalBase = getCanonicalBaseUrl();

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `${canonicalBase}/jobs/role/${roleSlug}`,
        },
        robots: seo.robots || 'index, follow',
    };
}

export default async function RoleDirectoryPage({ params }: PageProps) {
    const { role: roleSlug } = await params;
    const seo = await getRoleSeoMetadata(roleSlug);

    if (!seo) {
        notFound();
    }

    const { role } = seo;

    const breadcrumbs = await getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Jobs', item: '/jobs' },
        { name: role.name, item: `/jobs/role/${roleSlug}` }
    ]);

    const roleFaqs = [
        { question: `How to find unlisted ${role.name} jobs?`, answer: `Search for ${role.name} roles directly on Greenhouse, Lever, and Ashby ATS boards using HiddenJobs to access listings that never appear on LinkedIn.` },
        { question: `Why do ${role.name} roles have fewer applicants on ATS boards?`, answer: `Because these roles aren't syndicated to mass job boards, they receive 80-90% fewer applications — giving early applicants a massive advantage.` },
        { question: `Where do most ${role.name} roles get posted first?`, answer: `Companies post ${role.name} openings to their internal ATS first, often 48-72 hours before they appear on LinkedIn or other job boards.` }
    ];
    const faqSchema = getFaqSchema(roleFaqs);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <Breadcrumbs items={[
                    { label: 'Jobs', href: '/jobs' },
                    { label: role.name },
                ]} />

                <div className="mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-6">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Role Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        Unlisted <span className="text-primary">{role.name}</span> Opportunities
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Exposing {role.name} roles directly from company recruitment portals. No aggregators, no ghost jobs—just direct links to the source.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Top Locations for this role */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Top Locations for {role.name}s</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_LOCATIONS.filter(loc => (loc.jobCount || 0) > 0 || loc.slug === 'remote').map(loc => (
                                <Link
                                    key={loc.slug}
                                    href={`/jobs/location/${loc.slug}`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{role.name} in {loc.label}</h3>
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
                            <h2 className="text-2xl font-bold dark:text-white">Platforms Hiring {role.name}s</h2>
                        </div>
                        <div className="grid gap-4">
                            {DIRECTORY_PLATFORMS.map(platform => (
                                <Link
                                    key={platform.slug}
                                    href={`/jobs/platform/${platform.slug}/${roleSlug}/remote`}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group shadow-sm active:scale-95"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{platform.label} Hub</h3>
                                            <p className="text-sm text-slate-500">Search {role.name} roles on {platform.label}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Snippet Definition */}
                <div className="mb-16 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What are unlisted {role.name} jobs?</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Unlisted {role.name} jobs are openings posted to company ATS platforms like Greenhouse and Lever that are never promoted on LinkedIn or Indeed. HiddenJobs indexes these direct listings so you can find and apply to {role.name} roles before the competition.
                    </p>
                </div>

                {/* GEO/AEO Content Block */}
                <div className="mt-32 p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Mastering the {role.name} Job Hunt</h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                In today's market, speed is everything. By the time a {role.name} role reaches a main job board, it likely has hundreds of applicants. Using HiddenJobs allows you to apply within the first few hours of a company posting to their own site.
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

                {/* AI Overview / Featured Snippet Block */}
                <div className="mt-20 space-y-6">
                    <div className="flex items-center gap-3">
                        <ExpertReviewedBadge />
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">GEO Optimized</span>
                    </div>
                    <AIAnswerBlock
                        question={`Why should ${role.name}s use HiddenJobs instead of LinkedIn?`}
                        answer={`LinkedIn job posts for ${role.name}s often receive 500+ applications within hours. HiddenJobs bypasses public boards entirely, indexing unlisted roles directly from company ATS portals like Greenhouse and Lever. This gives you a critical speed advantage — apply when competition is under 20 candidates.`}
                        listItems={[
                            `Access ${role.name} roles 48-72 hours before they hit LinkedIn`,
                            "Apply directly on the company career portal — no Easy Apply noise",
                            "Precision boolean queries tailored for your target role",
                        ]}
                    />
                </div>

                {/* FAQ Section */}
                <section className="mt-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">Frequently Asked Questions about {role.name} Jobs</h2>
                    <div className="grid gap-6">
                        {roleFaqs.map((faq, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* E-E-A-T Author Bio */}
                <div className="mt-20">
                    <AuthorBio
                        name="Saurao Dalvi"
                        avatarUrl="/og-image.png"
                        credentials="Creator & Engineer, HiddenJobs"
                        bio="Saurao Dalvi is the engineer and product creator behind HiddenJobs, a platform dedicated to making the hidden tech job market transparent. With deep expertise in ATS platforms, Next.js, and AI-powered search, Saurao built HiddenJobs to give every job seeker the same speed advantage that insiders have."
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
