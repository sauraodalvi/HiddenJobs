import { HelpCircle, Zap, Shield, Globe, Search, Layers } from "lucide-react";
import { AffiliateRail } from "@/components/affiliate/AffiliateRail";

const faqs = [
    {
        question: "What exactly is the 'Hidden Job Market'?",
        answer: "The hidden job market refers to the roughly 60-70% of roles that are never posted on public job boards like LinkedIn or Indeed. These roles live directly on internal Applicant Tracking System (ATS) platforms. By the time a job hits LinkedIn, it already has hundreds of applicants."
    },
    {
        question: "How does Boolean Dorking work?",
        answer: "We use advanced boolean search techniques—often called 'Google Dorking'—to specifically target the technical directories of platforms like Greenhouse, Lever, Ashby, and Workday. This allows you to filter for exact roles and locations while bypassing non-job search results."
    },
    {
        question: "Is this legal and safe?",
        answer: "Absolutely. We are simply generating automated search queries for public search engines. We don't scrape private data, bypass authentication, or access any non-public information. Everything we find is a publicly indexed career page."
    },
    {
        question: "Why not just use LinkedIn or Indeed?",
        answer: "LinkedIn jobs often receive 500+ applications within the first hour. By finding the direct ATS link, you are effectively applying to the 'source of truth'. This often places your resume at the top of the pile before the role even goes viral."
    },
    {
        question: "How do I find unlisted Remote roles?",
        answer: "Our engine is optimized to detect 'Remote' and 'Work from Home' keywords within the metadata of ATS headers across 10+ different platforms, ensuring you see global opportunities that aggregators often miss."
    },
    {
        question: "Which ATS platforms do you support?",
        answer: "We currently index jobs from Greenhouse, Lever, Ashby, Workday, Paradox, and Workable, covering over 80% of the tech startup and enterprise ecosystem."
    }
];

export function InfoSection() {
    return (
        <section id="faq" className="mt-32 border-t border-slate-100 dark:border-slate-800 pt-32 pb-20">
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
                <h2 className="text-3xl font-black mb-12 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    Deep Dive: The Hidden Job Market
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {faqs.map((faq, i) => (
                        <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-colors shadow-sm group">
                            <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                {faq.question}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                "{faq.answer}"
                            </p>
                        </article>
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

                {/* Contextual Affiliate Banner - Books (Brand/Trust building) */}
                <div className="mt-16">
                    <AffiliateRail variant="books" />
                </div>
            </div>
        </section>
    );
}
