import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

function getModel() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("[gemini] ERROR: GEMINI_API_KEY is missing from environment variables.");
        return null;
    }

    try {
        if (!genAI) {
            console.log("[gemini] Initializing GoogleGenerativeAI with key...");
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            console.log("[gemini] Model 'gemini-2.0-flash' initialized successfully.");
        }
        return model;
    } catch (error) {
        console.error("[gemini] ERROR during model initialization:", error);
        return null;
    }
}

export async function generateJobCityContent(roleName: string, cityName: string) {
    const currentModel = getModel();
    if (!currentModel) {
        console.warn(`[gemini] Skipping generation for ${roleName} in ${cityName}: Model not initialized.`);
        return null;
    }

    // ... (rest of search/prompt logic)
    const prompt = `
        You are an expert career counselor and SEO strategist. 
        Create a high-quality, engaging overview for a job seeker looking for ${roleName} roles in ${cityName}.
        
        The content should include:
        1. Market Outlook: Why this city is great for this role (e.g. tech hubs, specific industries).
        2. Top Companies/Industries: Mention general sectors or well-known companies likely hiring there.
        3. Salary Expectations: General ranges if known.
        4. Career Growth: Networking opportunities in ${cityName}.
        5. 3 Frequently Asked Questions with short, high-value answers.

        Format the output as JSON with the following structure:
        {
            "aiOverview": "HTML formatted text with <h3> and <p> tags",
            "faqs": [
                { "question": "...?", "answer": "..." }
            ],
            "metaDescription": "A concise 155 character SEO description"
        }
    `;

    try {
        console.log(`[gemini] Calling API for: ${roleName} - ${cityName}`);
        const result = await currentModel.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse Gemini response as JSON");
        console.log(`[gemini] Successfully generated content for ${roleName} in ${cityName}`);
        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("[gemini] API call or parse failure:", error);
        return null;
    }
}
