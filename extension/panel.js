// panel.js

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
const saveBtn = document.getElementById('save-settings');

// Load saved settings
chrome.storage.local.get(['geminiKey', 'resumeText'], (result) => {
    if (result.geminiKey) apiKeyInput.value = result.geminiKey;
    if (result.resumeText) resumeInput.value = result.resumeText;
});

saveBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    const resume = resumeInput.value.trim();

    chrome.storage.local.set({ geminiKey: key, resumeText: resume }, () => {
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
    logContent.innerText += `> ${msg}\n`;
    logContent.scrollTop = logContent.scrollHeight;
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

    // Inject content script if not present (simple check logic or just run executeScript)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        // Once injected, ask for scan
        chrome.tabs.sendMessage(tab.id, { action: 'SCAN_FORM' }, (response) => {
            if (chrome.runtime.lastError) {
                pageStatus.innerText = "Error (Reload Page)";
                return;
            }

            if (response && response.fields) {
                currentFields = response.fields;
                fieldCount.innerText = currentFields.length;
                pageStatus.innerText = "Ready";
                pageStatus.style.color = "green";

                if (currentFields.length > 0) {
                    fillBtn.disabled = false;
                } else {
                    pageStatus.innerText = "No Inputs Found";
                }
            }
        });
    });
}

scanBtn.addEventListener('click', scanPage);

// Auto-scan on load
setTimeout(scanPage, 500);


// 2. Call Gemini & Fill
fillBtn.addEventListener('click', async () => {
    const { geminiKey, resumeText } = await chrome.storage.local.get(['geminiKey', 'resumeText']);

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
            label: f.label || f.placeholder || f.name || "Unknown Field",
            type: f.type,
            options: f.options || [] // For selects
        }));

        const systemPrompt = `You are an expert job application assistant. 
    Using the User's Resume below, fill out the JSON form fields provided.
    
    Rules:
    1. Return strictly valid JSON mapped by field "id".
    2. For 'select' fields, you MUST return the EXACT string from the provided 'options' list that best matches. If none match, return null.
    3. For text fields, extract facts from the resume.
    4. If the resume lacks the info, return "MISSING_INFO".
    5. Do not hallucinate.`;

        const userPrompt = `
    RESUME:
    ${resumeText}

    FORM FIELDS TO FILL (JSON):
    ${JSON.stringify(fieldMap)}

    Return JSON object: { "field_id": "answer" }
    `;

        // B. Call API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt + "\n" + userPrompt }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const rawText = data.candidates[0].content.parts[0].text;
        // Extract JSON from markdown code blocks if present
        const jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const answers = JSON.parse(jsonString);

        log(`Generated ${Object.keys(answers).length} answers.`);

        // C. Send to Content Script
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        chrome.tabs.sendMessage(tab.id, { action: 'FILL_FORM', answers: answers });

        fillBtn.innerText = "✨ Done!";
        setTimeout(() => {
            fillBtn.innerText = "✨ Auto-Fill with Gemini";
            fillBtn.disabled = false;
        }, 3000);

    } catch (e) {
        log(`Error: ${e.message}`);
        alert(`AI Error: ${e.message}`);
        fillBtn.innerText = "Failed";
        fillBtn.disabled = false;
    }
});
