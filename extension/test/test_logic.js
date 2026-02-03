
// Minimal JS DOM Mock
class DOMTokenList {
    constructor() {
        this.list = [];
    }
    add(token) {
        if (!this.list.includes(token)) this.list.push(token);
    }
    remove(token) {
        this.list = this.list.filter(t => t !== token);
    }
    contains(token) {
        return this.list.includes(token);
    }
}

class Event {
    constructor(type, options) {
        this.type = type;
        this.bubbles = options?.bubbles || false;
    }
}

class Element {
    constructor(tagName) {
        this.tagName = tagName.toUpperCase();
        this.attributes = {};
        this.style = { display: 'block', visibility: 'visible', transition: '', backgroundColor: '', border: '' };
        this.classList = new DOMTokenList();
        this.children = [];
        this.parentNode = null;
        this.previousElementSibling = null;
        this.options = [];
        this.value = '';
        this.selectedIndex = -1;
        this.innerText = '';
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
        // Logic for id/name reflection
        if (name === 'id') this.id = value;
        if (name === 'name') this.name = value;
        if (name === 'type') this.type = value;
        if (name === 'placeholder') this.placeholder = value;
        if (name === 'aria-label') this.ariaLabel = value; // mock
    }

    getAttribute(name) {
        return this.attributes[name] || null;
    }

    closest(selector) {
        // Very basic mock for label lookup
        if (selector === 'label' && this.parentNode && this.parentNode.tagName === 'LABEL') {
            return this.parentNode;
        }
        return null; // Simplified
    }

    cloneNode() {
        // Return shallow clone for test
        const el = new Element(this.tagName);
        el.innerText = this.innerText;
        return el;
    }

    querySelector(selector) {
        return null; // Simplified 
    }

    getBoundingClientRect() {
        return { height: 20, width: 100 };
    }

    dispatchEvent(event) {
        console.log(`[DOM] Event dispatched on ${this.id || this.tagName}: ${event.type}`);
    }

    get type() { return this.attributes.type || 'text'; }
    set type(val) { this.attributes.type = val; }

    get id() { return this.attributes.id || ''; }
    set id(val) { this.attributes.id = val; }

    get name() { return this.attributes.name || ''; }
    set name(val) { this.attributes.name = val; }
}

// Global Document Mock
const docElements = [];

const document = {
    querySelectorAll: (selector) => {
        // Return inputs
        return docElements.filter(el => ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
    },
    getElementById: (id) => {
        return docElements.find(el => el.id === id);
    },
    getElementsByName: (name) => {
        return docElements.filter(el => el.name === name);
    },
    querySelector: (selector) => {
        if (selector.startsWith('label[for=')) {
            const id = selector.match(/for="([^"]+)"/)[1];
            // Find label in docElements
            return docElements.find(el => el.tagName === 'LABEL' && el.attributes.for === id);
        }
        if (selector.includes('data-ghost-id')) {
            const id = selector.match(/data-ghost-id="([^"]+)"/)[1];
            return docElements.find(el => el.attributes['data-ghost-id'] === id);
        }
        return null;
    },
    createElement: (tag) => new Element(tag)
};

const chrome = {
    runtime: {
        onMessage: {
            addListener: () => { }
        }
    }
};

global.document = document;
global.Event = Event;
global.chrome = chrome;
global.Object = Object; // Ensure we use native Object

// --- PASTE CONTENT.JS LOGIC HERE ---
// (Copying functions from file content directly)

function getStableId(el, index) {
    if (el.id) return el.id;
    if (el.name) return el.name;
    const ghostId = `ghost_field_${index}`;
    el.setAttribute('data-ghost-id', ghostId);
    return ghostId;
}

function findLabel(el) {
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
    if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) return label.innerText.trim();
    }
    const parentLabel = el.closest('label');
    if (parentLabel) return parentLabel.innerText.trim(); // Simplified clone logic
    return null;
}

function isVisible(el) {
    // Mock visibility
    return true;
}

