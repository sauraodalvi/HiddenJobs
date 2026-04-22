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
            {/* Market Insights Panel */}
            <section className="max-w-4xl mx-auto mt-20 bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white italic opacity-80 uppercase tracking-widest text-xs">Market Insights & Outlook</h2>
                    {source && (
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-primary" />
                            Generated via {source}
                        </span>
                    )}
                </div>
                <div
                    className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: overview || '' }}
                />

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 pointer-events-none" />
            </section>

            {/* AI-Powered FAQ Section */}
            <section className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <HelpCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Technical Intelligence FAQ</h2>
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
