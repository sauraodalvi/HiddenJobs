
"use client";

import { useSearchFilters } from "@/hooks/use-search";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ExternalLink, Copy, Check, Search, AlertTriangle, Loader2, X, Maximize2, ChevronLeft, Lock, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResultsSection() {
    const { generateLinks, filters } = useSearchFilters();

    // Real logic simulation: Are we in Pro mode? 
    // Usually this comes from a Clerk session or DB, but for this demo let's allow a toggle.
    const [isPro, setIsPro] = useState(false); // Default to false to show locking behavior

    const links = useMemo(() => generateLinks(isPro), [generateLinks, isPro]);
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
        if (link.locked) return;
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

            {/* Premium Control */}
            <div className="absolute top-0 right-6 flex items-center gap-2">
                <div className="flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button
                        onClick={() => setIsPro(!isPro)}
                        className={cn(
                            "flex items-center gap-1.5 text-[10px] font-black px-4 py-1.5 rounded-lg transition-all",
                            isPro
                                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        <Sparkles className={cn("w-3 h-3", isPro && "animate-pulse")} />
                        {isPro ? 'PRO UNLOCKED' : 'GO PRO'}
                    </button>
                </div>
            </div>

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
                <div className={cn(
                    "flex overflow-x-auto pb-4 gap-3 custom-scrollbar shrink-0 snap-x transition-all duration-500",
                    isFullScreen ? "px-6 py-2 border-b border-slate-200 dark:border-slate-700 mb-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl" : "mb-2"
                )}>
                    {links.map((link: any, idx: number) => (
                        <div
                            key={link.name}
                            onClick={() => switchLink(link)}
                            className={cn(
                                "flex items-center space-x-3 p-2 pr-4 rounded-xl border transition-all min-w-[200px] snap-start relative overflow-hidden shrink-0",
                                link.locked
                                    ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60 cursor-pointer hover:bg-slate-100 ring-1 ring-inset ring-slate-900/5"
                                    : "cursor-pointer",
                                !link.locked && activeLink?.name === link.name
                                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-xl scale-[1.02]"
                                    : !link.locked && "bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark hover:border-primary/50 text-slate-600 dark:text-slate-400"
                            )}
                        >
                            {/* Logo */}
                            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 relative group-hover:border-primary/30 transition-colors">
                                <img
                                    src={`https://logo.clearbit.com/${link.domain.split('.').slice(-2).join('.')}`}
                                    alt={link.name}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector('.fallback-initial')) {
                                            const span = document.createElement('span');
                                            span.innerText = link.name[0].toUpperCase();
                                            span.className = "fallback-initial text-[10px] font-black text-slate-400";
                                            parent.appendChild(span);
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 w-full">
                                    <span className="text-xs font-bold leading-none truncate">{link.name}</span>
                                    {link.locked && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                                </div>
                                <span className="text-[10px] opacity-70 mt-1 font-mono leading-none">
                                    {link.locked ? 'Unlock with Pro' : `View latest postings`}
                                </span>
                            </div>

                            {/* Status Icon */}
                            {!link.locked && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyQuery(link.query, idx);
                                    }}
                                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                                    title="Copy Query"
                                >
                                    {copiedIndex === idx ? (
                                        <Check className="w-3 h-3 text-green-400" />
                                    ) : (
                                        <Copy className="w-3 h-3 text-current opacity-70" />
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Embedded Viewer Pane */}
                <div className={cn(
                    "w-full bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col overflow-hidden transition-all duration-500",
                    isFullScreen ? "flex-1 h-full border-none shadow-none ring-1 ring-slate-200 dark:ring-slate-700" : "h-[800px]"
                )}>
                    {/* Viewer Header */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur sticky top-0 z-10 shrink-0">

                        {/* Left: Engine Tabs */}
                        <div className="flex items-center space-x-4">
                            <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1 space-x-1 shrink-0 shadow-inner overflow-x-auto custom-scrollbar max-w-[200px] sm:max-w-none">
                                {['ddg', 'bing', 'brave', 'yahoo', 'google'].map((engine) => (
                                    <button
                                        key={engine}
                                        onClick={() => setActiveEngine(engine as any)}
                                        className={cn(
                                            "px-4 py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all uppercase tracking-wider whitespace-nowrap",
                                            activeEngine === engine
                                                ? "bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white scale-105"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {engine === 'ddg' ? 'DuckDuckGo' : engine === 'bing' ? 'Bing' : engine === 'brave' ? 'Brave' : engine === 'yahoo' ? 'Yahoo' : 'Google'}
                                    </button>
                                ))}
                            </div>
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
                                <span>Iframe Blocked? Open in New Tab</span>
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
                                className={cn(
                                    "flex items-center px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg active:scale-95 group",
                                    isFullScreen
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                        : "bg-primary text-white hover:bg-blue-600 hover:shadow-blue-500/25"
                                )}
                            >
                                {isFullScreen ? (
                                    <>
                                        <X className="w-4 h-4 mr-2" />
                                        <span>Exit</span>
                                    </>
                                ) : (
                                    <>
                                        <Maximize2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        <span>Focus Mode</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Iframe Content */}
                    <div className="flex-1 bg-slate-100 dark:bg-black/50 relative">
                        {activeLink?.locked ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-20">
                                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6">
                                    <Lock className="w-8 h-8 text-amber-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 decoration-primary decoration-4 underline-offset-4">Premium Job Source</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                                    Ashby, Jobvite, and specialized ATS platforms are only available to
                                    <span className="text-primary font-bold"> HiddenApply Pro</span> members.
                                </p>
                                <button
                                    onClick={() => alert("Upgrade Modal would open here!")}
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform"
                                >
                                    Upgrade to Unveil
                                </button>
                            </div>
                        ) : (
                            <iframe
                                key={`${activeLink?.name}-${activeEngine}`}
                                src={getEmbedUrl()}
                                className="w-full h-full border-none bg-white"
                                title="Search Results"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
