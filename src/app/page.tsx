import { Suspense } from "react";
import { FilterSection } from "@/components/filters/FilterSection";
import { ResultsSection } from "@/components/results/ResultsSection";
import { SavedSearches } from "@/components/search/SavedSearches";
import { Header } from "@/components/layout/Header";
import { InfoSection } from "@/components/layout/InfoSection";
import { Footer } from "@/components/layout/Footer";
import { AboutHiddenMarket } from "@/components/seo/AboutHiddenMarket";
import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { BLOG_POSTS } from "@/content/blog";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
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

          {/* Saved Searches */}
          <SavedSearches />

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

          {/* Latest Career Resources and Guides section (below fold) */}
          <section className="mt-20 border-t border-slate-100 dark:border-slate-800 pt-20 text-left max-w-4xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-8 h-8 text-primary" />
                  Latest Career Intelligence & Guides
                </h2>
                <p className="text-sm text-slate-500 mt-1">Written and verified by our E-E-A-T recruiting and system architecture experts.</p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-black text-primary hover:underline uppercase tracking-wider">
                All Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {BLOG_POSTS.slice(0, 4).map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-primary transition-all shadow-sm"
                >
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">
                    {post.tags[0]}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-4 group-hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-4 border-t border-slate-50 dark:border-slate-800/50 pt-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Looking for Advanced Boolean Blueprints?</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Unlock custom copy-paste search dorks and our detailed ATS comparison catalog.</p>
              </div>
              <Link
                href="/resources"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:scale-105 transition-all shadow-md"
              >
                Access Playbook
              </Link>
            </div>
          </section>

        </div>

        <AboutHiddenMarket />
      </main>

      <Footer />
    </div>
  );
}
