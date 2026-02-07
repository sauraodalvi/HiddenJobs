// content.js
// The Ghost Writer - DOM Manipulation Layer

// Action Constants
const ACTIONS = {
    SCAN_FORM: 'SCAN_FORM',
    FILL_FORM: 'FILL_FORM',
    OPEN_PANEL: 'OPEN_PANEL'
};

// --- 1. Utilities ---

// Generates a stable ID for elements that lack one
function getStableId(el, index) {
    if (el.id) return el.id;
    if (el.name) return el.name;
    // Inject a tracker
    const ghostId = `ghost_field_${index}`;
    el.setAttribute('data-ghost-id', ghostId);
    return ghostId;
}

// Heuristic to find a label for an input
function findLabel(el) {
    // 0. GOOGLE FORMS SPECIAL MODE (High Priority)
    const isGoogleForms = (window.location.hostname === "docs.google.com" && window.location.pathname.includes("/forms/")) ||
        window.location.hostname.includes("forms.gle");
    if (isGoogleForms) {
        const card = el.closest('[role="listitem"]');
        if (card) {
            const heading = card.querySelector('[role="heading"]');
            if (heading) {
                // Clean " *" from mandatory fields
                return heading.innerText.replace(/\*/g, '').trim();
            }
        }
    }

    // 1. aria-label (Attribute)
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');

    // 1b. aria-labelledby (Reference) - CRITICAL for Google Forms
    if (el.getAttribute('aria-labelledby')) {
        const labelId = el.getAttribute('aria-labelledby');
        const labelEl = document.getElementById(labelId);
        if (labelEl) return labelEl.innerText.trim();
    }

    // 2. <label for="...">
    if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) return label.innerText.trim();
    }

    // 3. Closest parent label (often used in modern generic divs)
    const parentLabel = el.closest('label');
    if (parentLabel) {
        return parentLabel.innerText.replace(el.value, '').trim(); // Remove own value from label text
    }

    // 4. Preceding sibling (Dangerous on Google Forms, so skipped if mode matched above failed)
    // Only use if we aren't inside a listitem card (generic sites)
    if (!el.closest('[role="listitem"]')) {
        let prev = el.previousElementSibling;
        if (prev && (prev.tagName === 'LABEL' || prev.tagName === 'SPAN' || prev.tagName === 'DIV' || prev.tagName === 'P')) {
            return prev.innerText.trim();
        }
    }

    // 5. Parent Text Content (Context Scraping)
    // If we are inside a div that says "First Name <input>", grab "First Name"
    if (el.parentElement) {
        const parentText = el.parentElement.innerText;
        // Simple heuristic: return parent text if it's short (<50 chars)
        if (parentText && parentText.length < 50 && parentText.length > 2) {
            return parentText.replace(el.value, '').trim();
        }
    }

    return null;
}

// Check if field is visible
function isVisible(el) {
    return el.style.display !== 'none' &&
        el.style.visibility !== 'hidden' &&
        el.type !== 'hidden' &&
        el.getBoundingClientRect().height > 0;
}

// --- 2. Core Actions ---

