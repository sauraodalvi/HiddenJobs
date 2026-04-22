import { generateJobCityContent as generateWithGemini } from "./gemini";

interface AiContentResponse {
    aiOverview: string;
    faqs: { question: string; answer: string }[];
    metaDescription: string;
    source: 'groq' | 'gemini' | 'static';
}

/**
 * Tiered AI Content Generation Bridge
 * 1. Groq (Latency-first)
 * 2. Gemini (Context-first fallback)
 * 3. Static Template (Reliability fallback)
 */
export async function generateJobCityContentUnified(roleName: string, cityName: string): Promise<AiContentResponse> {
    console.log(`[ai-bridge] Starting generation for ${roleName} in ${cityName}`);

    // TIER 1: Groq (via SDK or Direct Fetch)
    if (process.env.GROQ_API_KEY) {
        try {
            const start = Date.now();
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert career counselor and SEO strategist. Format output as JSON.'
                        },
                        {
                            role: 'user',
                            content: `Create a high-quality career overview for ${roleName} in ${cityName}. Include Market Outlook, Top Industries, Salary Expectations, and Career Growth. Return JSON with keys: "aiOverview" (HTML formatted text), "faqs" (array of {question, answer}), "metaDescription" (max 155 chars).`
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            });

            if (response.ok) {
                const data = await response.json();
                const content = JSON.parse(data.choices[0].message.content);
                console.log(`[ai-bridge] Groq success in ${Date.now() - start}ms`);
                return { ...content, source: 'groq' };
            }
            console.warn('[ai-bridge] Groq API returned error:', response.status);
        } catch (e) {
            console.error('[ai-bridge] Groq failed:', e);
        }
    }

    // TIER 2: Gemini 1.5 Flash (Fallback)
    if (process.env.GEMINI_API_KEY) {
        try {
            const start = Date.now();
            const geminiData = await generateWithGemini(roleName, cityName);
            if (geminiData) {
                console.log(`[ai-bridge] Gemini success in ${Date.now() - start}ms`);
                return { ...geminiData, source: 'gemini' };
            }
        } catch (e) {
            console.error('[ai-bridge] Gemini failed:', e);
        }
    }

    // TIER 3: Trusted Static Fallback (The "Trusty" fallback)
    console.log('[ai-bridge] Using static fallback');
    return {
        aiOverview: `<h3>Market Outlook for ${roleName} roles in ${cityName}</h3><p>The tech ecosystem in ${cityName} continues to expand, offering significant opportunities for skilled ${roleName} professionals. Industry growth is driven by local innovation hubs and a shift towards distributed high-performance teams.</p><h3>Salary & Growth</h3><p>Competitive compensation packages and a robust network of technical experts make ${cityName} a strategic choice for your next career move.</p>`,
        faqs: [
            { question: `What is the outlook for ${roleName} jobs in ${cityName}?`, answer: `The outlook is positive with increasing demand for experienced professionals.` },
            { question: `Are there remote opportunities?`, answer: `Yes, many companies in ${cityName} now offer hybrid or fully remote options for ${roleName} roles.` },
            { question: `How can I stand out?`, answer: `Focus on ATS-optimized applications and networking within the local ${cityName} tech community.` }
        ],
        metaDescription: `Find unlisted ${roleName} roles in ${cityName}. Access the hidden job market directly from ATS portals.`,
        source: 'static'
    };
}
