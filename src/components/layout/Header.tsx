
"use client";

import { useState, useEffect } from "react";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        {/* Simple Icon shape */}
                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight font-display text-slate-900 dark:text-white">
                        HiddenApply<span className="text-primary">Pro</span>
                    </span>
                </div>


                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-slate-500 hover:text-primary transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}

                    <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
