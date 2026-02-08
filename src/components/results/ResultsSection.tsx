"use client";

import { useSearchFilters } from "@/hooks/use-search";
import { useProFeatures } from "@/hooks/use-pro";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ExternalLink, Copy, Check, Search, AlertTriangle, Loader2, X, Maximize2, ChevronLeft, Lock, RefreshCw, Sparkles, Globe, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Logo component with robust error handling
// Logo component that shows platform initials with consistent brand colors
function LogoImage({ link }: { link: any }) {
    // Mapping of major ATS platforms to their brand colors
    const brandColors: Record<string, string> = {
        'Greenhouse': 'bg-[#00b28f]',
        'Lever': 'bg-[#25282a]',
        'Workday': 'bg-[#005cb9]',
        'SmartRecruiters': 'bg-[#004cd4]',
        'BambooHR': 'bg-[#619a3c]',
        'JazzHR': 'bg-[#f7941e]',
        'Breezy HR': 'bg-[#00aaff]',
        'Ashby': 'bg-[#ff5a5f]',
        'Workable': 'bg-[#409e60]',
        'Recruiterbox': 'bg-[#212b36]',
        'Jobvite': 'bg-[#f7941e]',
        'iCIMS': 'bg-[#004cd4]',
    };

    const brandColor = brandColors[link.name] || "bg-slate-900 dark:bg-white";
    const textColor = brandColors[link.name] ? "text-white" : "text-white dark:text-slate-900";

    // Get initials (up to 2 characters)
    const initials = link.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/10 relative group-hover:border-primary/30 transition-colors shadow-sm",
            brandColor
        )}>
            <span className={cn(
                "text-[11px] font-black uppercase tracking-tighter",
                textColor
            )}>
                {initials}
            </span>
        </div>
    );
}


