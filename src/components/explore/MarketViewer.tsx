"use client";

import { X, ExternalLink, Globe, RefreshCw, Maximize2, Search, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MarketViewerProps {
    isOpen: boolean;
    onClose: () => void;
    links: any[];
    activeLinkName?: string;
}

export function MarketViewer({ isOpen, onClose, links, activeLinkName }: MarketViewerProps) {
    const [activeLink, setActiveLink] = useState<any>(links[0]);
    const [activeEngine, setActiveEngine] = useState<'google' | 'ddg' | 'bing' | 'brave'>('google');
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Sync active link if provided externally or if links change
    useEffect(() => {
        if (activeLinkName) {
            const link = links.find(l => l.name === activeLinkName);
            if (link) setActiveLink(link);
        } else if (!activeLink && links.length > 0) {
            setActiveLink(links[0]);
        }
    }, [activeLinkName, links]);

    const getActiveUrl = () => {
        if (!activeLink) return '';
        switch (activeEngine) {
            case 'ddg': return activeLink.duckduckgoUrl;
            case 'bing': return activeLink.bingUrl;
            case 'brave': return activeLink.braveUrl;
            case 'google': default: return activeLink.googleUrl;
        }
    };

    const getEmbedUrl = () => {
        const url = getActiveUrl();
        if (activeEngine === 'google') return `${url}&igu=1`;
        return url;
    };

    if (!isOpen) return null;

    return (
        <div className={cn(
            "fixed inset-x-0 bottom-0 z-[2000] transition-all duration-700 ease-in-out transform",
            isOpen ? "translate-y-0" : "translate-y-full",
            isFullScreen ? "h-screen" : "h-[85vh] max-h-[900px]"
        )}>
            {/* Backdrop for non-fullscreen mode */}
            {!isFullScreen && (
                <div
                    className="absolute inset-x-0 -top-full h-full bg-slate-900/40 backdrop-blur-sm pointer-events-auto cursor-ns-resize"
                    onClick={onClose}
                />
            )}

            <div className="h-full w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 shadow-[0_-32px_64px_-12px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden rounded-t-[2.5rem]">

                {/* Drag Handle Bar */}
                <div className="w-full flex justify-center py-3 cursor-ns-resize group" onClick={onClose}>
                    <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:bg-primary/50 transition-colors" />
                </div>

                {/* Header / Controls */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-black/20 backdrop-blur">

                    {/* ATS Switcher */}
                    <div className="flex overflow-x-auto pb-1 gap-2 custom-scrollbar w-full md:w-auto">
                        {links.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => setActiveLink(link)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                                    activeLink?.name === link.name
                                        ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-lg"
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-500 hover:border-primary"
                                )}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-1 gap-1">
                            {['google', 'ddg', 'bing'].map((engine) => (
                                <button
                                    key={engine}
                                    onClick={() => setActiveEngine(engine as any)}
                                    className={cn(
                                        "px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all",
                                        activeEngine === engine
                                            ? "bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white"
                                            : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {engine === 'ddg' ? 'DuckDuck' : engine}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={getActiveUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all"
                                title="Open External"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => setIsFullScreen(!isFullScreen)}
                                className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                title="Toggle Fullscreen"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Viewer Body */}
                <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 relative">
                    {activeLink ? (
                        <iframe
                            key={`${activeLink.name}-${activeEngine}`}
                            src={getEmbedUrl()}
                            className="w-full h-full border-none"
                            title="Market Search Results"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Search className="w-12 h-12 mb-4 opacity-10" />
                            <p className="text-sm font-bold uppercase tracking-widest opacity-30">Powering Engine...</p>
                        </div>
                    )}

                    {/* Security Disclaimer */}
                    <div className="absolute bottom-6 right-6 max-w-[280px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2xl pointer-events-none fill-mode-both z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex items-start gap-3">
                            <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                                <b>SECURE VIEW:</b> Some platforms may require "Open External" due to CSP policies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
