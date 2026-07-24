import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AutoApplyGenerator } from "@/components/AutoApplyGenerator";
import { Bot, Terminal, Shield, Zap, Sparkles, CheckCircle2, ArrowRight, Play, Cpu, Layers } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "AI Auto-Apply Guide: Automate Job Applications with Claude & Kimi WebBridge | HiddenJobs",
    description: "Step-by-step guide and master prompts for automatically applying to Greenhouse, Lever, Ashby, and Workday career sites using Kimi WebBridge, Claude Connect, or OpenCode agents.",
};

export default function AutoApplyGuidePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />

            <main className="container mx-auto px-6 py-16 max-w-5xl">
                {/* Hero Header */}
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-4 h-4" />
                        AI Career Automation Playbook
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                        Auto-Apply to Hidden Jobs <br className="hidden sm:inline" />
                        with <span className="text-primary">Claude & Kimi WebBridge</span>.
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-medium leading-relaxed">
                        Stop filling in repetitive application forms manually. Combine HiddenJobs direct ATS links with Kimi WebBridge or Claude Connect to auto-fill candidate details, attach resumes, and prep job submissions in seconds.
                    </p>
                </header>

                {/* Section 1: Architecture Overview */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">1. How AI Auto-Apply Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-primary text-white font-black text-sm flex items-center justify-center mb-4">1</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Discover ATS Link</h3>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">Find direct Greenhouse, Lever, Ashby, or Workday posting links using HiddenJobs dorks or search directories.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-primary text-white font-black text-sm flex items-center justify-center mb-4">2</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Connect WebBridge</h3>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">Launch Kimi WebBridge, Claude Connect, or OpenCode CLI browser agent on your local machine.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-primary text-white font-black text-sm flex items-center justify-center mb-4">3</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Run Master Prompt</h3>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">Pass your Candidate Profile JSON and target URL into the Master Auto-Apply Prompt below.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-black text-sm flex items-center justify-center mb-4">4</div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Verify & Submit</h3>
                            <p className="text-xs text-slate-500 font-normal leading-relaxed">The agent auto-fills all fields, attaches your resume, and pauses for your final 1-click confirmation.</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Interactive Prompt & Configurator */}
                <section className="mb-20">
                    <AutoApplyGenerator />
                </section>

                {/* Section 3: Step-by-Step AI Bridge Tool Setup */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">2. AI Connector & WebBridge Setup</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Kimi WebBridge */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-primary" />
                                    Option A: Kimi WebBridge / OpenCode CLI
                                </h3>
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full">Recommended</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-normal">
                                Kimi WebBridge exposes Chrome browser automation tools to LLMs, enabling autonomous navigation, DOM input filling, and file attachment handling.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
                                <li>Launch OpenCode CLI or Kimi WebBridge agent session in your terminal.</li>
                                <li>Ensure your local resume PDF is saved at your designated file path.</li>
                                <li>Copy the Master Prompt from above and submit it to the agent turn.</li>
                                <li>Watch the browser automatically complete form fields on Greenhouse or Lever!</li>
                            </ol>
                        </div>

                        {/* Claude Desktop / MCP */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-primary" />
                                Option B: Claude Desktop with Browser Tools
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-normal">
                                If using Claude Desktop or Claude Connect with browser capabilities enabled:
                            </p>
                            <code className="block bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono mb-4 overflow-x-auto select-all">
                                {`"Please open ${"https://boards.greenhouse.io/target/job"}, fill out the application form using my Candidate Profile JSON, attach my resume, and show me a screenshot before submitting."`}
                            </code>
                        </div>
                    </div>
                </section>

                {/* Section 4: Safety & Verification Protocol */}
                <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20 border border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black">3. The Safety Guardrail Rule</h2>
                    </div>

                    <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                        <p>
                            To prevent accidental submissions or misrepresenting your candidate background, our Master Auto-Apply Prompt enforces a strict **Human-in-the-Loop Safety Gate**:
                        </p>
                        <ul className="space-y-3 pt-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Form Inspection:</strong> The AI agent pauses before clicking the final 'Submit' button.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Summary Verification:</strong> The agent displays a summary of filled fields, attached resume, and custom answers for your review.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Instant Confirmation:</strong> You give final verbal/typed approval (`"Submit it!"`), ensuring 100% submission accuracy.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Ready to Automate Your Job Applications?</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto text-sm font-medium">
                        Search hidden ATS job postings now and use the prompt generator above to auto-apply.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-bold">
                        <Link
                            href="/jobs"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                            Browse Hidden Jobs <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/tools/ats-search-query-generator"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                            Generate Dorks
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