export function ResultsSection() {
    const { generateLinks, filters } = useSearchFilters();
    const { isPro } = useProFeatures();

    const links = useMemo(() => generateLinks(), [generateLinks]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [activeLink, setActiveLink] = useState<any>(links[0]);
    const [activeEngine, setActiveEngine] = useState<'google' | 'ddg' | 'bing' | 'brave' | 'yahoo'>('ddg');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Keyboard support for Focus Mode
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullScreen) {
                toggleFullScreen();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullScreen]);

    // Sync activeLink when filters force links to regenerate
    useEffect(() => {
        if (activeLink) {
            const updatedLink = links.find((l: any) => l.name === activeLink.name);
            if (updatedLink && updatedLink.query !== activeLink.query) {
                setActiveLink(updatedLink);
            } else if (!updatedLink) {
                setActiveLink(links[0]);
            }
        }
    }, [links, activeLink?.name, activeLink?.query]);

    const toggleFullScreen = () => {
        if (isFullScreen) {
            setIsExiting(true);
            setTimeout(() => {
                setIsFullScreen(false);
                setIsExiting(false);
            }, 300);
        } else {
            setIsFullScreen(true);
        }
    };

    const switchLink = (link: any) => {
        setActiveLink(link);
    };

    const getActiveUrl = () => {
        if (!activeLink) return '';
        switch (activeEngine) {
            case 'ddg': return activeLink.duckduckgoUrl;
            case 'bing': return activeLink.bingUrl;
            case 'brave': return activeLink.braveUrl;
            case 'yahoo': return activeLink.yahooUrl;
            case 'google': default: return activeLink.googleUrl;
        }
    };

    const getEmbedUrl = () => {
        const url = getActiveUrl();
        if (activeEngine === 'google') return `${url}&igu=1`;
        return url;
    };

    const copyQuery = (query: string, idx: number) => {
        navigator.clipboard.writeText(query);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section id="results-section" className="max-w-7xl mx-auto px-6 py-12 relative">

            {/* Main Content Area */}
            <div className={cn(
                "transition-all duration-500 ease-in-out flex flex-col",
                isFullScreen
                    ? "fixed inset-0 z-[100] bg-slate-50/98 dark:bg-slate-900/98 backdrop-blur-xl p-4 h-screen w-screen"
                    : "relative w-full",
                isFullScreen && !isExiting && "animate-in fade-in zoom-in-95 duration-500",
                isExiting && "animate-out fade-out zoom-out-95 duration-500"
            )}>

                {/* Horizontal Tool Bar */}

                {/* Horizontal Tool Bar */}
                <div className={cn(
                    "flex overflow-x-auto pb-4 gap-3 custom-scrollbar shrink-0 snap-x transition-all duration-500",
                    isFullScreen ? "px-6 py-2 border-b border-slate-200 dark:border-slate-700 mb-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl" : "mb-2"
                )}>
                    {links.map((link: any, idx: number) => {
                        return (
                            <div
                                key={link.name}
                                onClick={() => switchLink(link)}
                                className={cn(
                                    "flex items-center space-x-3 p-3 pr-5 rounded-xl border transition-all min-w-[220px] snap-start relative overflow-hidden shrink-0 cursor-pointer group",
                                    activeLink?.name === link.name
                                        ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-xl scale-[1.02]"
                                        : "bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark hover:border-primary/50 text-slate-600 dark:text-slate-400"
                                )}
                            >


                                {/* Logo */}
                                <LogoImage link={link} />

                                <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 w-full">
                                        <span className="text-sm font-bold leading-none truncate">{link.name}</span>
                                    </div>
                                    <span className="text-[10px] opacity-70 mt-1 font-mono leading-none">
                                        View latest postings
                                    </span>
                                </div>

                                {/* Status Icon */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyQuery(link.query, idx);
                                    }}
                                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                                    title="Copy Query"
                                >
                                    {copiedIndex === idx ? (
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5 text-current opacity-70" />
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Embedded Viewer Pane */}
                <div className={cn(
                    "w-full bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col overflow-hidden transition-all duration-500",
                    isFullScreen ? "flex-1 h-full border-none shadow-none ring-1 ring-slate-200 dark:ring-slate-700" : "h-[800px]"
                )}>
                    {/* Viewer Header */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur sticky top-0 z-10 shrink-0">

                        {/* Left: Engine Tabs */}
                        <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1 space-x-1 shrink-0 shadow-inner overflow-x-auto custom-scrollbar max-w-[250px] sm:max-w-none">
                            {['google', 'ddg', 'bing', 'brave', 'yahoo'].map((engine) => (
                                <button
                                    key={engine}
                                    onClick={() => setActiveEngine(engine as any)}
                                    className={cn(
                                        "px-4 py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5",
                                        activeEngine === engine
                                            ? "bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white scale-105"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Globe className="w-3 h-3" />
                                    {engine === 'ddg' ? 'DuckDuckGo' : engine.charAt(0).toUpperCase() + engine.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Center: Open External Fallback */}
                        <div className="flex-1 flex justify-center px-4">
                            <a
                                href={getActiveUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-tight"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span className="hidden sm:inline">Iframe Blocked? Open in New Tab</span>
                                <span className="sm:hidden">Open External</span>
                            </a>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => {
                                    const currentLink = activeLink;
                                    setActiveLink(null);
                                    setTimeout(() => setActiveLink(currentLink), 10);
                                }}
                                className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                title="Refresh View"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={toggleFullScreen}
                                className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                title={isFullScreen ? "Exit Focus Mode" : "Focus Mode"}
                            >
                                {isFullScreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Iframe View */}
                    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900 relative flex flex-col">
                        {activeLink ? (
                            <iframe
                                key={`${activeLink.name}-${activeEngine}`} // Force re-render on switch
                                src={getEmbedUrl()}
                                className="w-full h-full border-none flex-1"
                                title="Search Results Viewer"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <Search className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-sm font-medium">Select an ATS platform above to view postings</p>
                            </div>
                        )}

                        {/* Security Warning Overlay (Visible only if iframe is active) */}
                        {activeLink && !(activeLink.isPro && !isPro) && (
                            <div className="absolute bottom-4 right-4 max-w-xs bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-both z-20">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Secure Iframe. Some results may be blocked by search engine security policies. Use the "Open External" link if needed.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Metrics */}
                {!isFullScreen && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono uppercase tracking-widest gap-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                indexing 50,000+ jobs
                            </span>
                            <span className="opacity-30">|</span>
                            <span>last update: moments ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>search latency: ~0.4s</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
