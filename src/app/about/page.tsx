
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AboutJsonLd from "@/components/seo/AboutJsonLd";
import { Linkedin, Github, Mail, Shield, Zap, Globe } from "lucide-react";

export const metadata = {
    title: "About | HiddenJobs & Saurao Dalvi",
    description: "Learn about the mission behind HiddenJobs and meet the creator Saurao Dalvi. Uncovering the 60% of tech jobs not on LinkedIn.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <AboutJsonLd />
            <Header />

            <main className="relative pt-20 pb-32">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-800 p-8 md:p-16 text-white text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 relative z-10">
                            Bypassing the Noise.<br />
                            <span className="text-primary">Uncovering the Invisible.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 relative z-10 leading-relaxed">
                            HiddenJobs was born from a simple realization: the best jobs aren't found in a crowded feed. They are hidden where the real work happens.
                        </p>
                    </div>
                </section>

                {/* The Problem & Solution */}
                <section className="max-w-7xl mx-auto px-6 mb-32 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="text-primary w-8 h-8" />
                            Why HiddenJobs?
                        </h2>
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            <p>
                                Today's job market is broken. A single "Apply" button on LinkedIn can lead to thousands of applicants in hours, making it nearly impossible for talented individuals to stand out.
                            </p>
                            <p>
                                <strong className="text-slate-900 dark:text-white font-semibold italic">Did you know that over 60% of technical roles never make it to public job boards?</strong> They live in the private directories of Applicant Tracking Systems (ATS) like Greenhouse, Lever, and Ashby.
                            </p>
                            <p>
                                HiddenJobs is a specialized search engine designed to index these directories directly. We give you the keys to the kingdom by generating precision boolean queries that expose unlisted roles.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { icon: <Zap className="w-5 h-5" />, title: "Instant Discovery", desc: "Access 50,000+ live roles directly from company careers pages." },
                            { icon: <Globe className="w-5 h-5" />, title: "ATS Mastery", desc: "Deep integration with Greenhouse, Lever, and Ashby platforms." },
                            { icon: <Shield className="w-5 h-5" />, title: "No Noise", desc: "Bypass recruiter spam and social media distractions." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* The Creator */}
                <section className="max-w-4xl mx-auto px-6 mb-32 text-center">
                    <div className="mb-12">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            The Human Behind the Code
                        </span>
                        <h2 className="text-4xl font-extrabold mb-6">Meet Saurao Dalvi</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-8" />
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-400">
                        <p>
                            I built HiddenJobs because I believe the tech industry needs a better way to connect talent with opportunity. As an engineer and product creator, I've seen firsthand how traditional job boards can obscure the most interesting roles at the world's most innovative companies.
                        </p>
                        <p>
                            My goal with this platform is to provide a transparent, high-leverage tool for job seekers who want to skip the "marketed" jobs and find real impact roles.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col items-center">
                        <h3 className="font-bold text-xl mb-6">Let's Connect</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/saurao-dalvi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0077b5] text-white font-bold hover:scale-105 transition-all shadow-lg shadow-[#0077b5]/20"
                            >
                                <Linkedin className="w-5 h-5" />
                                LinkedIn Profile
                            </a>
                            <a
                                href="https://github.com/sauraodalvi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold hover:scale-105 transition-all shadow-lg shadow-black/20"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ / GEO Section */}
                <section className="max-w-4xl mx-auto px-6">
                    <div className="p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white italic underline decoration-primary/30 underline-offset-4">
                                    How is HiddenJobs different from LinkedIn?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Unlike LinkedIn, which relies on companies manually posting and paying for ads, HiddenJobs programmatically searches the career pages hosted on ATS platforms. This reveals roles that are live and active but might not have been "boosted" on social platforms.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white italic underline decoration-primary/30 underline-offset-4">
                                    Is HiddenJobs free to use?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Yes, the core search and directory features are completely free. If you find the tool valuable, you can support our mission via the "Donate" link in the header.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white italic underline decoration-primary/30 underline-offset-4">
                                    How often is the data updated?
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Our directory is refreshed daily, and our boolean generators always use real-time ATS URL patterns to ensure you're seeing the most current roles available.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
