import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of HiddenJobs. Understand your rights and responsibilities when using our job search platform.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />
            <main className="container mx-auto px-6 py-20 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Terms of Service</h1>
                <p className="text-sm text-slate-400 mb-12">Last updated: May 26, 2026</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Acceptance of Terms</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            By accessing or using HiddenJobs (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We reserve the right to update these terms at any time; continued use constitutes acceptance of changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Service Description</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            HiddenJobs is a search aggregation tool that generates search queries for publicly available Applicant Tracking System (ATS) job boards, including Greenhouse, Lever, Ashby, Workday, and others. We do not host, store, or modify job listings. We provide links to external search engine results that surface publicly indexed career pages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Responsibilities</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                            <li>Use the Service for any illegal purpose or in violation of any applicable laws</li>
                            <li>Attempt to gain unauthorized access to our systems or user data</li>
                            <li>Scrape, crawl, or systematically extract data from the Service</li>
                            <li>Interfere with or disrupt the integrity or performance of the Service</li>
                            <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            <li>Use the Service to distribute malware, spam, or harmful content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Intellectual Property</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            The HiddenJobs name, logo, design, and software are our intellectual property. You may not reproduce, distribute, or create derivative works without our express written consent. Search queries and results generated through the Service are provided for personal, non-commercial use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Third-Party Services</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            The Service integrates with third-party platforms including Google Search, DuckDuckGo, Bing, Brave Search, Yahoo, Google AdSense, and Microsoft Clarity. We are not responsible for the content, privacy practices, or terms of these third parties. Your use of these services is governed by their respective terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Disclaimer of Warranties</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT JOB LISTINGS FOUND THROUGH THE SERVICE WILL RESULT IN EMPLOYMENT, NOR THAT SEARCH RESULTS WILL BE ACCURATE, COMPLETE, OR CURRENT.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Limitation of Liability</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            HiddenJobs, its operators, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. This includes loss of employment opportunities, data loss, or business interruption.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Prohibited Uses of Generated Queries</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            The boolean search queries generated by our engine are intended for lawful job search purposes. You may not use these queries to systematically scrape job boards, violate the terms of service of any search engine or ATS platform, or engage in any activity that could harm the availability or integrity of third-party services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Termination</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We reserve the right to suspend or terminate your access to the Service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, third parties, or our interests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Governing Law</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Mumbai, India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            For questions about these Terms, please contact us at <a href="mailto:support@hiddenjobs.app" className="text-primary hover:underline font-bold">support@hiddenjobs.app</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
