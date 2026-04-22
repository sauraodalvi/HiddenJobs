import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    role: string;
    location: string;
    platform: string;
    dynamicFaqs?: { question: string; answer: string }[] | null;
}

export const FAQSection = ({ role, location, platform, dynamicFaqs }: FAQSectionProps) => {
    const staticFaqs: FAQ[] = [
        {
            question: `How can I find hidden ${role} jobs in ${location} using ${platform}?`,
            answer: `To find unlisted ${role} roles in ${location}, you should search ${platform} career portals directly. Many companies index their job openings on ${platform} before they are pushed to aggregate boards like LinkedIn or Glassdoor. HiddenJobs automates this by providing a direct ATS search query.`
        },
        {
            question: `What are the benefits of applying directly to ${platform} career portals?`,
            answer: `Applying directly to a company's ATS (Applicant Tracking System) like ${platform} ensures your resume enters their database immediately. This bypasses intermediary job boards, reduces competition from bot-generated applications, and gives you a 1-3 day head start on new roles.`
        }
    ];

    // Priority to dynamic FAQs from LLM, merged with key static ones
    const faqs = dynamicFaqs && dynamicFaqs.length > 0
        ? [...dynamicFaqs, staticFaqs[1]]
        : staticFaqs;

    return (
        <section className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Direct-to-ATS Intelligence FAQ</h2>
            </div>

            <div className="grid gap-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all group"
                    >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                            {faq.question}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
