// content.js
// The Ghost Writer - DOM Manipulation Layer

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
    // 1. aria-label
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');

    // 2. <label for="...">
    if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) return label.innerText.trim();
    }

    // 3. Closest parent label (often used in modern generic divs)
    const parentLabel = el.closest('label');
    if (parentLabel) {
        // Clone and remove the input itself to get just text
        const clone = parentLabel.cloneNode(true);
        const inputInClone = clone.querySelector('input, select, textarea');
        if (inputInClone) inputInClone.remove();
        return clone.innerText.trim();
    }

    // 4. Preceding sibling (weak signal but useful)
    const prev = el.previousElementSibling;
    if (prev && (prev.tagName === 'LABEL' || prev.tagName === 'SPAN' || prev.tagName === 'DIV')) {
        return prev.innerText.trim();
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
function scanForm() {
    const inputs = document.querySelectorAll('input, textarea, select');
    const fieldMap = [];

    inputs.forEach((el, idx) => {
        // Filter noise
        if (!isVisible(el)) return;
        if (['submit', 'button', 'image', 'reset', 'file'].includes(el.type)) return;

        const id = getStableId(el, idx);
        const label = findLabel(el);

        // Extract options for selects
        let options = null;
        if (el.tagName === 'SELECT') {
            options = Array.from(el.options).map(o => o.text.trim()).filter(t => t);
        }

        fieldMap.push({
            id: id,
            type: el.type || el.tagName.toLowerCase(),
            label: label || "",
            placeholder: el.placeholder || "",
            name: el.name || "",
            options: options
        });
    });

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
    // answers: { "field_id": "value" }
    Object.entries(answers).forEach(([id, value]) => {
        if (value === "MISSING_INFO" || value === null) return;

        // Find element
        let el = document.getElementById(id);
        if (!el) {
            el = document.querySelector(`[data-ghost-id="${id}"]`);
        }
        if (!el && document.getElementsByName(id).length > 0) {
            el = document.getElementsByName(id)[0];
        }

        if (el) {
            // Visual Feedback
            el.style.transition = "all 0.5s";
            el.style.backgroundColor = "#e0f2fe"; // Light blue
            el.style.border = "2px solid #2563eb";

            setNativeValue(el, value);

            // Flash green
            setTimeout(() => {
                el.style.backgroundColor = "#f0fdf4"; // Light green
                el.style.border = "1px solid #22c55e";
            }, 500);
        }
    });
}

// --- 3. Listener ---

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SCAN_FORM') {
        const fields = scanForm();
        sendResponse({ fields });
    }

    if (request.action === 'FILL_FORM') {
        fillForm(request.answers);
        sendResponse({ status: 'done' });
    }

    return true; // Keep channel open
});
