
import { HelpCircle, Zap, Shield, Globe, Search, Layers } from "lucide-react";

const faqs = [
    {
        question: "What is the 'Hidden Job Market'?",
        answer: "The hidden job market refers to the roughly 60-70% of roles that are never posted on public job boards like LinkedIn or Indeed. These roles live directly on company careers pages (ATS platforms like Greenhouse and Lever) and are often filled via referrals or direct search before they ever go 'viral' public."
    },
    {
        question: "How does HiddenJobs find these jobs?",
        answer: "We use advanced boolean search techniques—often called 'Google Dorks'—to specifically target the technical directories of platforms like Greenhouse, Lever, Ashby, and Workday. This bypasses the noisy job boards and takes you straight to the source."
    },
    {
        question: "Is this legal and safe?",
        answer: "Absolutely. We are simply generating advanced search queries for public search engines. We don't scrape private data or bypass any authentication. Everything we find is a publicly indexed job posting that is just hard to find through normal search interfaces."
    },
    {
        question: "Why not just use LinkedIn?",
        answer: "LinkedIn jobs often receive 500+ applications within the first hour. By applying directly to the ATS link found by HiddenJobs, you're often one of the first few applicants, significantly increasing your chances of a human recruiter actually seeing your resume."
    }
];

export function InfoSection() {
    return (
        <section className="mt-32 border-t border-slate-100 dark:border-slate-800 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 text-left">

                {/* Value Props */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-primary">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">Direct to Source</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Bypass middleman boards. We take you straight to the internal recruitment portal where your application is processed first.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Search className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">Boolean Precision</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Our engine generates high-precision dork queries that filter out generic blog posts and expired listings automatically.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">Multi-ATS Indexing</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            One search covers Greenhouse, Lever, Ashby, Workable, and 10+ other platforms simultaneously.
                        </p>
                    </div>
                </div>

                {/* FAQ Section (AEO/GEO focus) */}
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Frequently Asked Questions
                </h2>

                <div className="space-y-8">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group">
                            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                {faq.question}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Statistics Box */}
                <div className="mt-32 p-10 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="text-center md:text-left">
                            <div className="text-5xl font-black mb-2 text-blue-400">60%</div>
                            <div className="text-sm uppercase tracking-widest font-bold opacity-60">of Tech Jobs</div>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                        <p className="text-lg opacity-90 font-medium leading-relaxed italic">
                            "Most high-growth startups only list on their official Greenhouse or Lever boards to avoid 'spam' applications. If you aren't looking there, you aren't looking."
                        </p>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                </div>
            </div>
        </section>
    );
}
