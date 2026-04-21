"use client";

import { ExternalLink, Globe, MapPin, Zap } from 'lucide-react';
import { getCompanyLogo, getLogoFallback } from '@/lib/utils';

interface DiscoveryResult {
    url: string;
    title: string;
    content: string;
    engine: string;
}

export function DiscoveryResultCard({ result }: { result: DiscoveryResult }) {
    // Extract potential company name from Greenhouse/Lever URLs
    let companyName = "Unknown Company";
    try {
        const url = new URL(result.url);
        if (url.hostname.includes('greenhouse.io')) {
            companyName = url.pathname.split('/')[1];
        } else if (url.hostname.includes('lever.co')) {
            companyName = url.pathname.split('/')[1];
        } else if (url.hostname.includes('ashbyhq.com')) {
            companyName = url.pathname.split('/')[1];
        }
    } catch (e) { }

    return (
        <div className="group bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1 min-w-0">
                    <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 dark:text-slate-100 font-bold hover:text-primary transition-colors text-base line-clamp-2 leading-tight decoration-primary/20 decoration-2 underline-offset-4"
                    >
                        {result.title}
                    </a>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0">
                            <img
                                src={getCompanyLogo(new URL(result.url).hostname)}
                                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                                alt=""
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null;
                                    (e.target as HTMLImageElement).src = getLogoFallback(new URL(result.url).hostname);
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
                            {companyName}
                        </span>
                    </div>
                </div>
                <a
                    href={result.url}
                    target="_blank"
                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all active:scale-90 shrink-0 border border-slate-200 dark:border-white/5"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed font-medium italic opacity-80 decoration-slate-200">
                "{result.content}"
            </p>

            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 pt-3 border-t border-slate-50 dark:border-white/5 uppercase tracking-tighter">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-100 dark:border-white/5">
                    <Globe className="w-3 h-3 text-primary/60" />
                    <span>{result.engine}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-500/60" />
                    <span className="truncate max-w-[150px]">{new URL(result.url).hostname}</span>
                </div>
            </div>
        </div>
    );
}
