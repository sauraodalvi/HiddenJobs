import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
    title: 'Privacy Policy',
    description: 'How HiddenJobs collects, uses, and protects your data. Includes information about Google AdSense, cookies, and your privacy rights.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />
            <main className="container mx-auto px-6 py-20 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Privacy Policy</h1>
                <p className="text-sm text-slate-400 mb-12">Last updated: May 26, 2026</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Introduction</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            HiddenJobs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hiddenjobs.netlify.app (the &quot;Site&quot;). Please read this policy carefully. If you do not agree with the terms, do not access the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Data</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We do not require you to create an account or provide personal information to use our core search functionality. If you contact us via email, we collect your email address and any information you voluntarily provide.
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6">Derivative Data</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our servers automatically collect certain information when you visit the Site, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is used for analytics and security purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cookies and Tracking Technologies</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your experience, analyze trends, and serve personalized advertisements. Specifically:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                            <li><strong>Google AdSense:</strong> We use Google AdSense to display advertisements. AdSense uses cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to our Site or other websites. You can learn more about Google's advertising practices at <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.</li>
                            <li><strong>Microsoft Clarity:</strong> We use Microsoft Clarity to understand how users interact with our Site through heatmaps and session recordings. Clarity uses cookies to collect usage data. This data is anonymized and used solely for product improvement.</li>
                            <li><strong>Essential Cookies:</strong> Some cookies are necessary for the basic functioning of the Site, such as remembering your theme preference (dark/light mode).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How We Use Your Information</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">We use the collected data to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                            <li>Operate, maintain, and improve the Site</li>
                            <li>Serve personalized advertisements via Google AdSense</li>
                            <li>Analyze usage patterns to enhance user experience</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Third-Party Data Sharing</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We do not sell your personal information. We may share anonymized, aggregate data with partners for analytics purposes. Third-party service providers (Google AdSense, Microsoft Clarity, Netlify) have their own privacy policies governing data use:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                            <li>Google: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
                            <li>Microsoft: <a href="https://privacy.microsoft.com/en-us/privacystatement" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/en-us/privacystatement</a></li>
                            <li>Netlify: <a href="https://www.netlify.com/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.netlify.com/privacy/</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advertising (Google AdSense)</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We use Google AdSense to serve advertisements. Google and its partners use cookies to serve ads based on a user&apos;s prior visits to our Site or other websites. You may opt out of personalized advertising by visiting Google&apos;s Ads Settings at <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads</a>.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                            As part of the Google AdSense program, we use the Google Ads Transparency module and adhere to the Google Publisher Policies. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Rights (GDPR &amp; CCPA)</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            If you are a resident of the European Economic Area (EEA), you have the right to access, correct, update, or request deletion of your personal data under GDPR. If you are a California resident, you have the right to know what personal information we collect and to request deletion under CCPA.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                            To exercise these rights, contact us at <a href="mailto:support@hiddenjobs.app" className="text-primary hover:underline">support@hiddenjobs.app</a>. We will respond within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Retention</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We retain your data only as long as necessary for the purposes described in this policy. Analytics data is retained for 26 months. Cookie data retention varies by provider (see their respective policies).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Security</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We implement reasonable technical and organizational measures to protect your data. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Children&apos;s Privacy</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our Site is not directed to children under 13. We do not knowingly collect personal information from children. If we discover that a child under 13 has provided us with personal data, we will delete it immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Changes to This Policy</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Us</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="list-none space-y-2 text-slate-600 dark:text-slate-400">
                            <li>Email: <a href="mailto:support@hiddenjobs.app" className="text-primary hover:underline font-bold">support@hiddenjobs.app</a></li>
                            <li>Website: <a href="https://hiddenjobs.netlify.app" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://hiddenjobs.netlify.app</a></li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
