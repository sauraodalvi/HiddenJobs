
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const NAV_LINKS = [
    { href: "https://thestare.in/", label: "Become Product Manager", external: true },
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
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight font-display text-slate-900 dark:text-white">
                        HiddenJobs
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    {NAV_LINKS.map((link) => (
                        link.external ? (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}

                    <a
                        href="https://saurao.gumroad.com/l/BuymeaCoffee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-primary hover:text-primary/80 transition-all flex items-center gap-1.5"
                    >
                        Donate
                    </a>

                    <div className="flex items-center">
                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-4" />
                        {mounted ? (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 text-slate-500 hover:text-primary transition-colors focus:outline-none"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        ) : (
                            <div className="w-9 h-9" /> // Placeholder to prevent layout shift
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
