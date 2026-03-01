
"use client";

import dynamic from "next/dynamic";

// Map must be client-side only due to Leaflet.js
const JobMap = dynamic(() => import("@/components/explore/JobMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl flex items-center justify-center font-bold text-slate-400">
            Initializing Market Map...
        </div>
    )
});

export function ExploreClient() {
    return (
        <div className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-3xl shadow-2xl overflow-hidden relative group">
            <JobMap />
        </div>
    );
}
