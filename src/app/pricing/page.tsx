
"use client";

import { Header } from "@/components/layout/Header";
import { Check, Sparkles, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
    {
        name: "Weekly",
        price: "1",
        duration: "week",
        description: "Perfect for a quick job hunt sprint.",
        features: ["Access to 12+ ATS platforms", "Unlimited search queries", "Unlock Lever, Workday, Ashby & more"],
        cta: "Start Sprint",
        checkoutUrl: "#", // User will replace with Lemon Squeezy link
        highlight: false,
    },
    {
        name: "Monthly",
        price: "4",
        duration: "month",
        description: "The most popular choice for active seekers.",
        features: ["Everything in Weekly", "Priority support", "Full engine access (Google, Yahoo)"],
        cta: "Go Monthly",
        checkoutUrl: "#", // User will replace with Lemon Squeezy link
        highlight: true,
    },
    {
        name: "6 Months",
        price: "20",
        duration: "6 months",
        description: "Great for long-term career planning.",
        features: ["Everything in Monthly", "Save 20% vs monthly", "Advanced filter access"],
        cta: "Save Now",
        checkoutUrl: "#", // User will replace with Lemon Squeezy link
        highlight: false,
    },
    {
        name: "Yearly",
        price: "35",
        duration: "year",
        description: "Maximum value for serious builders.",
        features: ["Everything in 6 Months", "Save 40% vs monthly", "Premium search results"],
        cta: "Best Value",
        checkoutUrl: "#", // User will replace with Lemon Squeezy link
        highlight: false,
    },
];

// import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
    // const { user } = useUser();
    const user = null; // Auth removed

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans transition-colors duration-300 relative overflow-hidden">
            <Header />

            {/* Decorative Background Blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <main className="pt-24 pb-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        <span>Pricing built for the hidden market</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                        Stop competing. <br />
                        <span className="text-primary">Start applying.</span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                        Get instant access to thousands of unlisted roles. One small payment to unlock your career edge.
                    </p>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {pricingPlans.map((plan) => {
                            // Construct checkout URL with user_id passthrough
                            const checkoutUrl = plan.checkoutUrl;

                            return (
                                <div
                                    key={plan.name}
                                    className={`relative p-8 rounded-3xl border transition-all duration-500 hover:scale-[1.02] flex flex-col text-left ${plan.highlight
                                        ? "bg-slate-900 text-white border-primary shadow-2xl shadow-primary/20 dark:bg-white dark:text-slate-900"
                                        : "bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark"
                                        }`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute -top-4 left-6 bg-primary text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{plan.name}</h3>
                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-5xl font-black">${plan.price}</span>
                                            <span className="opacity-60 text-sm font-medium">/{plan.duration}</span>
                                        </div>
                                        <p className="mt-4 text-sm opacity-80 leading-relaxed min-h-[40px]">{plan.description}</p>
                                    </div>

                                    <div className="space-y-4 mb-10 flex-1">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-start space-x-3 text-sm">
                                                <div className={`mt-1 p-1 rounded-full shrink-0 ${plan.highlight ? 'bg-primary/20' : 'bg-primary/10'}`}>
                                                    <Check className="w-3 h-3 text-primary" />
                                                </div>
                                                <span className="opacity-90">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={plan.checkoutUrl}
                                        className={`lemonsqueezy-button block w-full py-4 rounded-2xl font-black text-center transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs ${plan.highlight
                                            ? "bg-primary text-white hover:bg-blue-600 shadow-blue-500/25"
                                            : "bg-white dark:bg-white/5 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-white/5 hover:border-primary dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/10 shadow-slate-200/50 dark:shadow-none"
                                            }`}
                                        onClick={(e) => {
                                            if (plan.checkoutUrl === '#') {
                                                e.preventDefault();
                                                alert("Checkout links will be configured by the administrator.");
                                            }
                                        }}
                                    >
                                        {plan.cta}
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 dark:border-border-dark pt-20">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Secure Payment</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Processed securely by Lemon Squeezy.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Instant Access</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Unlock all hidden jobs immediately after pay.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Global Coverage</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Search Greenhouse, Lever, across all regions.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
