import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Search, BookOpen, Terminal, ClipboardList, HelpCircle, ArrowRight, ArrowLeft, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'ATS Job Hunting Resources & Boolean Playbook | HiddenJobs',
    description: 'Get access to our comprehensive guide on applicant tracking systems, direct job hunting playbooks, boolean search queries, and FAQ.',
};

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                        <BookOpen className="w-3 h-3" />
                        Developer & Candidate Resources
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                        The Direct ATS Job <span className="text-primary">Search Playbook</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        A technical guide, comparative index, and boolean blueprint designed to help high-growth tech professionals bypass job aggregators and apply directly to source databases.
                    </p>
                </header>

                {/* Section 1: ATS Platforms Comparison */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">1. Applicant Tracking Systems Compared</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-normal leading-relaxed">
                        Different companies choose different software to run their candidate pipelines. Understanding the design philosophy, indexing speeds, and parsing behavior of each platform allows you to tailor your applications for maximum conversion.
                    </p>

                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-3xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-black uppercase text-slate-400 tracking-wider">
                                    <th className="p-4 sm:p-6">ATS Platform</th>
                                    <th className="p-4 sm:p-6">Indexing Latency</th>
                                    <th className="p-4 sm:p-6">Unlisted Frequency</th>
                                    <th className="p-4 sm:p-6">Parsing Accuracy</th>
                                    <th className="p-4 sm:p-6">Best Search Method</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-semibold text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold text-slate-900 dark:text-white">Greenhouse</td>
                                    <td className="p-4 sm:p-6">12-24 Hours</td>
                                    <td className="p-4 sm:p-6 text-emerald-500">Very High (65%)</td>
                                    <td className="p-4 sm:p-6">92% (High)</td>
                                    <td className="p-4 sm:p-6">Google Dorking</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold text-slate-900 dark:text-white">Lever</td>
                                    <td className="p-4 sm:p-6">6-12 Hours</td>
                                    <td className="p-4 sm:p-6 text-emerald-500">High (45%)</td>
                                    <td className="p-4 sm:p-6 text-amber-500">85% (Medium)</td>
                                    <td className="p-4 sm:p-6">Boolean Site Search</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold text-slate-900 dark:text-white">Ashby</td>
                                    <td className="p-4 sm:p-6">4-8 Hours</td>
                                    <td className="p-4 sm:p-6 text-amber-500">Medium (35%)</td>
                                    <td className="p-4 sm:p-6 text-emerald-500">96% (Exceptional)</td>
                                    <td className="p-4 sm:p-6">Direct API Inspection</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold text-slate-900 dark:text-white">Workday</td>
                                    <td className="p-4 sm:p-6">24-48 Hours</td>
                                    <td className="p-4 sm:p-6 text-amber-500">Medium (30%)</td>
                                    <td className="p-4 sm:p-6 text-red-500">70% (Poor)</td>
                                    <td className="p-4 sm:p-6">Multi-Domain Queries</td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-6 font-bold text-slate-900 dark:text-white">SmartRecruiters</td>
                                    <td className="p-4 sm:p-6">8-16 Hours</td>
                                    <td className="p-4 sm:p-6 text-emerald-500">High (50%)</td>
                                    <td className="p-4 sm:p-6 font-normal">88% (Medium)</td>
                                    <td className="p-4 sm:p-6">Subdomain Matching</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 space-y-4 text-sm text-slate-500 leading-relaxed font-normal">
                        <h4 className="font-bold text-slate-900 dark:text-white">Key Platform Behaviors & Candidate Takeaways:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Greenhouse:</strong> Greenhouse does not force candidates to sign up for accounts, making applications fast. They use standard resume parsers, so keeping formatting simple is ideal.</li>
                            <li><strong>Lever:</strong> Lever merges duplicate candidate profiles automatically. If you apply to multiple Lever roles at a single company, recruiters see your entire history instantly. Ensure your resumes match in facts.</li>
                            <li><strong>Ashby:</strong> A modern, Javascript-heavy client. It parses PDFs with extremely high precision. Because they render boards on the client, standard search engines often miss new openings.</li>
                            <li><strong>Workday:</strong> Requires you to create a separate login for every single company career site. While tedious, this barrier filters out massive candidate volumes, making Workday listings highly valuable once you complete the steps.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 2: Boolean Playbook */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">2. Google Boolean Search Blueprint</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-normal leading-relaxed">
                        Google search dorks allow you to query indexed web databases with highly specific syntax. Rather than visiting career portals one-by-one, copy-paste these templates directly into Google, altering variables for your specific domain requirements.
                    </p>

                    <div className="space-y-6">
                        {/* Playbook Item 1 */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between text-base">
                                <span>Software Engineers (Full Stack, Backend, Frontend)</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">Template</span>
                            </h3>
                            <code className="block bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono mb-4 select-all overflow-x-auto whitespace-pre-wrap">
                                site:boards.greenhouse.io OR site:jobs.lever.co ("Software Engineer" OR "Developer") AND ("React" OR "TypeScript") "Remote" -intern -junior
                            </code>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">
                                <strong>Explanation:</strong> This looks across Greenhouse and Lever for engineer or developer postings containing React or TypeScript, filters for remote status, and removes junior and intern listings from the output pages.
                            </p>
                        </div>

                        {/* Playbook Item 2 */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between text-base">
                                <span>Product Managers & Product Designers</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">Template</span>
                            </h3>
                            <code className="block bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono mb-4 select-all overflow-x-auto whitespace-pre-wrap">
                                site:jobs.ashbyhq.com OR site:jobs.lever.co ("Product Manager" OR "Product Designer") "San Francisco" -associate -intern
                            </code>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">
                                <strong>Explanation:</strong> Queries Ashby and Lever boards specifically looking for PM or design roles located physically in San Francisco, while excluding associate and intern roles.
                            </p>
                        </div>

                        {/* Playbook Item 3 */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between text-base">
                                <span>Sales, Marketing & GTM Roles</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">Template</span>
                            </h3>
                            <code className="block bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono mb-4 select-all overflow-x-auto whitespace-pre-wrap">
                                site:jobs.smartrecruiters.com ("Account Executive" OR "SDR" OR "Growth Marketing") "New York"
                            </code>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">
                                <strong>Explanation:</strong> Focuses on SmartRecruiters' database to isolate go-to-market roles in the NYC region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: The Optimized Applying Pipeline */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">3. Four-Phase Direct Application Pipeline</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-normal leading-relaxed">
                        To maximize interviews, structure your daily search schedule into a consistent workflow:
                    </p>

                    <div className="space-y-8 pl-4 border-l border-slate-100 dark:border-slate-800">
                        {/* Phase 1 */}
                        <div className="relative pl-6">
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">Phase 1: Continuous Direct Sourcing (Daily)</h3>
                            <p className="text-sm text-slate-500 font-normal leading-relaxed mt-2">
                                Avoid looking for jobs on LinkedIn. Instead, run search dorks every morning at 9:00 AM local time, or check the HiddenJobs dashboard to view newly indexed ATS links. Focus only on jobs posted within the last 48 hours to ensure you are the first in the recruiter's inbox.
                            </p>
                        </div>

                        {/* Phase 2 */}
                        <div className="relative pl-6">
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">Phase 2: Resume Keyword Mapping</h3>
                            <p className="text-sm text-slate-500 font-normal leading-relaxed mt-2">
                                Review the core qualifications listed in the ATS job description. Extract specific technical noun pairings (e.g., "Kubernetes", "Next.js", "CI/CD"). Ensure these words are clearly written in your experience summaries. Use standard, single-column document layouts to guarantee clean parser text output.
                            </p>
                        </div>

                        {/* Phase 3 */}
                        <div className="relative pl-6">
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">Phase 3: Submitting Directly</h3>
                            <p className="text-sm text-slate-500 font-normal leading-relaxed mt-2">
                                Apply directly via the company's Greenhouse or Lever page. Avoid third-party redirection platforms, which can corrupt metadata tags and formatting during ingestion. Fill out optional fields like Cover Letter and Portfolio site to showcase high intent.
                            </p>
                        </div>

                        {/* Phase 4 */}
                        <div className="relative pl-6">
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-base">Phase 4: Follow-up & Outreach</h3>
                            <p className="text-sm text-slate-500 font-normal leading-relaxed mt-2">
                                Find the Lead Recruiter or Hiring Manager on LinkedIn for the target company. Wait 24 hours after applying directly, then send a concise, 3-sentence message highlighting that you have submitted an application directly on their Greenhouse portal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 4: FAQ */}
                <section className="bg-slate-50 dark:bg-slate-800/30 rounded-[40px] p-8 sm:p-12 mb-20 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-8">
                        <HelpCircle className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">4. Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6 font-normal">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why do companies post jobs directly to ATS without syndicating?</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Syndicating postings to job sites like LinkedIn costs money and attracts massive volumes of unfiltered applicants. By keeping posts local, companies reduce costs and ensure applicants are proactive searchers who visited their careers page directly.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Is it ethical to bypass LinkedIn's application portal?</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Absolutely. LinkedIn's "Easy Apply" feature acts as a secondary aggregator layer. Applying on the direct Greenhouse or Lever URL is the official application format that recruiters prefer, as it integrates directly with their daily management dashboard.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">How does HiddenJobs obtain its listings?</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Our platform uses public domain indexing to search Greenhouse, Lever, Ashby, Workday, and SmartRecruiters databases. We compile active job pages and verify their headers before displaying them in our search directories.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">How does direct applying affect response rates?</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Recruiters see direct candidates at the top of their dashboard view. Because these lists are not flooded with 1,000+ random applications, direct submissions enjoy significantly higher review rates and faster response times.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-4xl font-black mb-6">Start Finding Unlisted Opportunities</h2>
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
