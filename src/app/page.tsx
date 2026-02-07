
import { Suspense } from "react";
import { FilterSection } from "@/components/filters/FilterSection";
import { ResultsSection } from "@/components/results/ResultsSection";
import { Header } from "@/components/layout/Header";
import { InfoSection } from "@/components/layout/InfoSection";

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="relative pt-20 pb-32 overflow-hidden dot-grid">
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

        {/* Social Proof Section (Static for now) */}


      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-border-dark py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-8 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">HiddenJobs</span>
          </div>
          <div className="text-sm text-slate-400">
            © 2026 HiddenJobs. Made for the builders.
          </div>
        </div>
      </footer>
    </div>
  );
}