// SCAN
// SCAN
function scanForm() {
    // 1. Inputs (Text, Email, etc) & Selects
    const textInputs = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not([type="submit"]):not([type="hidden"]):not([type="file"]), textarea, select');
    const fieldMap = [];

    textInputs.forEach((el, idx) => {
        if (!isVisible(el)) return;
        const id = getStableId(el, idx);
        let label = findLabel(el);

        // Append Helper Text from Google Forms Card (Context Injection)
        const isGoogleForms = (window.location.hostname === "docs.google.com" && window.location.pathname.includes("/forms/")) ||
            window.location.hostname.includes("forms.gle");
        if (isGoogleForms) {
            const card = el.closest('[role="listitem"]');
            if (card) {
                const desc = card.querySelector('.M7eMe, [id*="desc"], .CbPaxd'); // Common desc classes
                if (desc && desc.innerText) {
                    label += ` (${desc.innerText.trim()})`;
                }
            }
        }

        let options = null;
        if (el.tagName === 'SELECT') {
            options = Array.from(el.options).map(o => o.text.trim()).filter(t => t);
        }

        // VISUAL DEBUGGING
        el.setAttribute('data-ghost-label', label || "UNKNOWN");
        el.title = `[Ghost Detected]: ${label || "UNKNOWN"}`;

        fieldMap.push({
            id: id,
            type: el.type || el.tagName.toLowerCase(),
            label: label || "",
            placeholder: el.placeholder || "",
            name: el.name || "",
            options: options
        });
        console.log(`[Ghost] Scanned Field: ${id} [${label}]`);
    });

    // 2. Radio Groups (Native + ARIA)
    const radioGroups = {};

    // A. Native Radios
    const nativeRadios = document.querySelectorAll('input[type="radio"]');
    nativeRadios.forEach(r => {
        if (!isVisible(r)) return;
        const name = r.name || getStableId(r, 'radio');
        if (!radioGroups[name]) {
            radioGroups[name] = {
                id: name,
                domName: name,
                type: 'radio-group',
                label: findLabel(r),
                options: []
            };
        }
        radioGroups[name].options.push(findLabel(r) || r.value);
    });

    // B. ARIA Radios (Google Forms Style)
    const ariaRadios = document.querySelectorAll('[role="radio"]');
    ariaRadios.forEach((r, idx) => {
        if (!isVisible(r)) return;
        // Group by parent container (the Question Card)
        const card = r.closest('[role="listitem"], [role="radiogroup"]');
        const groupId = card ? getStableId(card, `aria_group_${idx}`) : `aria_group_${idx}`;

        if (!radioGroups[groupId]) {
            // Find Group Label (Question)
            let groupLabel = "Unknown Choice";
            if (card) {
                const heading = card.querySelector('[role="heading"]');
                if (heading) groupLabel = heading.innerText.trim();
            }

            radioGroups[groupId] = {
                id: groupId,
                domName: groupId,
                type: 'radio-group',
                isAria: true, // Flag for fillForm
                label: groupLabel,
                options: []
            };
        }

        // Option Label
        const optionLabel = r.getAttribute('aria-label') || r.innerText || r.getAttribute('data-value');
        radioGroups[groupId].options.push(optionLabel);

        // Tag the element for clicking later
        r.setAttribute('data-ghost-group', groupId);
        r.setAttribute('data-ghost-option', optionLabel);
    });

    Object.values(radioGroups).forEach(group => {
        fieldMap.push(group);
        console.log(`[Ghost] Scanned Radio Group: ${group.id} [${group.label}] Options: ${group.options.join(', ')}`);
    });

    // 3. Checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((el, idx) => {
        if (!isVisible(el)) return;
        const id = getStableId(el, `chk_${idx}`);
        fieldMap.push({
            id: id,
            type: 'checkbox',
            label: findLabel(el),
            options: ['true', 'false']
        });
    });

    console.log(`[Ghost] Scanned ${fieldMap.length} fields.`);
    return fieldMap;
}

// FILL
// React 16+ hack to ensure events trigger state changes
function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value') || {};
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value') || {};

    // If it's a select, we might need to match the specific option value first
    if (element.tagName === 'SELECT') {
        // Find the option text that matches our value
        // The 'value' prompt sent to Gemini asks for the Option TEXT, not value attribute
        for (let i = 0; i < element.options.length; i++) {
            const opt = element.options[i];
            if (opt.text === value || opt.value === value) {
                element.selectedIndex = i;
                break;
            }
        }
    } else {
        // Text / Textarea
        const setter = valueSetter.set || prototypeValueSetter.set;
        if (setter) {
            setter.call(element, value);
        } else {
            element.value = value;
        }
    }

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
}


function fillForm(answers) {
    console.log("[Ghost] Answers received from Gemini:", JSON.stringify(answers));

    Object.entries(answers).forEach(([key, value]) => {
        if (value === "MISSING_INFO" || value === null) return;

        try {
            let el = null;

            // Special: ARIA Radio Groups
            // key matches the groupId we generated
            const ariaRadios = document.querySelectorAll(`[data-ghost-group="${key}"]`);
            if (ariaRadios.length > 0) {
                // Find the one matching the value
                let target = Array.from(ariaRadios).find(r =>
                    r.getAttribute('data-ghost-option') === value ||
                    r.innerText.includes(value)
                );
                if (target) {
                    console.log(`[Ghost] Clicking ARIA Radio: ${value}`);
                    target.scrollIntoView({ block: "center" });
                    target.click();
                    setTimeout(() => target.setAttribute('aria-checked', 'true'), 100);
                }
                return; // Done
            }

            // Strategy 1-4: ID/Name Lookup
            if (!el) el = document.getElementById(key);
            if (!el) el = document.querySelector(`[data-ghost-id="${key}"]`);
            if (!el && document.getElementsByName(key).length > 0) el = document.getElementsByName(key)[0];

            // Strategy 5: Label Text Match (The Nuclear Option)
            if (!el && !key.includes("radio")) { // Skip fuzzy logic for radios to avoid mismatches
                const allLabels = Array.from(document.querySelectorAll('label'));
                const matchingLabel = allLabels.find(l => l.innerText.toLowerCase().includes(key.toLowerCase()));
                if (matchingLabel) {
                    if (matchingLabel.getAttribute('for')) {
                        el = document.getElementById(matchingLabel.getAttribute('for'));
                    } else {
                        el = matchingLabel.querySelector('input, select, textarea');
                    }
                }
            }

            if (el) {
                console.log(`[Ghost] Filling Success: ${key} -> ${value}`);
                el.style.backgroundColor = "#e0f2fe";

                // Text/Select
                if (el.type !== 'radio' && el.type !== 'checkbox') {
                    setNativeValue(el, value);
                }
                // Checkbox
                else if (el.type === 'checkbox') {
                    if ((value === true || value === 'true') && !el.checked) el.click();
                    if ((value === false || value === 'false') && el.checked) el.click();
                }
                // Native Radio
                else if (el.type === 'radio') {
                    // handled by group logic usually, but single radio fallback here
                    el.click();
                }
            }
            // Special Handling for Radio Groups (where 'key' is the group name, not ID)
            else if (document.getElementsByName(key).length > 0) {
                // This is likely a radio group by name
                const radios = document.getElementsByName(key);
                let matchedRadio = null;

                // Find the radio whose value OR label matches the answer
                radios.forEach(r => {
                    const label = findLabel(r) || "";
                    if (label.trim().toLowerCase() === String(value).trim().toLowerCase() ||
                        r.value.trim().toLowerCase() === String(value).trim().toLowerCase()) {
                        matchedRadio = r;
                    }
                });

                if (matchedRadio) {
                    console.log(`[Ghost] Clicking Native Radio: ${key} -> ${value}`);
                    matchedRadio.click();
                }
            }
            else {
                console.warn(`[Ghost] Failed to find field for key: '${key}' - Value: ${value}`);
            }
        } catch (err) {
            console.error(`[Ghost] Error filling ${key}:`, err);
        }
    });
}

