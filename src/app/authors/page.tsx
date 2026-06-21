import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AUTHORS } from '@/content/authors';
import { Shield, BookOpen, Linkedin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Meet Our Editorial Team & Recruitment Experts | HiddenJobs',
    description: 'Learn about the recruitment professionals and engineering experts behind HiddenJobs. Discover our background, editorial standards, and E-E-A-T commitments.',
};

export default function AuthorsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Shield className="w-3.5 h-3.5" />
                        E-E-A-T Verification
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                        Meet Our <span className="text-primary">Experts</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Our job market reports, editorial articles, and guides are written and reviewed by experienced tech recruiters and systems engineers. We do not publish generic automated text.
                    </p>
                </header>

                <div className="space-y-12 mb-20">
                    {AUTHORS.map((author) => (
                        <div 
                            key={author.id}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow"
                        >
                            {/* Profile Image / Initials Placeholder */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-inner">
                                {author.name.split(' ').map(n => n[0]).join('')}
                            </div>

                            <div className="flex-grow space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{author.name}</h2>
                                        <p className="text-sm font-semibold text-primary">{author.role}</p>
                                    </div>
                                    <a 
                                        href={author.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
                                    >
                                        <Linkedin className="w-3.5 h-3.5" />
                                        LinkedIn Profile
                                    </a>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {author.bio}
                                </p>

                                <div className="space-y-2 pt-2">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Verifiable Credentials</h4>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {author.credentials.map((cred, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                <span>{cred}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="bg-slate-100 dark:bg-slate-800/30 rounded-[40px] p-8 md:p-12 border border-slate-200/50 dark:border-slate-800">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Our Editorial Integrity</h3>
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                Every guide, directory entry, and overview on HiddenJobs is subjected to a rigorous editorial review process. Our database is continuously monitored for accuracy, ensuring that all Greenhouse, Lever, Ashby, and Workday URL signatures correspond to authentic, active applicant tracking system portals.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link href="/about" className="text-xs font-black text-primary hover:underline uppercase tracking-wider">
                                    Read About Our Methodology →
                                </Link>
                                <span className="text-slate-300">|</span>
                                <Link href="/blog" className="text-xs font-black text-primary hover:underline uppercase tracking-wider">
                                    Explore Technical Guides →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
