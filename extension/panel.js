// panel.js

// Action Constants
const ACTIONS = {
    SCAN_FORM: 'SCAN_FORM',
    FILL_FORM: 'FILL_FORM',
    OPEN_PANEL: 'OPEN_PANEL'
};

// --- UI Logic ---
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.getElementById('settings-view').classList.toggle('hidden', tab.dataset.tab !== 'settings');
        document.getElementById('apply-view').classList.toggle('hidden', tab.dataset.tab !== 'apply');
    });
});

// --- Settings Logic ---
const apiKeyInput = document.getElementById('api-key');
const resumeInput = document.getElementById('resume-text');
const resumeUrlInput = document.getElementById('resume-url');
const salaryInput = document.getElementById('user-salary');
const nameInput = document.getElementById('user-name');
const saveBtn = document.getElementById('save-settings');

// Load saved settings
chrome.storage.local.get(['geminiKey', 'resumeText', 'resumeUrl', 'userSalary', 'userName'], (result) => {
    if (result.geminiKey) apiKeyInput.value = result.geminiKey;
    if (result.resumeText) resumeInput.value = result.resumeText;
    if (result.resumeUrl) resumeUrlInput.value = result.resumeUrl;
    if (result.userSalary) salaryInput.value = result.userSalary;
    if (result.userName) nameInput.value = result.userName;
});

saveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    const resume = resumeInput.value.trim();
    const resumeUrl = resumeUrlInput.value.trim();
    const userSalary = salaryInput.value.trim();
    const userName = nameInput.value.trim();

    chrome.storage.local.set({ geminiKey: key, resumeText: resume, resumeUrl, userSalary, userName }, () => {
        saveBtn.innerText = "Saved!";
        setTimeout(() => saveBtn.innerText = "Save Configuration", 2000);
    });
});

// --- Application Logic ---
const scanBtn = document.getElementById('scan-btn');
const fillBtn = document.getElementById('fill-btn');
const pageStatus = document.getElementById('page-status');
const fieldCount = document.getElementById('field-count');
const logArea = document.getElementById('ai-logs');
const logContent = document.getElementById('log-content');

let currentFields = [];

function log(msg) {
    logArea.classList.remove('hidden');
    logContent.textContent += `> ${msg}\n`;
    logContent.scrollTop = logContent.scrollHeight;
}