console.log("[Ghost] Content Script Loaded & Ready");

// --- 3. Listener ---

// --- 4. Floating UI ---
function injectFloatingButton() {
    if (document.getElementById('ghost-fab')) return;

    const div = document.createElement('div');
    div.id = 'ghost-fab';

    // Get saved position or default to right edge
    const savedPosition = localStorage.getItem('ghost-fab-position') || 'right';
    const savedY = localStorage.getItem('ghost-fab-y') || '50%';

    div.style.cssText = `
        position: fixed; 
        top: ${savedY}; 
        ${savedPosition}: 0px;
        z-index: 2147483647; 
        display: flex; 
        align-items: center; 
        gap: 0px; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        cursor: grab;
        user-select: none;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: translateY(-50%);
    `;

    // More subtle design
    div.innerHTML = `
        <div id="ghost-btn-main" style="
            width: 44px; 
            height: 44px; 
            background: rgba(37, 99, 235, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2); 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            cursor: pointer; 
            font-size: 20px;
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25), 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        ">
            <span style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));">👻</span>
        </div>
    `;

    document.body.appendChild(div);

    const mainBtn = div.querySelector('#ghost-btn-main');
    let isDragging = false;
    let startY = 0;
    let startTop = 0;
    let currentEdge = savedPosition;

    // Drag functionality
    const handleMouseDown = (e) => {
        if (e.target.closest('#ghost-btn-main')) {
            isDragging = true;
            startY = e.clientY;
            const rect = div.getBoundingClientRect();
            startTop = rect.top;
            div.style.cursor = 'grabbing';
            div.style.transition = 'none';
            e.preventDefault();
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const deltaY = e.clientY - startY;
        const newTop = Math.max(22, Math.min(window.innerHeight - 66, startTop + deltaY));
        div.style.top = `${newTop}px`;
        div.style.transform = 'translateY(0)';

        // Check if dragging to opposite edge
        const threshold = window.innerWidth / 3;
        if (currentEdge === 'right' && e.clientX < threshold) {
            // Switching to left
            div.style.right = 'auto';
            div.style.left = '0px';
            currentEdge = 'left';
        } else if (currentEdge === 'left' && e.clientX > window.innerWidth - threshold) {
            // Switching to right
            div.style.left = 'auto';
            div.style.right = '0px';
            currentEdge = 'right';
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            div.style.cursor = 'grab';
            div.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Save position
            localStorage.setItem('ghost-fab-position', currentEdge);
            localStorage.setItem('ghost-fab-y', div.style.top);
        }
    };

    // Touch support for mobile
    const handleTouchStart = (e) => {
        if (e.target.closest('#ghost-btn-main')) {
            isDragging = true;
            startY = e.touches[0].clientY;
            const rect = div.getBoundingClientRect();
            startTop = rect.top;
            div.style.cursor = 'grabbing';
            div.style.transition = 'none';
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const deltaY = touch.clientY - startY;
        const newTop = Math.max(22, Math.min(window.innerHeight - 66, startTop + deltaY));
        div.style.top = `${newTop}px`;
        div.style.transform = 'translateY(0)';

        const threshold = window.innerWidth / 3;
        if (currentEdge === 'right' && touch.clientX < threshold) {
            div.style.right = 'auto';
            div.style.left = '0px';
            currentEdge = 'left';
        } else if (currentEdge === 'left' && touch.clientX > window.innerWidth - threshold) {
            div.style.left = 'auto';
            div.style.right = '0px';
            currentEdge = 'right';
        }

        e.preventDefault();
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            isDragging = false;
            div.style.cursor = 'grab';
            div.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            localStorage.setItem('ghost-fab-position', currentEdge);
            localStorage.setItem('ghost-fab-y', div.style.top);
        }
    };

    // Mouse events
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    // Hover Animation - More subtle
    mainBtn.addEventListener('mouseenter', () => {
        if (!isDragging) {
            mainBtn.style.transform = 'scale(1.08)';
            mainBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4), 0 3px 6px rgba(0,0,0,0.15)';
        }
    });

    mainBtn.addEventListener('mouseleave', () => {
        if (!isDragging) {
            mainBtn.style.transform = 'scale(1)';
            mainBtn.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.25), 0 2px 4px rgba(0,0,0,0.1)';
        }
    });

    // Click Action -> Open Panel
    mainBtn.addEventListener('click', (e) => {
        if (!isDragging) {
            console.log("[Ghost] Requesting Side Panel Open...");
            chrome.runtime.sendMessage({ action: ACTIONS.OPEN_PANEL }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("[Ghost] Msg Error:", chrome.runtime.lastError.message);
                } else if (response && response.error) {
                    console.error("[Ghost] Open Error:", response.error);
                } else {
                    console.log("[Ghost] Open Request Sent.");
                }
            });
        }
    });

    // Double-click to remove
    let clickTimer = null;
    mainBtn.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        if (confirm('Remove Ghost button? (Refresh page to bring it back)')) {
            div.remove();
            console.log("[Ghost] Floating Button Removed.");
        }
    });
}

