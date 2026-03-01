
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ExploreClient } from "@/components/explore/ExploreClient";

export default function ExplorePage() {
    return (
        <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Header />

            <main className="relative pt-20 pb-32 dot-grid min-h-[calc(100-80px)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text dark:text-white text-slate-900">
                            Explore Hidden Tech Hubs
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto italic">
                            Visualize the density of unlisted roles across Greenhouse, Lever, and Ashby.
                        </p>
                    </div>

                    <ExploreClient />
                </div>
            </main>

            <Footer />
        </div>
    );
}
