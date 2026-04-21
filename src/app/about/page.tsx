import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Search, Globe, Zap, Mail, Rocket } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'About HiddenJobs | How we uncover the hidden job market',
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
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                            We don't use high-level aggregators. Our engine targets public Greenhouse, Lever, and Ashby subdomains directly, bypassing the "noise" of traditional job boards.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black">Anti-Viral Strategy</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                            By the time a job has 1000+ LinkedIn applicants, your odds are near zero. HiddenJobs helps you apply when there are <span className="text-primary font-bold">10</span>.
                        </p>
                    </div>
                </div>

                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-[40px] p-12 mb-20 border border-slate-100 dark:border-slate-800">
                    <h2 className="text-3xl font-black mb-8">Editorial Integrity (E-E-A-T)</h2>
                    <div className="prose prose-lg dark:prose-invert">
                        <p>
                            At HiddenJobs, we believe transparency is the foundation of trust. Our market intelligence is powered by a proprietary analysis engine that cross-references live job post data with historical hiring patterns.
                        </p>
                        <p>
                            <strong>Every overview is curated:</strong> While we use AI to summarize market trends, our editorial team regularly audits the signals for accuracy. We focus on "hard" data point—direct ATS signatures, response times, and posting freshness.
                        </p>
                        <p>
                            Our goal is to be the primary source for job seekers who value speed and direct access over social media noise.
                        </p>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-[40px] p-12 mb-20 border border-slate-100 dark:border-slate-800 text-center">
                    <h2 className="text-3xl font-black mb-6 text-primary">Get in Touch</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                        Have questions about our data or want to request a specific company board to be indexed?
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
