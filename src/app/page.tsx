
import { Suspense } from "react";
import { FilterSection } from "@/components/filters/FilterSection";
import { ResultsSection } from "@/components/results/ResultsSection";
import { Header } from "@/components/layout/Header";
import { InfoSection } from "@/components/layout/InfoSection";

import { Footer } from "@/components/layout/Footer";
import { AboutHiddenMarket } from "@/components/seo/AboutHiddenMarket";
import { GlobalSchema } from "@/components/seo/GlobalSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="relative pt-20 pb-32 dot-grid">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Hero Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 gradient-text dark:text-white text-slate-900 leading-tight">
            Uncover Hidden Jobs<br />Before They Hit LinkedIn.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Access the 60% of tech roles that never reach public boards. Direct-to-ATS scraping for Greenhouse, Lever, and Ashby.
          </p>

          <GlobalSchema />

          {/* Trust Statistics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-2xl font-black text-primary">50K+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Live ATS-Indexed Roles</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-2xl font-black text-emerald-500">12+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">ATS Platforms Scanned</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-2xl font-black text-purple-500">48h</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Speed Margin vs LinkedIn</div>
            </div>
          </div>

          {/* How It Works - Editorial Content */}
          <div className="max-w-3xl mx-auto mb-12 text-left">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 text-center">How HiddenJobs Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm mb-3">1</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Pick Your Role</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Select any tech role from our directory or type a custom title. We support 50+ roles across engineering, product, design, and data.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm mb-3">2</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Engine Generates Dork</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Our Boolean engine builds a precision search query targeting each ATS platform&apos;s public directory structure.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm mb-3">3</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Apply Before the Crowd</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Click through to the direct ATS listing and submit your application before roles hit LinkedIn and reach 500+ applicants.</p>
              </div>
            </div>
          </div>

          {/* Main Interaction Area (The Island & Results) - Split Suspense for independent streaming */}
          <div className="space-y-8">
            <Suspense fallback={
              <div className="w-full h-32 bg-gray-100 dark:bg-slate-800/50 rounded-2xl max-w-3xl mx-auto animate-pulse" />
            }>
              <FilterSection />
            </Suspense>
            <Suspense fallback={
              <div className="w-full h-[600px] bg-gray-50 dark:bg-slate-900/30 rounded-3xl animate-pulse" />
            }>
              <ResultsSection />
            </Suspense>
          </div>

          {/* New SEO/AEO/GEO Section */}
          <InfoSection />

        </div>

        <AboutHiddenMarket />
      </main>

      <Footer />
    </div>
  );
}
