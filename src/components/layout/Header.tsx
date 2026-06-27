
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const NAV_LINKS: { href: string; label: string }[] = [
    { href: "/tools/ats-search-query-generator", label: "Tools" },
    { href: "/blog", label: "Blog" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/jobs", label: "Directory" },
];

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                            <div className="w-4 h-4 rounded-full border-2 border-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight font-display text-slate-900 dark:text-white">
                            HiddenJobs
                        </span>
                    </Link>

                    {/* Live Indicator Trust Signal */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                            Live Indexing
                        </span>
                    </div>
                </div>

                    <div className="flex items-center space-x-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                </div>
            </div>
        </nav>
    );
}
