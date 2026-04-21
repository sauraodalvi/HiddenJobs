"use client";

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { proxySearch } from '@/app/actions/test-proxy';
import { getCityCoordinates } from '@/app/actions/geo';
import { DiscoverySearchForm } from '@/components/discovery/DiscoverySearchForm';
import { DiscoveryResultCard } from '@/components/discovery/DiscoveryResultCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, Map as MapIcon, List, Zap, Globe, AlertCircle } from 'lucide-react';
import { useSearchFilters } from '@/hooks/use-search';
import { cn, buildDorkComponents, assembleDork } from '@/lib/utils';
import { ATS_PLATFORMS } from '@/lib/constants';

// Map must be client-side only
const JobMap = dynamic(() => import('@/components/explore/JobMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="text-center">
                <Zap className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Initializing Engine...</p>
            </div>
        </div>
    )
});

function JobDiscoveryContent() {
    const { filters, updateFilters } = useSearchFilters();
    const [role, setRole] = useState(filters.role);
    const [location, setLocation] = useState(filters.specificLocation || filters.location);
    const [time, setTime] = useState(filters.time);
    const [platform, setPlatform] = useState(filters.platform);
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([30, 0]);
    const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');

    // Keep local state in sync when URL changes (e.g. from Market Terminal or Map Sidebar)
    useEffect(() => {
        setRole(filters.role);
        setLocation(filters.specificLocation || filters.location);
        setTime(filters.time);
        setPlatform(filters.platform);
    }, [filters.role, filters.location, filters.specificLocation, filters.time, filters.platform]);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            // Update global filters first so Map and Terminal stay in sync
            await updateFilters({
                role,
                location: location.toLowerCase() === 'remote' ? 'remote' : 'specific',
                specificLocation: location.toLowerCase() === 'remote' ? '' : location,
                time,
                platform
            });

            // Build the query using centralized logic to avoid domain-hardcoding bugs
            const currentPlatform = ATS_PLATFORMS.find(p => p.domain === platform || p.logoDomain === platform) || ATS_PLATFORMS.find(p => p.name.toLowerCase() === platform.toLowerCase()) || ATS_PLATFORMS[0];

            const components = buildDorkComponents({
                ...filters,
                role,
                location: location.toLowerCase() === 'remote' ? 'remote' : 'specific',
                specificLocation: location,
                time,
                platform: currentPlatform.domain // Ensure consistency
            });
            const dork = assembleDork(currentPlatform.domain, components);

            const searchUrl = `https://searx.work/search?q=${encodeURIComponent(dork)}&format=json`;
            const data = await proxySearch(searchUrl, 'json');

            if (data.error) {
                setError(data.error);
                setResults(null);
            } else {
                setResults(data);

                // Attempt to geocode the location to center the map
                if (location.toLowerCase() !== 'remote') {
                    const coords = await getCityCoordinates(location);
                    if (coords) {
                        setMapCenter([coords.lat, coords.lng]);
                    }
                }
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 flex flex-col md:flex-row relative pt-16 h-screen">
                {/* Left Side: Search & Results */}
                <div className={cn(
                    "w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/50 backdrop-blur-3xl z-20 transition-all duration-500",
                    viewMode === 'map' ? "-translate-x-full absolute md:relative" : "translate-x-0"
                )}>
                    {/* Search Form Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Job Discovery
                                </h1>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live Market Intelligence</p>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-black/40 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('split')}
                                    className={cn("p-2 rounded-lg transition-all", viewMode === 'split' ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400")}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={cn("p-2 rounded-lg md:hidden transition-all", viewMode === 'map' ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400")}
                                >
                                    <MapIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <DiscoverySearchForm
                            role={role} setRole={setRole}
                            location={location} setLocation={setLocation}
                            time={time} setTime={setTime}
                            platform={platform} setPlatform={setPlatform}
                            onSearch={handleSearch}
                            loading={loading}
                        />
                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50/50 dark:bg-black/10">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-red-800 dark:text-red-400">Search Interrupted</p>
                                    <p className="text-[10px] text-red-600/80 dark:text-red-500/80 mt-1 leading-relaxed">
                                        Some sources are blocking requests. We've attempted fallbacks, but you might need to try a different platform or query.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!results && !loading && !error && (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                                <Search className="w-12 h-12 mb-4 text-slate-300" />
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Initialize Discovery</p>
                                <p className="text-[10px] text-slate-500 mt-2 max-w-[200px]">Enter your target role and market to scan unlisted job boards.</p>
                            </div>
                        )}

                        {results?.results?.map((res: any, i: number) => (
                            <DiscoveryResultCard key={i} result={res} />
                        ))}

                        {results?.results?.length === 0 && (
                            <div className="text-center py-12 space-y-4">
                                <p className="text-sm font-bold text-slate-400 italic">No exact matches found in this market.</p>
                                <div className="max-w-[280px] mx-auto p-4 bg-primary/5 rounded-2xl border border-primary/10 text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Discovery Tips:</p>
                                    <ul className="text-[10px] text-slate-500 space-y-2 font-medium">
                                        <li className="flex gap-2"><span>•</span> Try a broader role (e.g. "Software Engineer" instead of "Senior React Developer")</li>
                                        <li className="flex gap-2"><span>•</span> Increase the "Freshness" to 30 days</li>
                                        <li className="flex gap-2"><span>•</span> Search "Remote" or a larger metro area</li>
                                        <li className="flex gap-2"><span>•</span> Check a different ATS platform (Greenhouse/Lever are most common)</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className={cn(
                    "flex-1 relative transition-all duration-700",
                    viewMode === 'map' ? "w-full" : "hidden md:block"
                )}>
                    <JobMap
                        center={mapCenter}
                        useBaseMarkers={!results}
                        showSidebar={false}
                    />

                    {/* Quick View Controls for Mobile */}
                    {viewMode === 'map' && (
                        <button
                            onClick={() => setViewMode('split')}
                            className="absolute top-4 left-4 z-[1001] bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 md:hidden"
                        >
                            <List className="w-5 h-5 text-primary" />
                        </button>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function JobDiscoveryPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen bg-slate-900 flex items-center justify-center">
                <Zap className="w-12 h-12 text-primary animate-pulse" />
            </div>
        }>
            <JobDiscoveryContent />
        </Suspense>
    );
}
