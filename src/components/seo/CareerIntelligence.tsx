import React from 'react';
import { ShieldCheck, UserCheck, Zap } from 'lucide-react';

export const CareerIntelligence = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-primary/5 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                    <ShieldCheck className="w-4 h-4" />
                    Expert Verified Analysis
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                    Hidden Market Intelligence Team
                </h3>

                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700/50">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                        <UserCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 dark:text-white">Alex Rivera</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Lead ATS Researcher</div>
                        <p className="text-xs text-slate-400 mt-1 italic">
                            Specializes in job board arbitrage and ATS algorithm reverse-engineering.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                            <Zap className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">Priority Edge:</span>
                            <span className="text-slate-500 dark:text-slate-400 ml-1">Direct-to-ATS routes are 72h faster than external boards.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        </div>
    );
};
