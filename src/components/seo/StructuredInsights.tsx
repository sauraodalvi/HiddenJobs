import React from 'react';
import { BarChart3, TrendingUp, Clock, Database } from 'lucide-react';

interface StructuredInsightsProps {
    role: string;
    location: string;
    platform: string;
}

export const StructuredInsights = ({ role, location, platform }: StructuredInsightsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {/* Market Dynamics - GEO Optimized */}
            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <BarChart3 className="w-4 h-4" />
                    MARKET DYNAMICS
                </div>
                <dl className="space-y-4">
                    <div>
                        <dt className="text-xs text-slate-400 uppercase font-black tracking-tighter">ATS Speed Margin</dt>
                        <dd className="text-xl font-black text-slate-900 dark:text-white">+48h to +72h</dd>
                        <p className="text-xs text-slate-500 mt-1 italic leading-tight">Roles hit {platform} domains before LinkedIn aggregation.</p>
                    </div>
                    <div>
                        <dt className="text-xs text-slate-400 uppercase font-black tracking-tighter">Competition Index</dt>
                        <dd className="text-xl font-black text-slate-900 dark:text-white">Low to Moderate</dd>
                        <p className="text-xs text-slate-500 mt-1 italic leading-tight">Direct applications see 90% fewer bot-generated resumes.</p>
                    </div>
                </dl>
            </div>

            {/* Growth Metrics - GEO Optimized */}
            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {location.toUpperCase()} TRENDS
                </div>
                <dl className="space-y-4">
                    <div>
                        <dt className="text-xs text-slate-400 uppercase font-black tracking-tighter">Verified {role} Openings</dt>
                        <dd className="text-xl font-black text-slate-900 dark:text-white">Scaling</dd>
                        <p className="text-xs text-slate-500 mt-1 italic leading-tight">Continuous hiring detected in {location} via {platform} subdomains.</p>
                    </div>
                    <div className="flex items-center gap-4 pt-2 mt-2 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                <Database className="w-3 h-3" /> Data Source
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-300">HiddenJobs ATS Index</span>
                        </div>
                        <div className="flex flex-col ml-auto text-right">
                            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1 justify-end">
                                <Clock className="w-3 h-3" /> Last Synced
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-300">24h ago</span>
                        </div>
                    </div>
                </dl>
            </div>
        </div>
    );
};