function scanForm() {
    const inputs = document.querySelectorAll('input, textarea, select');
    const fieldMap = [];

    inputs.forEach((el, idx) => {
        if (!isVisible(el)) return;
        if (['submit', 'button', 'image', 'reset', 'file'].includes(el.type)) return;

        const id = getStableId(el, idx);
        const label = findLabel(el);

        let options = null;
        if (el.tagName === 'SELECT') {
            options = el.options.map(o => o.text);
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

function setNativeValue(element, value) {
    // In our mock, we just direct set
    // But we log the loop for selects
    if (element.tagName === 'SELECT') {
        // Mock select logic
        console.log(`[DOM] Setting SELECT ${element.id} to option matching '${value}'`);
        element.value = value; // Simple mock
    } else {
        console.log(`[DOM] Setting INPUT ${element.id} to '${value}'`);
        element.value = value;
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
}

function fillForm(answers) {
    Object.entries(answers).forEach(([id, value]) => {
        if (value === "MISSING_INFO" || value === null) return;
        let el = document.getElementById(id);
        if (!el) el = document.querySelector(`[data-ghost-id="${id}"]`);
        if (!el && document.getElementsByName(id).length > 0) el = document.getElementsByName(id)[0];

        if (el) {
            setNativeValue(el, value);
        } else {
            console.log(`[WARN] Could not find element ${id}`);
        }
    });
}


// --- TEST RUNNER ---

console.log("--- Starting Extension Logic Test (Mock DOM) ---");

// 1. Setup Mock DOM (Simulating the HTML Page)
const firstName = new Element('input');
firstName.id = 'first_name';
firstName.type = 'text';

const firstNameLabel = new Element('label');
firstNameLabel.setAttribute('for', 'first_name');
firstNameLabel.innerText = 'First Name';

const email = new Element('input');
email.id = 'email';
email.type = 'email';
// No label for email, let's see if it survives or is unlabeled

const linkedIn = new Element('input');
linkedIn.name = 'urls[linkedin]';
linkedIn.type = 'text';
const linkedInLabel = new Element('label');
linkedInLabel.innerText = 'LinkedIn Profile';
linkedIn.parentNode = linkedInLabel; // Nested label

const source = new Element('select');
source.id = 'source';
source.options = [{ text: 'Select...' }, { text: 'LinkedIn' }, { text: 'Glassdoor' }];
const sourceLabel = new Element('label');
sourceLabel.setAttribute('for', 'source');
sourceLabel.innerText = 'How did you hear about us?';

// Add to doc
docElements.push(firstName, firstNameLabel, email, linkedIn, linkedInLabel, source, sourceLabel);

// 2. Test Scan
console.log("\n[TEST] scanning form...");
const fields = scanForm();
console.log("Fields Found:", JSON.stringify(fields, null, 2));

if (fields.length !== 4) { // firstName, email, linkedIn, source
    console.error(`FAILED: Expected 4 fields, found ${fields.length}`);
} else {
    console.log("PASSED: Field count correct.");
}

// 3. Test Fill
console.log("\n[TEST] filling form...");
const answers = {
    "first_name": "Saurabh",
    "email": "saurabh@example.com",
    "urls[linkedin]": "linkedin.com/in/saurabh", // Name-based fill
    "source": "LinkedIn" // Select fill
};

fillForm(answers);

// 4. Verify Values
if (firstName.value === "Saurabh") console.log("PASSED: First Name filled.");
else console.error("FAILED: First Name value mismatch");

if (email.value === "saurabh@example.com") console.log("PASSED: Email filled.");
else console.error("FAILED: Email value mismatch");

if (linkedIn.value === "linkedin.com/in/saurabh") console.log("PASSED: LinkedIn filled (via name).");
else console.error("FAILED: LinkedIn value mismatch");

if (source.value === "LinkedIn") console.log("PASSED: Source matched.");
else console.error("FAILED: Source value mismatch");

console.log("\n--- Test Complete ---");
