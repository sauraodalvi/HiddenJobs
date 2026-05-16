import { generateJobCityContentUnified } from "@/lib/ai-bridge";
import { FAQSection } from "./FAQSection";
import { HelpCircle, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { seoContent, jobRoles, cities } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

interface DynamicAiPanelsProps {
    roleName: string;
    cityName: string;
    platformLabel: string;
    initialOverview?: string | null;
    initialFaqs?: any[] | null;
}

/**
 * DynamicAiPanels (Server Component)
 * Handles the async generation of SEO content using the AI Bridge.
 * Uses a 'Reserved Layout' pattern to prevent CLS during streaming.
 */
export async function DynamicAiPanels({
    roleName,
    cityName,
    platformLabel,
    initialOverview,
    initialFaqs
}: DynamicAiPanelsProps) {

    // If we already have cached content, render it immediately
    let overview = initialOverview;
    let faqsArr = initialFaqs;
    let source: string | undefined;

    if (!overview || !faqsArr || faqsArr.length === 0) {
        console.log(`[DynamicAiPanels] Cache miss for ${roleName} in ${cityName}. Triggering Multi-LLM Bridge...`);
        const aiData = await generateJobCityContentUnified(roleName, cityName);
        overview = aiData.aiOverview;
        faqsArr = aiData.faqs;
        source = aiData.source;

        // ASYNC PERSISTENCE: Cache result in DB so future hits are instant
        try {
            const [roleRec] = await db.select().from(jobRoles).where(eq(jobRoles.name, roleName));
            const [cityRec] = await db.select().from(cities).where(eq(cities.name, cityName));

            if (roleRec && cityRec) {
                await db.insert(seoContent).values({
                    roleId: roleRec.id,
                    cityId: cityRec.id,
                    title: `Hidden ${roleName} jobs in ${cityName} using ${platformLabel} | HiddenJobs`,
                    description: aiData.metaDescription || `Access unlisted ${roleName} roles in ${cityName} through ${platformLabel}.`,
                    aiOverview: overview,
                    faqs: JSON.stringify(faqsArr)
                }).onConflictDoUpdate({
                    target: [seoContent.roleId, seoContent.cityId],
                    set: {
                        aiOverview: overview,
                        faqs: JSON.stringify(faqsArr),
                        updatedAt: new Date()
                    }
                });
                console.log(`[DynamicAiPanels] Content cached for ${roleName} - ${cityName}`);
            }
        } catch (dbErr) {
            console.error('[DynamicAiPanels] DB Cache error:', dbErr);
        }
    }

    return (
        <div className="space-y-20">
            {/* Market Insights Panel - GEO Optimized */}
            <article className="max-w-4xl mx-auto mt-20 bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden group">
                {/* Authority Badge */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600" />
                
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Market Intelligence Report</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analysis for {roleName} in {cityName}</p>
                        </div>
                    </div>
                    {source && (
                        <aside className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-900/50 rounded-full border border-slate-100 dark:border-slate-700">
                            <cite className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter not-italic">
                                Source: {source === 'static' ? 'Internal Index' : `${source.toUpperCase()} LLM + ATS Crawler`}
                            </cite>
                        </aside>
                    )}
                </header>

                <div
                    className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed marker:text-primary"
                    dangerouslySetInnerHTML={{ __html: overview || '' }}
                />

                {/* GEO Citation Footnote */}
                <footer className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-400 font-medium">
                        Verified against <span className="font-bold text-slate-500 dark:text-slate-300">50,000+ active ATS endpoints</span> including Greenhouse, Lever, and Ashby.
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                        Updated {new Date().toLocaleDateString()}
                    </div>
                </footer>

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000" />
            </article>

            {/* AI-Powered FAQ Section - AEO Optimized */}
            <section className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                        <HelpCircle className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Career Intelligence FAQ</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Direct answers for {roleName} candidates in {cityName}</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    <FAQSection
                        role={roleName}
                        location={cityName}
                        platform={platformLabel}
                        dynamicFaqs={faqsArr}
                    />
                </div>
            </section>
        </div>
    );
}

/**
 * Precision Skeleton (Boneyard Style)
 * Exact vertical space reservation to achieve 0 CLS.
 */
export function DynamicAiPanelsSkeleton({ roleName, cityName }: { roleName: string, cityName: string }) {
    return (
        <div className="space-y-20 animate-in fade-in duration-1000">
            {/* Reserved space for Insights (~500px) */}
            <div className="max-w-4xl mx-auto h-[500px] bg-slate-100 dark:bg-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col p-10">
                <div className="w-48 h-4 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
                <div className="space-y-4">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-70" />
                    <div className="w-[90%] h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-60" />
                    <div className="w-[95%] h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-50" />
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-40" />
                </div>
                <div className="mt-12 w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="mt-6 space-y-4">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-60" />
                    <div className="w-[85%] h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-50" />
                </div>
            </div>

            {/* Reserved space for FAQ (~600px) */}
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="w-64 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="grid gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-40 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-8">
                            <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
                            <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded opacity-50" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
