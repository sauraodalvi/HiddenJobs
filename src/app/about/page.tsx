import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Search, Globe, Zap, Mail, Rocket, Target, Users, Calendar, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'About Us | How we uncover the hidden job market',
    description: 'Learn how HiddenJobs scans public ATS subdomains to find roles that never reach LinkedIn. Our mission is to democratize the job search.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <header className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Rocket className="w-3 h-3" />
                        Our Mission
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
                        Unlocking the <span className="text-primary text-secondary">Hidden</span> Market.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        60% of tech roles are posted to company internal boards days before they are indexed by LinkedIn or Indeed. We built HiddenJobs to give you that head start.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-12 mb-20 font-bold">
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                            <Search className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black">Direct Scanning</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                            We don't use high-level aggregators. Our engine targets public Greenhouse, Lever, and Ashby subdomains directly, bypassing the "noise" of traditional job boards.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black">Anti-Viral Strategy</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                            By the time a job has 1000+ LinkedIn applicants, your odds are near zero. HiddenJobs helps you apply when there are <span className="text-primary font-bold">10</span>.
                        </p>
                    </div>
                </div>

                {/* Trust Methodology Section */}
                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-[40px] p-12 mb-20 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Trust & Verification Methodology</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
                        <p>
                            In an era dominated by automated scrapers and ghost jobs, verifying job validity is our highest priority. To maintain the highest level of E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness), HiddenJobs implements a rigorous multi-stage verification pipeline for every listed role:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6 mt-8 font-normal">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> ATS Signature Matching
                                </h4>
                                <p className="text-sm text-slate-500">
                                    We verify each job's endpoint against known metadata schemas of major Applicant Tracking Systems. This prevents fake or copycat landing pages from crawling into our index.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Active Header Checks
                                </h4>
                                <p className="text-sm text-slate-500">
                                    Every 12 hours, our system sends head requests to the destination ATS boards. If a posting returns a 404 or redirect (indicating it was closed), it is instantly pruned from our index.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Editorial Oversight
                                </h4>
                                <p className="text-sm text-slate-500">
                                    While the search indexing is automated, our recruitment experts (led by Sarah Jenkins) regularly audit the data feeds to ensure the relevance of categorized sectors and roles.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Anti-Ghost Filter
                                </h4>
                                <p className="text-sm text-slate-500">
                                    Roles that have been open for over 90 days are flagged as stale, keeping our system focused on high-intent hiring managers who are seeking active hires.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline / Milestones */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Calendar className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Journey</h2>
                    </div>
                    <div className="relative border-l border-slate-200 dark:border-slate-700 ml-4 space-y-8">
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                            <time className="text-xs font-black uppercase tracking-wider text-primary">Late 2024</time>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Inception & Concept</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                Dissatisfied with the application noise on LinkedIn, we began tracking direct ATS links for local software engineering teams. We found that early application led to a 75% higher response rate.
                            </p>
                        </div>
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                            <time className="text-xs font-black uppercase tracking-wider text-primary">Mid 2025</time>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Building the Search Engine</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                We launched our first automated parser prototype. It scanned Greenhouse and Lever boards daily, filtering out duplicate entries and compiling direct applying URLs for select tech hubs.
                            </p>
                        </div>
                        <div className="relative pl-8">
                            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                            <time className="text-xs font-black uppercase tracking-wider text-primary">Early 2026</time>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Platform Launch</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                We officially rolled out the public directory system, expanding our search targets to cover Ashby, Workday, and SmartRecruiters. The system now indexes thousands of unlisted opportunities daily.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team / E-E-A-T Authors */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Users className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Our Editorial & Tech Team</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-lg font-black">
                                SJ
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</h4>
                                <p className="text-xs text-primary font-semibold">Chief Recruiting Expert</p>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Former Lead Tech Recruiter at Stripe and Figma. Over 10 years of hiring experience. Sarah oversees our editorial policies, content authenticity, and recruitment standards.
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-lg font-black">
                                MC
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Marcus Chen</h4>
                                <p className="text-xs text-primary font-semibold">Principal Systems Architect</p>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Ex-Netflix and ex-Vercel Infrastructure Engineer. Marcus handles the indexer scaling, data extraction pipeline, and performance optimization for our ATS scanning engines.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/authors" className="text-sm font-black text-primary hover:underline uppercase tracking-wider">
                            View our complete E-E-A-T credentials page →
                        </Link>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-[40px] p-12 mb-20 border border-slate-100 dark:border-slate-800 text-center">
                    <h2 className="text-3xl font-black mb-6 text-primary">Get in Touch</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium text-sm">
                        Have questions about our data verification or want to request a specific company board to be indexed by our engine?
                    </p>
                    <a href="mailto:support@hiddenjobs.app" className="text-xl font-black hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        support@hiddenjobs.app
                    </a>
                </section>

                <section className="text-center">
                    <h2 className="text-4xl font-black mb-6">Ready to find your next role?</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-bold">
                        <Link
                            href="/jobs"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                            Browse Directories
                        </Link>
                        <Link
                            href="/#pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                            Get Pro Beta
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