// Inject on load
injectFloatingButton();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`[Ghost] Received request: ${request.action}`);

    if (request.action === ACTIONS.SCAN_FORM) {
        const fields = scanForm();
        console.log(`[Ghost] Scanned ${fields.length} fields`);
        sendResponse({ fields });
        return false; // Sync response
    }

    if (request.action === ACTIONS.FILL_FORM) {
        fillForm(request.answers);

        // Resume Upload Logic
        if (request.resumeFile) {
            (async () => {
                try {
                    console.log(`[Ghost] Uploading Resume: ${request.resumeFile.name}`);

                    // 1. Find the best file input (Prioritize "resume" in ID/Name)
                    const fileInputs = Array.from(document.querySelectorAll('input[type="file"]'));
                    let targetInput = fileInputs.find(i => (i.id + i.name).toLowerCase().includes('resume'));
                    if (!targetInput && fileInputs.length > 0) targetInput = fileInputs[0]; // Fallback to first

                    if (targetInput) {
                        const res = await fetch(request.resumeFile.data);
                        const blob = await res.blob();
                        const file = new File([blob], request.resumeFile.name, { type: request.resumeFile.type });

                        const dt = new DataTransfer();
                        dt.items.add(file);
                        targetInput.files = dt.files;

                        // React/Framework triggering sequence
                        targetInput.dispatchEvent(new Event('click', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('focus', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('blur', { bubbles: true }));

                        // Visual Feedback (Input itself)
                        targetInput.style.border = "4px solid #22c55e"; // Thick Green
                        console.log("[Ghost] Resume injected into:", targetInput);
                        console.log("[Ghost] Events Dispatched.");

                        // Visual Feedback: Find the visible label/button and text it!
                        const associatedLabel = document.querySelector(`label[for="${targetInput.id}"]`)
                            || targetInput.closest('label')
                            || document.querySelector('.resume-upload-label'); // Lever specific guess

                        if (associatedLabel) {
                            associatedLabel.style.border = "2px solid #22c55e";
                            associatedLabel.textContent = "✅ Ghost Attached Resume";
                            // Also try to find child span
                            const span = associatedLabel.querySelector('span');
                            if (span) span.textContent = "✅ Ghost Attached Resume";
                        }
                        sendResponse({ status: 'done', fileUploaded: true });
                    } else {
                        console.warn("[Ghost] No file input found.");
                        sendResponse({ status: 'done', error: 'No file upload field found on this page' });
                    }
                } catch (e) {
                    console.error("[Ghost] File Upload Failed:", e);
                    sendResponse({ status: 'done', error: e.message });
                }
            })();
            return true; // Async response - keep channel open
        }

        sendResponse({ status: 'done' });
        return false; // Sync response
    }

    return false; // Ignore other messages
});
