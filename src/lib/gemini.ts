import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

function getModel() {
    if (!process.env.GEMINI_API_KEY) return null;

    if (!genAI) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    return model;
}

export async function generateJobCityContent(roleName: string, cityName: string) {
    const currentModel = getModel();
    if (!currentModel) return null;

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
        const result = await currentModel.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse Gemini response as JSON");
        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return null;
    }
}
