"use client";

import { Search, MapPin, Clock, Layout, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscoverySearchFormProps {
    role: string;
    setRole: (v: string) => void;
    location: string;
    setLocation: (v: string) => void;
    time: string;
    setTime: (v: string) => void;
    platform: string;
    setPlatform: (v: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export function DiscoverySearchForm({
    role, setRole,
    location, setLocation,
    time, setTime,
    platform, setPlatform,
    onSearch,
    loading
}: DiscoverySearchFormProps) {
    return (
        <div className="space-y-4">
            <div className="relative group">
                <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Job Title (e.g. Product Manager)"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
            </div>

            <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Place (e.g. San Francisco or Remote)"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                    >
                        <option value="1">Last 24h</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                    </select>
                </div>

                <div className="relative group">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                    >
                        <option value="boards.greenhouse.io">Greenhouse</option>
                        <option value="jobs.lever.co">Lever</option>
                        <option value="ashbyhq.com">Ashby</option>
                        <option value="myworkdayjobs.com">Workday</option>
                        <option value="jobs.smartrecruiters.com">SmartRecruiters</option>
                        <option value="apply.workable.com">Workable</option>
                        <option value="bamboohr.com">BambooHR</option>
                        <option value="applytojob.com">JazzHR</option>
                        <option value="breezy.hr">Breezy HR</option>
                        <option value="jobs.jobvite.com">Jobvite</option>
                    </select>
                </div>
            </div>

            <button
                onClick={onSearch}
                disabled={loading}
                className={cn(
                    "w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl disabled:opacity-50",
                    loading && "animate-pulse"
                )}
            >
                {loading ? 'Powering Up...' : 'Run Discovery'}
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
