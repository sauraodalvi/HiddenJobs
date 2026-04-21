import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIRECTORY_LOCATIONS } from '@/lib/constants';
import { getCompanySeoMetadata, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ResultsSection } from '@/components/results/ResultsSection';
import { Building2, ChevronRight, Globe, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/domain';

interface PageProps {
    params: Promise<{
        domain: string;
    }>;
}

export async function generateStaticParams() {
    // Collect all unique company domains from DIRECTORY_LOCATIONS
    const domains = new Set<string>();
    DIRECTORY_LOCATIONS.forEach(loc => {
        if (loc.companies) {
            loc.companies.forEach(d => domains.add(d));
        }
    });

    return Array.from(domains).map(domain => ({
        domain,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { domain } = await params;
    const seo = getCompanySeoMetadata(domain);

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: `${getBaseUrl()}/company/${domain}`,
        },
    };
}

export default async function CompanyHubPage({ params }: PageProps) {
    const { domain } = await params;
    const seo = getCompanySeoMetadata(domain);

    // Structured Data
    const breadcrumbs = getBreadcrumbSchema([
        { name: 'Home', item: '/' },
        { name: 'Companies', item: '/jobs' },
        { name: seo.companyName, item: `/company/${domain}` }
    ]);

    const faqs = [
        {
            question: `How to find unlisted jobs at ${seo.companyName}?`,
            answer: `${seo.companyName} often posts roles directly to Greenhouse or Lever before they reach LinkedIn. You can search their boards directly using HiddenJobs to find these 'unlisted' opportunities.`
        },
        {
            question: `Does ${seo.companyName} use Greenhouse or Lever?`,
            answer: `Most top tech firms like ${seo.companyName} use modern ATS platforms. HiddenJobs tracks these specific subdomains so you can apply directly.`
        }
    ];

    const faqSchema = getFaqSchema(faqs);

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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <div className="max-w-5xl mx-auto mb-16">
                    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-bold text-slate-900 dark:text-white">{seo.companyName}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xl">
                            <Building2 className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                                {seo.companyName} <span className="text-primary">Hidden Roles</span>
                            </h1>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <Globe className="w-3 h-3" />
                                    {domain}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-[10px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/50">
                                    <Shield className="w-3 h-3" />
                                    Direct ATS Scanning Active
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                        Find the most recent job openings at {seo.companyName} by searching their infrastructure directly. We help you bypass third-party aggregators and find roles before they go viral.
                    </p>
                </div>

                {/* Results Section for the Company */}
                <div className="mt-12 bg-white dark:bg-slate-800/50 rounded-[40px] border border-slate-200 dark:border-slate-700 shadow-2xl p-4 md:p-8">
                    <div className="mb-8 px-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">Active Boards</h2>
                            <p className="text-sm text-slate-500">Scanning all supported ATS platforms for "{seo.companyName}"</p>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Check className="w-3 h-3 text-emerald-500" />
                            Updated {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* We pass the company name as a property if we update ResultsSection, 
                        or we just rely on the URL param and useSearchFilters detecting the 'company' in URL.
                        Since JobPage doesn't have useSearchParams, we should probably pass it.
                    */}
                    <ResultsSection initialCompany={domain.split('.')[0]} />
                </div>

                {/* FAQ Section */}
                <section className="mt-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
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
