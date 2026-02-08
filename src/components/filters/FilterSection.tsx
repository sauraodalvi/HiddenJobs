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

    // Local state for deferred updates (Search-and-Select logic)
    const [localRole, setLocalRole] = useState(filters.isCustomRole ? filters.customRole : filters.role);

    // Split Location State
    const [localWorkMode, setLocalWorkMode] = useState(filters.location === 'specific' ? 'remote' : filters.location);
    const [localGeoLocation, setLocalGeoLocation] = useState(filters.specificLocation || '');

    const [localExclude, setLocalExclude] = useState(filters.exclude);
    const [localInclude, setLocalInclude] = useState(filters.include);
    const [localExperience, setLocalExperience] = useState(filters.experience);
    const [localTime, setLocalTime] = useState(filters.time);
    const [localCountry, setLocalCountry] = useState(filters.country);
    const [localExactTitle, setLocalExactTitle] = useState(filters.exactTitle || false);
    const [localExcludeLocation, setLocalExcludeLocation] = useState(filters.excludeLocation);
    const [localFrom, setLocalFrom] = useState(filters.from || '');
    const [localTo, setLocalTo] = useState(filters.to || '');

    // UI state for dropdowns
    const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
    const [roleHighlightIndex, setRoleHighlightIndex] = useState(-1);

    // New Power User Fields
    const [localCompanies, setLocalCompanies] = useState<string[]>(filters.company ? filters.company.split(',') : []);
    const [localSalaryMin, setLocalSalaryMin] = useState(filters.salaryMin);
    const [localSalaryMax, setLocalSalaryMax] = useState(filters.salaryMax);
    const [localEnglishOnly, setLocalEnglishOnly] = useState(filters.englishOnly || false);

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [showWorkModeDropdown, setShowWorkModeDropdown] = useState(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [showSeniorityDropdown, setShowSeniorityDropdown] = useState(false);

    // Sync local state ONLY once on mount if URL has params
    useEffect(() => {
        setLocalRole(filters.isCustomRole ? filters.customRole : filters.role);
        setLocalWorkMode(filters.location === 'specific' ? 'remote' : filters.location);
        setLocalGeoLocation(filters.specificLocation || '');
        setLocalExclude(filters.exclude);
        setLocalInclude(filters.include);
        setLocalExperience(filters.experience);
        setLocalTime(filters.time);
        setLocalCountry(filters.country);
        setLocalExactTitle(filters.exactTitle);
        setLocalExcludeLocation(filters.excludeLocation);
        setLocalFrom(filters.from || '');
        setLocalTo(filters.to || '');
        setLocalCompanies(filters.company ? filters.company.split(',') : []);
        setLocalSalaryMin(filters.salaryMin);
        setLocalSalaryMax(filters.salaryMax);
        setLocalEnglishOnly(filters.englishOnly);
    }, [filters.role, filters.isCustomRole, filters.location, filters.specificLocation, filters.company]);

    const roleOptions = Object.keys(ROLE_PRESETS);

    // Styling helpers
    const containerClass = "bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch p-1.5 relative z-40";
    const mobileStackClass = "space-y-3 md:space-y-0 md:space-x-2";
    const inputWrapperClass = "flex-1 relative h-full flex items-center";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-20 pointer-events-none group-hover:text-primary transition-colors";

    const handleGo = () => {
        const updates: Record<string, string | null> = {
            time: localTime,
            from: localTime === 'custom' ? localFrom : null,
            to: localTime === 'custom' ? localTo : null,
        };

        // Unified Role Resolution
        const isPresetRole = roleOptions.includes(localRole);
        if (isPresetRole) {
            updates['role'] = localRole;
            updates['custom'] = null;
        } else {
            updates['role'] = 'Software Engineer'; // Fallback base
            updates['custom'] = localRole;
        }

        // Split Location Resolution
        updates['location'] = localWorkMode;
        updates['specificLocation'] = localGeoLocation || null;

        // Apply all other local values to URL
        updates['exclude'] = localExclude || null;
        updates['include'] = localInclude || null;
        updates['experience'] = localExperience || null;
        updates['country'] = localCountry || null;
        updates['exact'] = localExactTitle ? 'true' : 'false';
        updates['excludeLocation'] = localExcludeLocation || null;
        updates['company'] = localCompanies.length > 0 ? localCompanies.join(',') : null;
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

    // Suggestion filtering with categories
    const ROLE_CATEGORIES = {
        'Product': ['Product Manager', 'Product Analyst', 'Product Designer', 'Product Owner', 'Associate Product Manager', 'Product Marketing Manager'],
        'Design': ['UX Designer', 'UI Designer', 'Graphic Designer', 'Motion Designer', 'Brand Designer'],
        'Engineering': ['Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'DevOps Engineer', 'Data Engineer', 'Machine Learning Engineer', 'QA Engineer', 'Mobile Engineer'],
        'Data & Analytics': ['Data Analyst', 'Data Scientist', 'Business Analyst', 'Analytics Engineer'],
        'Marketing': ['Marketing Manager', 'Content Marketing Manager', 'Growth Manager', 'Social Media Manager', 'SEO Specialist', 'Performance Marketing Manager'],
        'Sales': ['Account Executive', 'Sales Development Representative', 'Customer Success Manager', 'Sales Manager', 'Account Manager'],
        'Operations': ['Operations Manager', 'Program Manager', 'Project Manager', 'Supply Chain Manager', 'Operations Analyst'],
        'Finance': ['Financial Analyst', 'Accountant', 'Financial Planning Analyst', 'Controller'],
        'HR': ['Recruiter', 'HR Manager', 'People Operations', 'Talent Partner'],
        'Support': ['Customer Support', 'Technical Support Engineer'],
        'Internships': ['Product Manager Intern', 'Software Engineer Intern', 'Data Analyst Intern', 'UX Design Intern', 'Marketing Intern', 'Data Science Intern', 'Business Analyst Intern', 'Sales Intern', 'HR Intern', 'Finance Intern']
    };

    const getFilteredRoleSuggestions = () => {
        const query = localRole.toLowerCase().trim();
        if (!query) {
            // Return top roles from each category for a "master list" feel
            return Object.entries(ROLE_CATEGORIES).flatMap(([cat, roles]) =>
                [{ type: 'category', label: cat }, ...roles.map(r => ({ type: 'role', label: r }))]
            );
        }

        const filtered = Object.entries(ROLE_CATEGORIES).map(([cat, roles]) => {
            const matchedRoles = roles.filter(r => r.toLowerCase().includes(query));
            if (matchedRoles.length > 0) {
                return [{ type: 'category', label: cat }, ...matchedRoles.map(r => ({ type: 'role', label: r }))];
            }
            return [];
        }).flat();

        return filtered.slice(0, 15);
    };

    const filteredRoleSuggestions = getFilteredRoleSuggestions();

    const toggleCompany = (company: string) => {
        setLocalCompanies(prev =>
            prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
        );
    };

    return (
        <div className="max-w-4xl mx-auto relative z-30 -mt-8">

            {/* Search Island */}
            <div className={cn(
                containerClass,
                "flex-col md:flex-row overflow-visible",
                mobileStackClass
            )}>

                {/* Role Input Section */}
                <div className="flex-[2] relative group">
                    <Terminal className={iconClass} />
                    <input
                        type="text"
                        value={localRole}
                        onChange={(e) => {
                            setLocalRole(e.target.value);
                            setShowRoleSuggestions(true);
                            setRoleHighlightIndex(-1);
                        }}
                        onFocus={() => setShowRoleSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (roleHighlightIndex >= 0) {
                                    const selected = filteredRoleSuggestions[roleHighlightIndex];
                                    if (selected && selected.type === 'role') {
                                        setLocalRole(selected.label);
                                        setShowRoleSuggestions(false);
                                    } else {
                                        handleGo();
                                    }
                                } else {
                                    handleGo();
                                }
                            } else if (e.key === 'ArrowDown') {
                                // Find next role (skip categories)
                                let next = roleHighlightIndex + 1;
                                while (next < filteredRoleSuggestions.length && filteredRoleSuggestions[next].type === 'category') {
                                    next++;
                                }
                                if (next < filteredRoleSuggestions.length) setRoleHighlightIndex(next);
                            } else if (e.key === 'ArrowUp') {
                                // Find prev role (skip categories)
                                let prev = roleHighlightIndex - 1;
                                while (prev >= 0 && filteredRoleSuggestions[prev].type === 'category') {
                                    prev--;
                                }
                                if (prev >= -1) setRoleHighlightIndex(prev);
                            }
                        }}
                        placeholder="Search roles (e.g. Frontend Engineer)"
                        className="w-full pl-12 pr-10 py-4 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm"
                    />

                    {showRoleSuggestions && filteredRoleSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden overflow-y-auto max-h-[400px] z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                            {filteredRoleSuggestions.map((item, idx) => {
                                if (item.type === 'category') {
                                    return (
                                        <div key={item.label} className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-y border-slate-100 dark:border-white/5 first:border-t-0">
                                            {item.label}
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={item.label}
                                        onMouseDown={() => {
                                            setLocalRole(item.label);
                                            setShowRoleSuggestions(false);
                                        }}
                                        onMouseEnter={() => setRoleHighlightIndex(idx)}
                                        className={cn(
                                            "px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between",
                                            (idx === roleHighlightIndex) ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        )}
                                    >
                                        <span className="font-mono">{item.label}</span>
                                        {localRole === item.label && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Work Mode Dropdown */}
                <div className="flex-1 relative group">
                    <button
                        onClick={() => setShowWorkModeDropdown(!showWorkModeDropdown)}
                        onBlur={() => setTimeout(() => setShowWorkModeDropdown(false), 200)}
                        className="w-full pl-12 pr-10 py-4 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm cursor-pointer flex items-center justify-between h-full"
                    >
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                            <Code className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="capitalize">{localWorkMode === 'onsite' ? 'On-site' : localWorkMode}</span>
                        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showWorkModeDropdown && "rotate-180")} />
                    </button>

                    {showWorkModeDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                            {[
                                { val: 'remote', label: 'Remote Only' },
                                { val: 'hybrid', label: 'Hybrid Mode' },
                                { val: 'onsite', label: 'On-site Job' }
                            ].map((opt) => (
                                <div
                                    key={opt.val}
                                    onMouseDown={() => {
                                        setLocalWorkMode(opt.val);
                                        setShowWorkModeDropdown(false);
                                    }}
                                    className={cn(
                                        "px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between font-mono",
                                        localWorkMode === opt.val ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                    )}
                                >
                                    <span>{opt.label}</span>
                                    {localWorkMode === opt.val && <Check className="w-3.5 h-3.5" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Geo-location Input */}
                <div className="flex-1 relative group">
                    <MapPin className={iconClass} />
                    <input
                        type="text"
                        value={localGeoLocation}
                        onChange={(e) => setLocalGeoLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Worldwide"
                        className="w-full pl-12 pr-10 py-4 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm"
                    />
                </div>

                {/* Time Range */}
                <div className="flex-[0.8] relative group">
                    <button
                        onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                        onBlur={() => setTimeout(() => setShowTimeDropdown(false), 200)}
                        className="w-full pl-12 pr-10 py-4 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-mono text-sm cursor-pointer flex items-center justify-between h-full"
                    >
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                            <Clock className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="truncate">{
                            {
                                '0.125': '3 Hours',
                                '0.25': '6 Hours',
                                '0.5': '12 Hours',
                                '1': '24 Hours',
                                '3': '3 Days',
                                '7': 'Last Week',
                                '30': 'Last Month',
                                'custom': 'Custom Range'
                            }[localTime] || 'Select Time'
                        }</span>
                        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showTimeDropdown && "rotate-180")} />
                    </button>

                    {showTimeDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 min-w-[160px]">
                            {[
                                { val: '0.125', label: '3 Hours' },
                                { val: '0.25', label: '6 Hours' },
                                { val: '0.5', label: '12 Hours' },
                                { val: '1', label: '24 Hours' },
                                { val: '3', label: '3 Days' },
                                { val: '7', label: 'Last Week' },
                                { val: '30', label: 'Last Month' },
                                { val: 'custom', label: 'Custom Range' }
                            ].map((opt) => (
                                <div
                                    key={opt.val}
                                    onMouseDown={() => {
                                        setLocalTime(opt.val);
                                        setShowTimeDropdown(false);
                                    }}
                                    className={cn(
                                        "px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between font-mono",
                                        localTime === opt.val ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                    )}
                                >
                                    <span>{opt.label}</span>
                                    {localTime === opt.val && <Check className="w-3.5 h-3.5" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {localTime === 'custom' && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 md:left-auto md:right-0 md:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date Range</span>
                                <button onClick={() => setLocalTime('30')} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-[8px] font-bold text-slate-500 uppercase ml-1">From</label>
                                    <input
                                        type="date"
                                        value={localFrom}
                                        onChange={(e) => setLocalFrom(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-[11px] font-mono outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] font-bold text-slate-500 uppercase ml-1">To</label>
                                    <input
                                        type="date"
                                        value={localTo}
                                        onChange={(e) => setLocalTo(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-[11px] font-mono outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleGo}
                                className="w-full bg-primary text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                Apply Range
                            </button>
                        </div>
                    </div>
                )}

                {/* Divider */}
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Launch Button Integrated */}
                <div className="p-0.5 w-full md:w-auto">
                    <button
                        onClick={handleGo}
                        className={cn(
                            "w-full h-full px-8 py-4 md:py-0 rounded-[1.25rem] font-black text-sm transition-all flex items-center justify-center space-x-2 group whitespace-nowrap shadow-lg active:scale-95",
                            isLimitReached
                                ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500"
                                : "bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                        )}
                        title={isLimitReached ? "Free search limit reached" : "Launch Engine"}
                    >
                        <span>{isLimitReached ? 'UPGRADE' : 'GO'}</span>
                        {!isLimitReached && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>

            {/* Mode Toggles / Extras */}
            <div className="mt-8 flex flex-col items-center">

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
                        <ProGate feature="Advanced Engine Controls" blur={true}>
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
                                                setLocalCompanies([]);
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

                                                <div className="space-y-3">
                                                    <div className="relative group/input">
                                                        <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-primary transition-colors">Target Companies</label>
                                                        <div className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-2 min-h-[52px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                                                            {localCompanies.map(comp => (
                                                                <div key={comp} className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-sm animate-in zoom-in-95 duration-200">
                                                                    {comp}
                                                                    <button onClick={() => toggleCompany(comp)} className="hover:text-red-500">
                                                                        <X className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <input
                                                                type="text"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' || e.key === ',') {
                                                                        e.preventDefault();
                                                                        const val = e.currentTarget.value.trim();
                                                                        if (val && !localCompanies.includes(val)) {
                                                                            setLocalCompanies([...localCompanies, val]);
                                                                            e.currentTarget.value = '';
                                                                        }
                                                                    } else if (e.key === 'Backspace' && !e.currentTarget.value && localCompanies.length > 0) {
                                                                        setLocalCompanies(localCompanies.slice(0, -1));
                                                                    }
                                                                }}
                                                                placeholder={localCompanies.length === 0 ? "Type company name..." : ""}
                                                                className="flex-1 bg-transparent border-none text-[13px] py-1 focus:ring-0 outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700 min-w-[120px]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Google', 'Meta', 'OpenAI', 'Stripe', 'Amazon'].map(comp => (
                                                            <button
                                                                key={comp}
                                                                onClick={() => toggleCompany(comp)}
                                                                className={cn(
                                                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                                                                    localCompanies.includes(comp)
                                                                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                                                                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20"
                                                                )}
                                                            >
                                                                {comp}
                                                            </button>
                                                        ))}
                                                    </div>
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
                                                        <button
                                                            onClick={() => setShowSeniorityDropdown(!showSeniorityDropdown)}
                                                            onBlur={() => setTimeout(() => setShowSeniorityDropdown(false), 200)}
                                                            className="w-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-xs py-3.5 pl-4 pr-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono cursor-pointer flex items-center justify-between"
                                                        >
                                                            <span>{
                                                                [
                                                                    { val: '', label: 'Any Seniority' },
                                                                    { val: 'intern', label: 'Intern / Entry' },
                                                                    { val: 'junior', label: 'Junior (1-3y)' },
                                                                    { val: 'mid', label: 'Mid-Level (3-5y)' },
                                                                    { val: 'senior', label: 'Senior (5+ y)' },
                                                                    { val: 'staff', label: 'Staff / Principal' },
                                                                    { val: 'manager', label: 'Manager / Director' }
                                                                ].find(opt => opt.val === localExperience)?.label || 'Any Seniority'
                                                            }</span>
                                                            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showSeniorityDropdown && "rotate-180")} />
                                                        </button>

                                                        {showSeniorityDropdown && (
                                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                                                {[
                                                                    { val: '', label: 'Any Seniority' },
                                                                    { val: 'intern', label: 'Intern / Entry' },
                                                                    { val: 'junior', label: 'Junior (1-3y)' },
                                                                    { val: 'mid', label: 'Mid-Level (3-5y)' },
                                                                    { val: 'senior', label: 'Senior (5+ y)' },
                                                                    { val: 'staff', label: 'Staff / Principal' },
                                                                    { val: 'manager', label: 'Manager / Director' }
                                                                ].map((opt) => (
                                                                    <div
                                                                        key={opt.val}
                                                                        onMouseDown={() => {
                                                                            setLocalExperience(opt.val);
                                                                            setShowSeniorityDropdown(false);
                                                                        }}
                                                                        className={cn(
                                                                            "px-4 py-2 text-xs cursor-pointer transition-colors flex items-center justify-between font-mono",
                                                                            localExperience === opt.val ? "bg-primary text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                                                        )}
                                                                    >
                                                                        <span>{opt.label}</span>
                                                                        {localExperience === opt.val && <Check className="w-3 h-3" />}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
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

                                                    {localTime === 'custom' && (
                                                        <div className="relative group/input">
                                                            <label className="absolute -top-2 left-3 px-1.5 bg-white dark:bg-slate-900 text-[9px] font-black text-slate-400 uppercase tracking-tighter z-10 group-focus-within/input:text-primary transition-colors">Custom Date Range (YYYY-MM-DD)</label>
                                                            <div className="flex items-center gap-2 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-1 px-3">
                                                                <input
                                                                    type="date"
                                                                    value={localFrom}
                                                                    onChange={(e) => setLocalFrom(e.target.value)}
                                                                    className="w-full bg-transparent border-none text-[13px] py-3 focus:ring-0 outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                                />
                                                                <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1" />
                                                                <input
                                                                    type="date"
                                                                    value={localTo}
                                                                    onChange={(e) => setLocalTo(e.target.value)}
                                                                    className="w-full bg-transparent border-none text-[13px] py-3 focus:ring-0 outline-none font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

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
                        </ProGate>
                    </div>
                )}
            </div>
        </div>
    );
}
