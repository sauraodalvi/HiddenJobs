import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AutoApplyGenerator } from "@/components/AutoApplyGenerator";
import { Bot, Terminal, Shield, Zap, Sparkles, CheckCircle2, ArrowRight, Play, Cpu, Layers, Copy, FileText, Star, Lock } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Auto-Apply with AI IDE & CLI Agents | HiddenJobs",
    description: "Dumbed-down, step-by-step guide to auto-applying on Greenhouse, Lever, Ashby, and Workday using your AI Agent (Cursor, OpenCode, Claude Code, Kimi WebBridge) with Resume Match Scoring.",
};

export default function AutoApplyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-6 py-16 max-w-5xl">
                {/* Hero Header */}
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-4 h-4 fill-emerald-500" />
                        AI Agent Auto-Apply Hub
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                        Auto-Apply to Jobs with <span className="text-emerald-500">Smart Resume Matching</span>.
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-medium leading-relaxed">
                        A beginner-friendly guide to auto-applying with your AI agent (Cursor, OpenCode CLI, Claude Code, Kimi WebBridge).
                        Your agent rates the job match first—if it's <strong>under 4/5</strong>, it skips! If it's <strong>4/5 or higher</strong>, it fills the form and applies!
                    </p>
                </header>

                {/* 4 Feature Badges */}
                <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                            <Star className="w-5 h-5 fill-amber-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Match Rating Gate</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Skips jobs scoring &lt; 4/5</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Local Markdown Resume</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Reads CANDIDATE_PROFILE.md</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Human-in-the-Loop</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pauses before final submission</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs">HiddenJobs Signature</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">SEO backlink in application notes</p>
                        </div>
                    </div>
                </section>

                {/* Dumbed-Down 4-Step Instructions */}
                <section className="mb-16">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-8">
                        How It Works (Complete Beginner Guide)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm flex items-center justify-center mb-4 shadow-md">1</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Create Local Resume MD</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                                Save a file named <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded text-slate-800 dark:text-slate-200">CANDIDATE_PROFILE.md</code> on your PC with your details.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center mb-4 shadow-md shadow-amber-500/20">2</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Match Rating Filter (&ge;4)</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                                The prompt tells your agent to calculate a 1-5 rating. If score &lt; 4, it skips applying!
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20">3</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Copy Master Prompt</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                                Enter your details in the prompt generator below and click <strong>Copy Master Prompt</strong>.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                            <div className="w-9 h-9 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">4</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Paste & Run in AI Agent</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                                Paste prompt into Cursor, OpenCode, Claude Code, or Kimi WebBridge. Confirm & submit!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Supported AI Agents Grid */}
                <section className="mb-16 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 text-center">Compatible with all Modern AI Agents</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">OpenCode CLI</div>
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">Cursor IDE</div>
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">Claude Code</div>
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">Kimi WebBridge</div>
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">Windsurf</div>
                        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 font-bold text-xs">Roo Code</div>
                    </div>
                </section>

                {/* Interactive Generator */}
                <section className="mb-20">
                    <AutoApplyGenerator />
                </section>

                {/* CTA Section */}
                <section className="text-center bg-slate-50 dark:bg-slate-800/30 p-12 rounded-[40px] border border-slate-200 dark:border-slate-800">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Find Hidden ATS Jobs & Auto-Apply</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto text-sm font-medium">
                        Search 50k+ direct Greenhouse, Lever, and Ashby job URLs on HiddenJobs to auto-apply today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-bold">
                        <Link
                            href="/jobs"
                            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                            Browse Job Directory <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/tools/ats-search-query-generator"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                            Generate Search Dorks
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
