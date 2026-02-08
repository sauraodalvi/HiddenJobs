
import { Suspense } from "react";
import { FilterSection } from "@/components/filters/FilterSection";
import { ResultsSection } from "@/components/results/ResultsSection";
import { Header } from "@/components/layout/Header";
import { InfoSection } from "@/components/layout/InfoSection";

import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="relative pt-20 pb-32 dot-grid">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Hero Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 gradient-text dark:text-white text-slate-900 leading-tight">
            Uncover Hidden Jobs<br />Before They Hit LinkedIn.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Access the 60% of tech roles that never reach public boards. Direct-to-ATS scraping for Greenhouse, Lever, and Ashby.
          </p>

          {/* Main Interaction Area (The Island & Results) */}
          <Suspense fallback={
            <div className="w-full h-24 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-2xl max-w-3xl mx-auto" />
          }>
            <FilterSection />
            <ResultsSection />
          </Suspense>

          {/* New SEO/AEO/GEO Section */}
          <InfoSection />

        </div>
      </main>

      <Footer />
    </div>
  );
}
