
"use client";

import { useState } from "react";
import { ROLE_PRESETS, DIRECTORY_LOCATIONS } from "@/lib/constants";
import { Search, MapPin, Clock, Terminal, ChevronDown, Check, Globe, SlidersHorizontal, RotateCcw, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchFilters } from "@/hooks/use-search";

interface MapSidebarProps {
    onFlyTo: (lat: number, lng: number) => void;
}

const TIME_OPTIONS = [
    { val: '1', label: 'Last 24 Hours' },
    { val: '3', label: 'Last 3 Days' },
    { val: '7', label: 'Last Week' },
    { val: '30', label: 'Last Month' },
];

const ROLE_CATEGORIES = {
    'PM & Design': ['Product Manager', 'UX Designer', 'Product Designer', 'Associate Product Manager'],
    'Engineering': ['Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'DevOps Engineer', 'Data Engineer'],
    'Leadership': ['Staff Engineer', 'Engineering Manager', 'Director of Product', 'VP of Engineering'],
};

export function MapSidebar({ onFlyTo }: MapSidebarProps) {
    const { filters, updateFilters } = useSearchFilters();
    const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const handleRoleUpdate = (newRole: string) => {
        updateFilters({ role: newRole });
        setShowRoleSuggestions(false);
    };

    const handleTimeUpdate = (newTime: string) => {
        updateFilters({ time: newTime });
        setShowTimeDropdown(false);
    };

    const handleCitySelect = (loc: any) => {
        onFlyTo(loc.coords.lat, loc.coords.lng);
        updateFilters({ location: 'specific', specificLocation: loc.label });
        setShowCityDropdown(false);
    };

    return (
        <div className="absolute top-6 left-6 z-[1001] w-80 space-y-4 pointer-events-auto">
            {/* Primary Control Island */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 space-y-4 animate-in slide-in-from-left-4 duration-500">

                {/* Header info */}
                <div className="px-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Command Center</h2>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">Live Market Pivot</p>
                    </div>
                    <div className="p-1.5 bg-slate-50 dark:bg-white/5 rounded-lg">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    {/* Role Filter - Now with Input */}
                    <div className="relative group">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Active Focus</label>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-3 flex items-center gap-3 hover:border-primary/30 transition-all group-focus-within:bg-white dark:group-focus-within:bg-white/10 group-focus-within:border-primary/50">
                            <Terminal className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={filters.role}
                                onChange={(e) => handleRoleUpdate(e.target.value)}
                                onFocus={() => setShowRoleSuggestions(true)}
                                placeholder="Any Job Title..."
                                className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:text-slate-400"
                            />
                            {showRoleSuggestions ? (
                                <ChevronDown className="w-3 h-3 text-primary rotate-180" onClick={() => setShowRoleSuggestions(false)} />
                            ) : (
                                <Search className="w-3 h-3 text-slate-300" />
                            )}
                        </div>

                        {showRoleSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                {Object.entries(ROLE_CATEGORIES).map(([cat, roles]) => (
                                    <div key={cat}>
                                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-[9px] font-black uppercase tracking-widest text-slate-400 border-y border-slate-100 dark:border-white/5 first:border-t-0">
                                            {cat}
                                        </div>
                                        {roles.filter(r => r.toLowerCase().includes(filters.role.toLowerCase())).map(r => (
                                            <div
                                                key={r}
                                                onClick={() => handleRoleUpdate(r)}
                                                className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                                            >
                                                {r}
                                                {filters.role === r && <Check className="w-3 h-3" />}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Freshness Filter */}
                    <div className="relative group">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Job Freshness</label>
                        <div
                            className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all group-hover:bg-white dark:group-hover:bg-white/10"
                            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                        >
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-bold flex-1">
                                {TIME_OPTIONS.find(o => o.val === filters.time)?.label || 'Last Month'}
                            </span>
                            <ChevronDown className={cn("w-3 h-3 text-slate-300 transition-transform", showTimeDropdown && "rotate-180")} />
                        </div>

                        {showTimeDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                {TIME_OPTIONS.map(opt => (
                                    <div
                                        key={opt.val}
                                        onClick={() => handleTimeUpdate(opt.val)}
                                        className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                                    >
                                        {opt.label}
                                        {filters.time === opt.val && <Check className="w-3 h-3" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hub Snapping - Now with Custom Location Input */}
                    <div className="relative group">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Target Region</label>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-3 flex items-center gap-3 group-focus-within:bg-white dark:group-focus-within:bg-white/10 group-focus-within:border-primary/50 transition-all shadow-inner">
                            <Globe className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={filters.specificLocation}
                                onChange={(e) => updateFilters({ specificLocation: e.target.value })}
                                onFocus={() => setShowCityDropdown(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const match = DIRECTORY_LOCATIONS.find(l =>
                                            l.label.toLowerCase().includes(filters.specificLocation.toLowerCase())
                                        );
                                        if (match) handleCitySelect(match);
                                        else setShowCityDropdown(false);
                                    }
                                }}
                                placeholder="Remote, SF, Paris..."
                                className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:text-slate-400"
                            />
                            {showCityDropdown ? (
                                <ChevronDown className="w-3 h-3 text-primary rotate-180" onClick={() => setShowCityDropdown(false)} />
                            ) : (
                                <MapPin className="w-3 h-3 text-slate-300" />
                            )}
                        </div>

                        {showCityDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                {DIRECTORY_LOCATIONS.filter(l => l.label.toLowerCase().includes(filters.specificLocation.toLowerCase())).map(loc => (
                                    <div
                                        key={loc.slug}
                                        onClick={() => handleCitySelect(loc)}
                                        className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 opacity-50" />
                                            {loc.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-2 flex gap-2">
                    <button
                        onClick={() => updateFilters({ role: 'Product Manager', specificLocation: '', time: '30' })}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Execute Pivot
                    </button>
                    <button
                        onClick={() => updateFilters({ role: 'Product Manager', specificLocation: '', time: '30' })}
                        className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-slate-300 transition-all group"
                        title="Reset to Default"
                    >
                        <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            {/* Hint Box - Maximum Contrast for Visibility */}
            <div className="bg-primary/25 border-2 border-primary/40 rounded-2xl p-4 shadow-xl animate-in slide-in-from-left-8 duration-700 delay-200">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary fill-primary" />
                    <p className="text-[11px] text-primary font-black uppercase tracking-[0.15em]">Market Insight</p>
                </div>
                <p className="text-[12px] text-slate-800 dark:text-slate-100 font-extrabold leading-tight">
                    <span className="text-primary">TIP:</span> Shift the <b>Focus</b> or <b>Freshness</b> to pivot market data. Larger pulses indicate high-density hiring zones.
                </p>
            </div>
        </div>
    );
}
