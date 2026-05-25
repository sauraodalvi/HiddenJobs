import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, Home, Briefcase } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-8 mx-auto">
                    <Search className="w-12 h-12" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                    Page Not Found
                </h1>
                
                <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">
                    We couldn't find the page you're looking for. It might have been removed, or the link may be outdated.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Link
                        href="/"
                        className="flex items-center justify-center p-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go to Homepage
                    </Link>
                    
                    <Link
                        href="/jobs"
                        className="flex items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors"
                    >
                        <Briefcase className="w-5 h-5 mr-2" />
                        Browse Job Board
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
