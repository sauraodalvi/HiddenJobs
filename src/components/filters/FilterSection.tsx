"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchFilters } from "@/hooks/use-search";
import { useProFeatures } from "@/hooks/use-pro";
import { ROLE_PRESETS } from "@/lib/constants";
import { Search, MapPin, Terminal, Bolt, Code, Clock, ChevronDown, ArrowRight, Check, X, Building, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProGate } from "@/components/common/ProGate";

export function FilterSection() {
    const { filters, updateFilters } = useSearchFilters();
    const { isPro, isLimitReached, searchesLeft, incrementSearch } = useProFeatures();
    const router = useRouter();

    // Local state for deferred updates (Now including dropdowns)
    const [localRole, setLocalRole] = useState(filters.role);
    const [localIsCustomRole, setLocalIsCustomRole] = useState(filters.isCustomRole);
    const [localCustomRole, setLocalCustomRole] = useState(filters.customRole);
    const [localLocation, setLocalLocation] = useState(filters.location);
    const [localSpecific, setLocalSpecific] = useState(filters.specificLocation);
    const [localExclude, setLocalExclude] = useState(filters.exclude);
    const [localInclude, setLocalInclude] = useState(filters.include);
    const [localExperience, setLocalExperience] = useState(filters.experience);
    const [localTime, setLocalTime] = useState(filters.time);
    const [localCountry, setLocalCountry] = useState(filters.country);
    const [localExactTitle, setLocalExactTitle] = useState(filters.exactTitle || false);
    const [localExcludeLocation, setLocalExcludeLocation] = useState(filters.excludeLocation);

    // New Power User Fields
    const [localCompany, setLocalCompany] = useState(filters.company);
    const [localSalaryMin, setLocalSalaryMin] = useState(filters.salaryMin);
    const [localSalaryMax, setLocalSalaryMax] = useState(filters.salaryMax);
    const [localEnglishOnly, setLocalEnglishOnly] = useState(filters.englishOnly || false);

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    // Sync local state ONLY once on mount if URL has params, 
    // but avoid aggressive sync to prevent overwriting user input.
    useEffect(() => {
        setLocalRole(filters.role);
        setLocalIsCustomRole(filters.isCustomRole);
        setLocalCustomRole(filters.customRole);
        setLocalLocation(filters.location);
        setLocalSpecific(filters.specificLocation);
        setLocalExclude(filters.exclude);
        setLocalInclude(filters.include);
        setLocalExperience(filters.experience);
        setLocalTime(filters.time);
        setLocalCountry(filters.country);
        setLocalExactTitle(filters.exactTitle);
        setLocalExcludeLocation(filters.excludeLocation);
        setLocalCompany(filters.company);
        setLocalSalaryMin(filters.salaryMin);
        setLocalSalaryMax(filters.salaryMax);
        setLocalEnglishOnly(filters.englishOnly);
    }, [filters.role, filters.isCustomRole]); // Only sync when core role changes (deep links)

    const roleOptions = Object.keys(ROLE_PRESETS);

    // Styling helpers
    const containerClass = "bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch md:items-center p-2 relative z-20";
    const mobileStackClass = "space-y-2 md:space-y-0 md:space-x-2";
    const inputWrapperClass = "flex-1 relative";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5";

    const handleGo = () => {
        const updates: Record<string, string | null> = {
            role: localRole,
            location: localLocation,
            time: localTime,
        };

        // Custom Role Logic
        if (localIsCustomRole) {
            updates['custom'] = localCustomRole || '';
        } else {
            updates['custom'] = null;
        }

        // Location Logic
        if (localLocation === 'specific') {
            updates['specificLocation'] = localSpecific || null;
        } else {
            updates['specificLocation'] = null;
        }

        // Apply all other local values to URL
        updates['exclude'] = localExclude || null;
        updates['include'] = localInclude || null;
        updates['experience'] = localExperience || null;
        updates['country'] = localCountry || null;
        updates['exact'] = localExactTitle ? 'true' : 'false';
        updates['excludeLocation'] = localExcludeLocation || null;
        updates['company'] = localCompany || null;
        updates['salaryMin'] = localSalaryMin || null;
        updates['salaryMax'] = localSalaryMax || null;
        updates['englishOnly'] = localEnglishOnly ? 'true' : 'false';

        incrementSearch();
        updateFilters(updates);
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleGo();
    };

    return (
        <div className="max-w-4xl mx-auto relative z-10 -mt-8">



            {/* Search Island */}
            <div className={cn(containerClass, mobileStackClass)}>

                {/* Role Input Section (40% width on Desktop) */}
                <div className="flex-[2] relative">
                    <Terminal className={iconClass} />
                    {!localIsCustomRole ? (
                        <div className="relative">
                            <select
                                value={localRole}
                                onChange={(e) => {
                                    if (e.target.value === 'custom_trigger') {
                                        setLocalIsCustomRole(true);
                                    } else {
                                        setLocalRole(e.target.value);
                                    }
                                }}
                                className="w-full pl-12 pr-10 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm cursor-pointer truncate"
                            >
                                {roleOptions.map((role) => (
                                    <option key={role} value={role} className="text-slate-900">{role}</option>
                                ))}
                                <option disabled className="bg-slate-100 dark:bg-slate-800">──────────</option>
                                <option value="custom_trigger" className="text-primary font-bold bg-blue-50 dark:bg-blue-900/20">+ Custom Role...</option>
                            </select>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                value={localCustomRole}
                                onChange={(e) => setLocalCustomRole(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type specific role..."
                                className="w-full pl-12 pr-10 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-500 font-mono text-sm"
                                autoFocus
                            />
                            <button
                                onClick={() => {
                                    setLocalCustomRole('');
                                    setLocalIsCustomRole(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-primary z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Location Input Section (30% width) */}
                <div className="flex-1 relative">
                    <MapPin className={iconClass} />
                    {localLocation !== 'specific' ? (
                        <div className="relative">
                            <select
                                value={localLocation}
                                onChange={(e) => setLocalLocation(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm cursor-pointer"
                            >
                                <option value="remote" className="text-slate-900">Remote Only</option>
                                <option value="hybrid" className="text-slate-900">Hybrid</option>
                                <option value="onsite" className="text-slate-900">On-site</option>
                                <option value="specific" className="text-slate-900">Specific Location...</option>
                            </select>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                value={localSpecific}
                                onChange={(e) => setLocalSpecific(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="City, State..."
                                className="w-full pl-12 pr-8 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-500 font-mono text-sm"
                                autoFocus
                            />
                            <button
                                onClick={() => setLocalLocation('remote')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-primary z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Time Range */}
                <div className="flex-[0.8] relative">
                    <div className="relative">
                        <Clock className={iconClass} />
                        <select
                            value={localTime}
                            onChange={(e) => setLocalTime(e.target.value)}
                            className="w-full pl-12 pr-8 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm cursor-pointer"
                        >
                            <option value="0.5" className="text-slate-900">Past 12 hours</option>
                            <option value="1" className="text-slate-900">Past 24 hours</option>
                            <option value="3" className="text-slate-900">Past 3 days</option>
                            <option value="7" className="text-slate-900">Past Week</option>
                            <option value="30" className="text-slate-900">Past Month</option>
                            <option value="custom" className="text-slate-900 font-bold">Custom Range...</option>
                        </select>
                    </div>

                    {/* Custom Range Inputs Overlay */}
                    {localTime === 'custom' && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-xl z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                                <span>Date Range</span>
                                <button onClick={() => updateFilters({ time: '7' })} className="text-primary hover:underline">Close</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono">FROM</label>
                                    <input
                                        type="date"
                                        value={filters.from || ''}
                                        onChange={(e) => updateFilters({ from: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-xs p-2"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono">TO</label>
                                    <input
                                        type="date"
                                        value={filters.to || ''}
                                        onChange={(e) => updateFilters({ to: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-xs p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Launch Button */}
                <div className="w-full md:w-auto flex flex-col items-stretch md:items-center gap-2">
                    <button
                        onClick={handleGo}
                        className={cn(
                            "w-full md:min-w-[7rem] md:px-8 py-3 rounded-xl font-black md:text-lg transition-all flex items-center justify-center space-x-2 group whitespace-nowrap shadow-lg active:scale-[0.98]",
                            isLimitReached
                                ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500"
                                : "bg-primary hover:bg-blue-600 text-white hover:shadow-blue-500/25"
                        )}
                        title={isLimitReached ? "Free search limit reached" : "Launch Search"}
                    >
                        <span>{isLimitReached ? 'UPGRADE' : 'GO'}</span>
                        {!isLimitReached && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>

            </div>

            {/* Mode Toggles / Extras */}
            <div className="mt-6 flex flex-col items-center">

                <button
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="group flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-all mb-4 relative"
                >
                    <Bolt className={cn("w-4 h-4 transition-transform", isAdvancedOpen && "rotate-180 text-primary")} />
                    <span>{isAdvancedOpen ? 'Hide Advanced Options' : 'Advanced Options'}</span>
                </button>

                {/* Advanced Panel */}
                {isAdvancedOpen && (
                    <div className="w-full mt-4 relative">
                        {/* Import ProGate at the top of file first! */}
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-4 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] animate-in slide-in-from-top-8 fade-in duration-500 ease-out relative overflow-hidden group/panel">
                            {/* Decorative Background Glows */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover/panel:bg-primary/10 transition-colors duration-700" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover/panel:bg-emerald-500/10 transition-colors duration-700" />

                            <div className="relative z-10">
                                {/* Header Area */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-slate-100 dark:border-white/5 pb-8">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <Bolt className="w-6 h-6 text-primary animate-pulse" />
                                            </div>
                                            Advanced Search Control
                                        </h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium uppercase tracking-widest opacity-70">
                                            Fine-tune your job scraping engine for maximum precision
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setLocalCompany('');
                                            setLocalInclude('');
                                            setLocalExclude('');
                                            setLocalExcludeLocation('');
                                            setLocalSalaryMin('');
                                            setLocalSalaryMax('');
                                            setLocalExperience('');
                                            setLocalExactTitle(false);
                                            setLocalEnglishOnly(false);
                                        }}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all flex items-center gap-2 group/reset"
                                    >
                                        <X className="w-3 h-3 group-hover/reset:rotate-90 transition-transform" />
                                        Reset Config
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                                    {/* Column 1: Power Keywords */}
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center">
                                                    <Building className="w-3 h-3 text-amber-500" />
                                                </div>
                                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Targeting</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative group/input">
                                                    <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-primary transition-colors">Target Company</label>
                                                    <input
                                                        type="text"
                                                        value={localCompany}
                                                        onChange={(e) => setLocalCompany(e.target.value)}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="e.g. Stripe, OpenAI"
                                                        className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[13px] p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                    />
                                                </div>

                                                <div className="relative group/input">
                                                    <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-green-500 transition-colors">Include Phrases</label>
                                                    <input
                                                        type="text"
                                                        value={localInclude}
                                                        onChange={(e) => setLocalInclude(e.target.value)}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="e.g. SaaS, Fintech"
                                                        className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[13px] p-4 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 2: Compensation & Tier */}
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                                                    <DollarSign className="w-3 h-3 text-emerald-500" />
                                                </div>
                                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Economics</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative group/input">
                                                    <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-emerald-500 transition-colors text-nowrap">Salary Floor/Ceiling</label>
                                                    <div className="flex items-center gap-2 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-1 px-3">
                                                        <input
                                                            type="text"
                                                            value={localSalaryMin}
                                                            onChange={(e) => setLocalSalaryMin(e.target.value)}
                                                            onKeyDown={handleKeyDown}
                                                            placeholder="150k"
                                                            className="w-full bg-transparent border-none text-[13px] py-3 focus:ring-0 outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                        />
                                                        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1" />
                                                        <input
                                                            type="text"
                                                            value={localSalaryMax}
                                                            onChange={(e) => setLocalSalaryMax(e.target.value)}
                                                            onKeyDown={handleKeyDown}
                                                            placeholder="250k"
                                                            className="w-full bg-transparent border-none text-[13px] py-3 focus:ring-0 outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative group/input">
                                                    <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-blue-500 transition-colors">Seniority Level</label>
                                                    <select
                                                        value={localExperience}
                                                        onChange={(e) => setLocalExperience(e.target.value)}
                                                        className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[13px] p-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium cursor-pointer appearance-none"
                                                    >
                                                        <option value="">Any Seniority</option>
                                                        <option value="intern">Intern / Entry</option>
                                                        <option value="junior">Junior (1-3y)</option>
                                                        <option value="mid">Mid-Level (3-5y)</option>
                                                        <option value="senior">Senior (5+ y)</option>
                                                        <option value="staff">Staff / Principal</option>
                                                        <option value="manager">Manager / Director</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 3: Noise Filters */}
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-red-500/20 flex items-center justify-center">
                                                    <X className="w-3 h-3 text-red-500" />
                                                </div>
                                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Signal Optimization</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative group/input">
                                                    <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-red-500 transition-colors">Exclude Locations</label>
                                                    <input
                                                        type="text"
                                                        value={localExcludeLocation}
                                                        onChange={(e) => setLocalExcludeLocation(e.target.value)}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="Europe, US"
                                                        className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[13px] p-4 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 gap-3">
                                                    <label className="flex items-center justify-between p-3 bg-slate-50/30 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all group/toggle">
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-tight">English Only Results</span>
                                                        <div className="relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={localEnglishOnly}
                                                                onChange={(e) => setLocalEnglishOnly(e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer-checked:bg-primary transition-colors duration-300 ring-4 ring-transparent peer-focus:ring-primary/20" />
                                                            <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4 shadow-sm" />
                                                        </div>
                                                    </label>

                                                    <label className="flex items-center justify-between p-3 bg-slate-50/30 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all group/toggle">
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-tight">Exact Title Match</span>
                                                        <div className="relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={localExactTitle}
                                                                onChange={(e) => setLocalExactTitle(e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer-checked:bg-primary transition-colors duration-300 ring-4 ring-transparent peer-focus:ring-primary/20" />
                                                            <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4 shadow-sm" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Bar */}
                                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-green-500 rounded-full animate-ping" /> Real-time Link Sync</span>
                                        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                        <span>Advanced Logic Active</span>
                                    </div>

                                    <button
                                        onClick={handleGo}
                                        className="w-full md:w-auto bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_-12px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn"
                                    >
                                        <Bolt className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                        Save Scraper Engine
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