// Sanitize input to prevent prompt injection
function sanitizeInput(text) {
    if (!text) return '';
    // Remove potential prompt injection markers and markdown code blocks
    return text
        .replace(/```/g, '')
        .replace(/SYSTEM:/gi, '')
        .replace(/ASSISTANT:/gi, '')
        .replace(/USER:/gi, '')
        .trim();
}

// Fetch with timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - please try again');
        }
        throw error;
    }
}

// 1. Scan the page
async function scanPage() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab) return;

    // Check if we can inject
    if (!tab.url.startsWith('http')) {
        pageStatus.innerText = "Restricted Page";
        pageStatus.style.color = "red";
        return;
    }

    // Handler for processing scan response
    const handleScanResponse = (response) => {
        if (chrome.runtime.lastError) {
            pageStatus.innerText = "Error (Reload Page)";
            log(`Scan Error: ${chrome.runtime.lastError.message}`);
            return;
        }

        if (response && response.fields) {
            currentFields = response.fields;
            fieldCount.innerText = currentFields.length;
            pageStatus.innerText = "Ready";
            pageStatus.style.color = "green";

            if (currentFields.length > 0) {
                fillBtn.disabled = false;
                // Verbose UI Log
                log(`Scan Complete. Found ${currentFields.length} fields.`);
                currentFields.slice(0, 5).forEach(f => {
                    let display = f.label;
                    if (f.placeholder && f.placeholder !== f.label) display += ` (${f.placeholder})`;
                    log(`- [${f.id}]: ${display.substring(0, 30)}...`);
                });
                if (currentFields.length > 5) log(`... and ${currentFields.length - 5} more.`);
            } else {
                pageStatus.innerText = "No Inputs Found";
            }
        }
    };

    // Try sending message first (script may already be loaded)
    chrome.tabs.sendMessage(tab.id, { action: ACTIONS.SCAN_FORM }, (response) => {
        if (chrome.runtime.lastError) {
            // Script not loaded, inject it once
            log("Content script not loaded, injecting...");
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            }, () => {
                if (chrome.runtime.lastError) {
                    pageStatus.innerText = "Injection Failed";
                    log(`Injection Error: ${chrome.runtime.lastError.message}`);
                    return;
                }
                // Retry message after injection
                setTimeout(() => {
                    chrome.tabs.sendMessage(tab.id, { action: ACTIONS.SCAN_FORM }, handleScanResponse);
                }, 100);
            });
        } else {
            // Script already loaded, process response
            handleScanResponse(response);
        }
    });
}

scanBtn.addEventListener('click', scanPage);

// Auto-scan on load
setTimeout(scanPage, 500);


// 2. Call Gemini & Fill
fillBtn.addEventListener('click', async () => {
    const { geminiKey, resumeText, resumeUrl, userSalary, userName } = await chrome.storage.local.get(['geminiKey', 'resumeText', 'resumeUrl', 'userSalary', 'userName']);

    if (!geminiKey || !resumeText) {
        alert("Please configure API Key and Resume in Settings tab first!");
        return;
    }

    fillBtn.disabled = true;
    fillBtn.innerText = "Thinking...";
    log("Starting Gemini Analysis...");

    try {
        // A. Prepare the Prompt
        // We send a simplified map of fields to save tokens
        const fieldMap = currentFields.map(f => ({
            id: f.id,
            label: `${f.label || ""} ${f.placeholder || ""}`.trim() || f.name || "Unknown Field",
            type: f.type,
            options: f.options || [] // For selects
        }));

        const systemPrompt = `You are a smart auto-filler.
    Based on the Resume, answer the form questions.

            Rules:
        1. ** Format **: JSON { "id": "answer" }.
        2. ** Dropdowns / Radios **: Must match one of the provided 'options' exactly.
       - "How did you hear?": Default to 'LinkedIn' or 'Job Board'.
       - "Gender/Race": Default 'Prefer not to say' if unsure.
    3. ** Short Text Fields **: Keep answers SHORT(under 10 words) unless it's a "Cover Letter" or "Description".
            - Example: Label "Adtech" -> Answer: "Yes" or "5 years experience", NOT a paragraph.
    4. ** Cover Letter / Add'l Info**: Use the Summary + Key Achievements (Bullet points).
        5. **CTC / Salary**: If asked for "Current" or "Expected CTC", provide a realistic number (e.g. "1200000" or "12") based on market standards if not in resume. Do not leave blank.
    6. **Unknowns**: If a field label is confusing, treat it as "Do you have experience in X?" -> "Yes...".`;

        const userPrompt = `
        RESUME:
    ${sanitizeInput(resumeText)}

    USER FACTS:
    Current Salary: ${sanitizeInput(userSalary) || "Not specified"}
    Full Name: ${sanitizeInput(userName) || "Not specified"}

    FORM FIELDS TO FILL(JSON):
    ${JSON.stringify(fieldMap)}

    Return JSON object: { "field_id": "answer" }
        `;

        // B. Call API
        // B. Dynamic Model Discovery (Robustness Fix)
        const getBestModel = async (key) => {
            try {
                const listResp = await fetchWithTimeout(
                    `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`,
                    {},
                    10000 // 10s timeout for model list
                );
                const listData = await listResp.json();

                if (listData.error) throw new Error(listData.error.message);
                if (!listData.models) throw new Error("No models returned by API.");

                // Filter for models that support generateContent
                const candidates = listData.models.filter(m =>
                    m.supportedGenerationMethods &&
                    m.supportedGenerationMethods.includes("generateContent")
                );

                if (candidates.length === 0) throw new Error("No compatible text-generation models found.");

                // Priority: Flash > Pro > 1.5 > Others
                const preferred = candidates.find(m => m.name.includes("flash")) ||
                    candidates.find(m => m.name.includes("pro")) ||
                    candidates[0];

                // Returns full resource name, e.g. "models/gemini-1.5-flash"
                return preferred.name;
            } catch (e) {
                log(`Model listing failed: ${e.message}. Using fallback model.`);
                // Use specific version instead of 'latest' for stability
                return "models/gemini-1.5-flash-002";
            }
        };

        const modelName = await getBestModel(geminiKey);
        log(`Using Model: ${modelName}`);

        // C. Call API with discovered model
        const cleanModelName = modelName.replace("models/", "");

        const response = await fetchWithTimeout(
            `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelName}:generateContent?key=${geminiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt + "\n" + userPrompt }] }]
                })
            },
            45000 // 45s timeout for AI generation
        );

        const apiData = await response.json();

        if (apiData.error) {
            throw new Error(apiData.error.message);
        }

        const rawText = apiData.candidates[0].content.parts[0].text;
        // Extract JSON from markdown code blocks if present
        const jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const answers = JSON.parse(jsonString);

        log(`Generated ${Object.keys(answers).length} answers.`);

        // Prepare Resume File (if available)
        let resumeFile = null;
        if (resumeUrl) {
            // Validate URL format
            if (!resumeUrl.startsWith('http://') && !resumeUrl.startsWith('https://')) {
                log('Warning: Resume URL should start with http:// or https://');
            } else if (!resumeUrl.toLowerCase().endsWith('.pdf')) {
                log('Warning: Resume URL should point to a .pdf file');
            } else {
                try {
                    log(`Fetching Resume from ${resumeUrl}...`);
                    const fetchResponse = await fetchWithTimeout(resumeUrl, {}, 15000); // 15s timeout
                    if (!fetchResponse.ok) {
                        throw new Error(`HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`);
                    }
                    const blob = await fetchResponse.blob();
                    const reader = new FileReader();
                    resumeFile = await new Promise(resolve => {
                        reader.onloadend = () => resolve({
                            name: "Resume.pdf",
                            type: blob.type,
                            data: reader.result // Data URL
                        });
                        reader.readAsDataURL(blob);
                    });
                    log("Resume fetched successfully.");
                } catch (e) {
                    log("Failed to fetch resume: " + e.message);
                }
            }
        }

        // D. Send to Content Script
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        chrome.tabs.sendMessage(tab.id, {
            action: ACTIONS.FILL_FORM,
            answers: answers,
            resumeFile: resumeFile
        }, (response) => {
            log("Form filling initiated.");
        });

        fillBtn.innerText = "✨ Done!";
        setTimeout(() => {
            fillBtn.innerText = "✨ Auto-Fill with Gemini";
            fillBtn.disabled = false;
        }, 3000);

    } catch (e) {
        log(`Error: ${e.message}`);
        console.error(e); // Allow user to see in console
        alert(`AI Error: ${e.message}`);
        fillBtn.innerText = "Failed";
        fillBtn.disabled = false;
    }
});
