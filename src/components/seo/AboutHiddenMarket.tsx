import React from 'react';
import { BookOpen, Target, Users } from 'lucide-react';

export const AboutHiddenMarket = () => {
    return (
        <section className="py-20 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto text-left px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <BookOpen className="w-4 h-4" />
                    The Intelligence Report
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
                    Why 60% of High-Impact Roles are "Hidden"
                </h2>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    <p>
                        The modern hiring landscape has shifted. For high-growth companies using ATS platforms like <strong>Greenhouse</strong>, <strong>Lever</strong>, and <strong>Ashby</strong>, listing roles on public aggregators (like LinkedIn or Indeed) is often the <em>last</em> step, not the first.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm mb-4">
                                <Target className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Algorithm-First Discovery</h4>
                            <p className="text-sm">We crawl direct company subdomains to find roles 48-72 hours before they are syndicated. This gives our users the "Speed Margin."</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm mb-4">
                                <Users className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Noise Reduction</h4>
                            <p className="text-sm">By applying directly to the ATS, you avoid the 250+ "Easy Apply" bots that saturate LinkedIn, ensuring your profile is seen by human recruiters.</p>
                        </div>
                    </div>

                    <p>
                        HiddenJobs was built to democratize access to these internal portals. Our researchers constantly map the shifting landscape of company career pages, ensuring that <em>you</em> see the opportunities that others miss.
                    </p>

                    <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-r-xl">
                        "In 2026, the most valuable career move is the one you find before it goes viral. Hidden Market intelligence is no longer optional—it's the standard."
                        <footer className="mt-2 text-sm font-bold text-slate-400">— HiddenJobs Intelligence Team</footer>
                    </blockquote>
                </div>
            </div>
        </section>
    );
};
