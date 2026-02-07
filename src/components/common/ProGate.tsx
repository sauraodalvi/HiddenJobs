
"use client";

import { useProFeatures } from "@/hooks/use-pro";
import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProGateProps {
    children: React.ReactNode;
    feature?: string;
    description?: string;
    blur?: boolean;
    className?: string;
}

export function ProGate({
    children,
    feature = "Pro Feature",
    description = "Sign in to unlock advanced search capabilities.",
    blur = true,
    className
}: ProGateProps) {
    const { isPro, isLoading } = useProFeatures();

    // If loading or pro, show content freely
    // (You might want to show loading spinner instead of content during load, but better UX is to show content then snap if restricted. Or show skeleton.)
    // For now, let's assume if loading, we don't gate yet to avoid layout shift, or gate safely.
    // Safest: Gate until loaded.

    if (isLoading) return <div className="animate-pulse bg-slate-100 h-24 rounded-xl w-full" />;

    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div className={cn("relative overflow-hidden group/gate", className)}>
            {/* The Content (Blurred) */}
            <div className={cn("transition-all duration-500", blur && "blur-md opacity-50 pointer-events-none select-none grayscale-[0.5]")}>
                {children}
            </div>

            {/* The Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-white/10 to-white/90 dark:from-slate-900/10 dark:to-slate-900/90 p-6 text-center">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm flex flex-col items-center transform transition-transform group-hover/gate:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-amber-500/20">
                        <Lock className="w-5 h-5 text-white" />
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                        Unlock {feature}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium leading-relaxed">
                        {description}
                    </p>

                    <Link href="/pricing">
                        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity shadow-xl">
                            <Sparkles className="w-3 h-3" />
                            Upgrade to Pro
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
