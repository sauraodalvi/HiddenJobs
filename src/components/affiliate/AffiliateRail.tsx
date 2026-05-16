import React from 'react';
import Link from 'next/link';

type AffiliateVariant = 'apply' | 'research' | 'books';

interface AffiliateRailProps {
    variant: AffiliateVariant;
    role?: string;
}

export function AffiliateRail({ variant, role }: AffiliateRailProps) {
    const content = {
        apply: {
            title: `Ready to apply for ${role || 'this'} role?`,
            subtitle: 'These tools give you an unfair advantage against hundreds of other applicants.',
            items: [
                {
                    emoji: '📝',
                    title: 'Pro Resume Builder',
                    desc: 'ATS-optimized templates that pass the screen.',
                    cta: 'Build Resume (Zety) →',
                    url: 'https://zety.com/?ref=hiddenjobs',
                },
                {
                    emoji: '🎯',
                    title: 'Interview Prep Crash Course',
                    desc: 'Master the technical and behavioral rounds.',
                    cta: 'Start Prep (AlgoExpert) →',
                    url: 'https://algoexpert.io/affiliates?ref=hiddenjobs',
                }
            ]
        },
        research: {
            title: 'Level up your job search',
            subtitle: 'Tools to help you research companies and learn new skills before your next interview.',
            items: [
                {
                    emoji: '💼',
                    title: 'LinkedIn Premium',
                    desc: 'See who viewed your profile & get applicant insights.',
                    cta: 'Try Premium Free →',
                    url: 'https://linkedin.com/premium?ref=hiddenjobs',
                },
                {
                    emoji: '🚀',
                    title: 'Upskill with Udemy',
                    desc: 'Fill knowledge gaps quickly with crash courses.',
                    cta: 'Browse Courses →',
                    url: 'https://udemy.com/?ref=hiddenjobs',
                }
            ]
        },
        books: {
            title: 'Top Books for Tech Professionals',
            subtitle: 'Invest in your career with the best books on algorithms, system design, and soft skills.',
            items: [
                {
                    emoji: '📚',
                    title: 'Cracking the Coding Interview',
                    desc: 'The definitive guide to software engineering interviews.',
                    cta: 'Get on Amazon →',
                    url: 'https://amzn.to/3cracking-coding-interview',
                },
                {
                    emoji: '🏗️',
                    title: 'System Design Interview',
                    desc: 'Pass the hardest round of any senior interview.',
                    cta: 'Get on Amazon →',
                    url: 'https://amzn.to/3system-design',
                }
            ]
        }
    };

    const current = content[variant];

    return (
        <section className="my-16 max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{current.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">{current.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {current.items.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener sponsored"
                        className="flex gap-4 items-start p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/40 hover:shadow-md transition-all group"
                    >
                        <div className="text-3xl flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl">
                            {item.emoji}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                                {item.desc}
                            </p>
                            <span className="text-[11px] font-black text-primary uppercase tracking-widest group-hover:underline">
                                {item.cta}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
            <p className="mt-6 text-center text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold opacity-60">
                HiddenJobs may earn a commission from partners (at no extra cost to you).
            </p>
        </section>
    );
}
