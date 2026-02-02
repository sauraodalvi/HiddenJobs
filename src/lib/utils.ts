
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLE_PRESETS, SENIORITY_MAPPINGS, COUNTRY_MAPPINGS, ENGLISH_KEYWORDS } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDaysAgo = (days: string | number) => {
    try {
        // Safety check: if days is 'custom', return current date or handle upstream
        if (days === 'custom' || isNaN(Number(days))) return new Date().toISOString().split('T')[0];

        // Google 'after:' is inclusive of the date provided. 
        // to get "past 24h", we ideally want yesterday's date.
        const date = new Date();
        date.setDate(date.getDate() - Number(days));
        return date.toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
};

/**
 * Smart Quote Logic
 * If the user types operators like OR, AND, or uses quotes/parentheses, we trust them (Raw mode).
 * Otherwise, we treat it as a phrase and wrap in quotes.
 */
const smartQuote = (input: string): string => {
    if (!input) return '';
    const trimmed = input.trim();

    // Check for advanced syntax
    const hasOperators = /\b(OR|AND|\|)\b/.test(trimmed);
    const hasQuotes = /["']/.test(trimmed);
    const hasParens = /[()]/.test(trimmed);
    const hasSiteOps = /\b(site:|inurl:|intitle:)\b/.test(trimmed);

    if (hasOperators || hasQuotes || hasParens || hasSiteOps) {
        return trimmed; // Return raw
    }

    return `"${trimmed}"`; // Wrap as phrase
};

/**
 * Smart Country Logic
 * Maps codes (UK, CA, DE) or names to keyword groups.
 */
const smartCountry = (input: string): string => {
    if (!input) return '';
    const lower = input.trim().toLowerCase().replace(/^\./, ''); // remove leading dot if user typed .uk

    if (COUNTRY_MAPPINGS[lower]) {
        return `(${COUNTRY_MAPPINGS[lower]})`;
    }

    // Fallback: Smart phrase it
    return smartQuote(input);
};

interface DorkComponents {
    roleQuery: string;
    keywordsQuery: string; // Combined location + includes + country + salary + company
    excludeQuery: string;
    timeQuery: string;
    preview: string;
}

interface BuildDorkParams {
    role: string;
    customRole: string;
    isCustomRole: boolean;
    location: string;
    specificLocation: string;
    exclude: string;
    time: string;
    from?: string;
    to?: string;
    include?: string;
    experience?: string;
    country?: string;
    exactTitle?: boolean;
    excludeLocation?: string;
    company?: string;
    salaryMin?: string;
    salaryMax?: string;
    englishOnly?: boolean;
}

export const buildDorkComponents = ({
    role,
    customRole,
    isCustomRole,
    location,
    specificLocation,
    exclude,
    time,
    from,
    to,
    ...props
}: BuildDorkParams): DorkComponents => {

    // --- 1. Role Logic ---
    let roleQuery = '';
    const roleToUse = isCustomRole ? customRole : role;

    if (isCustomRole) {
        roleQuery = smartQuote(customRole);
    } else {
        // Presets are already optimized dork strings
        roleQuery = ROLE_PRESETS[role] || `"${role}"`;
    }

    // --- 2. Location & Country Logic ---
    const locationParts: string[] = [];

    // Base Location
    if (location === 'remote') {
        locationParts.push('("remote" OR "work from home" OR "wfh" OR "anywhere")');
    } else if (location === 'hybrid') {
        locationParts.push('("hybrid" OR "flexible" OR "return to office")'); // 'return to office' is often in text for hybrid
    } else if (location === 'onsite') {
        locationParts.push('("on-site" OR "office-based" OR "in-office" -remote)'); // Excluding remote helps
    } else if (location === 'specific' && specificLocation) {
        // Use smartCountry here too! If they type "UK" in the city box, treating it as a country is helpful.
        locationParts.push(smartCountry(specificLocation));
    }

    // Country Filter
    if (props.country) {
        locationParts.push(smartCountry(props.country));
    }

    // --- 3. Includes & Keywords ---
    const includeArray = (props.include || '')
        .split(',')
        .map(t => smartQuote(t))
        .filter(Boolean);

    // --- 4. Experience Level ---
    let experienceQuery = '';
    const exp = (props.experience || '').toLowerCase();

    // Explicit exclusions/inclusions based on level
    if (exp === 'intern') experienceQuery = '("Intern" OR "Internship" OR "Co-op")';
    else if (exp === 'junior') experienceQuery = '("Junior" OR "Jr" OR "Entry Level" OR "Graduate")';
    else if (exp === 'mid') experienceQuery = '("Mid-level" OR "Mid Level" OR "Associate")';
    else if (exp === 'senior') experienceQuery = '("Senior" OR "Sr" OR "Lead" OR "Experienced")';
    else if (exp === 'staff') experienceQuery = '("Staff" OR "Principal" OR "Distinguished")';
    else if (exp === 'manager') experienceQuery = '("Manager" OR "Head" OR "Director" OR "VP")';

    // --- 5. Company & Salary (Power Features) ---
    let companyQuery = '';
    if (props.company) {
        companyQuery = `intitle:"${props.company}"`;
    }

    let salaryQuery = '';
    if (props.salaryMin || props.salaryMax) {
        const min = props.salaryMin || '1';
        const max = props.salaryMax || '999999';
        // Check if both are digits, if so use num..num
        const isMinNum = /^\d+$/.test(min.replace(/[,.kK]/g, ''));
        const isMaxNum = /^\d+$/.test(max.replace(/[,.kK]/g, ''));

        if (isMinNum && isMaxNum) {
            salaryQuery = `"${min}..${max}"`;
        } else {
            salaryQuery = `"${min}".."${max}"`;
        }
    }

    // --- 5b. Language Filter ---
    let languageQuery = '';
    if (props.englishOnly) {
        languageQuery = ENGLISH_KEYWORDS.include;
    }

    // Combine all "Must Haves" into the keyword block
    const keywordsQuery = [
        ...locationParts,
        ...includeArray,
        experienceQuery,
        companyQuery,
        salaryQuery,
        languageQuery
    ].filter(Boolean).join(' ');


    // --- 6. Exclusions (The tricky part) ---
    const excludeParts: string[] = [];

    // A. User Defined Exclusions
    if (exclude) {
        // Split by comma is safest for user intent
        exclude.split(',').forEach(term => {
            const t = term.trim();
            if (!t) return;
            // If user typed "Senior C++", we normally want to exclude that exact phrase
            excludeParts.push(`-"${t}"`);
        });
    }

    // B. Location Exclusions
    if (props.excludeLocation) {
        props.excludeLocation.split(',').forEach(term => {
            const t = term.trim();
            if (!t) return;
            excludeParts.push(`-"${t}"`);
        });
    }

    // C. Exact Title Logic (Anti-Seniority)
    if (props.exactTitle) {
        // We want to exclude levels that are NOT in the user's role.
        // e.g. Role: "Sr Product Manager" -> Don't exclude "Senior".

        const currentTitleLower = roleToUse.toLowerCase();

        // Check standard levels
        const levels = ['senior', 'manager', 'director', 'intern', 'staff', 'principal', 'head', 'junior', 'lead', 'associate'];

        levels.forEach(level => {
            // 1. Is this level present in the query?
            if (currentTitleLower.includes(level)) return; // Don't exclude if present

            // 2. Is a SYNONYM present? (the fix)
            const synonyms = SENIORITY_MAPPINGS[level] || [];
            if (synonyms.some(syn => currentTitleLower.includes(syn))) return; // Don't exclude if synonym present

            // 3. Exclude it
            excludeParts.push(`-"${level}"`);
        });
    }

    // D. English Only Exclusions
    if (props.englishOnly) {
        excludeParts.push(ENGLISH_KEYWORDS.exclude);
    }

    const excludeQuery = excludeParts.join(' ');


    // --- 6. Time Logic ---
    let timeQuery = '';
    let timeLabel = '';

    if (time === 'custom') {
        const after = from ? `after:${from}` : '';
        const before = to ? `before:${to}` : '';
        timeQuery = `${after} ${before}`.trim();
        timeLabel = `Custom`;
    } else {
        // Logic: after:YYYY-MM-DD
        const days = Number(time || '30');
        // If 0.5 (12 hours) -> use today (0 days ago)
        const checkDays = days < 1 ? 0 : days;

        const dateString = getDaysAgo(checkDays);
        timeQuery = `after:${dateString}`;

        timeLabel = days < 1 ? '12h' : `${days}d`;
    }

    // --- Preview String ---
    const preview = `Searching for ${roleToUse} + ${location === 'specific' ? specificLocation : location} ` +
        `${props.country ? `in ${props.country} ` : ''}` +
        `${props.company ? `at ${props.company} ` : ''}` +
        `${excludeParts.length} exclusions • ${timeLabel}`;

    return {
        roleQuery,
        keywordsQuery,
        excludeQuery,
        timeQuery,
        preview
    };
};

export const assembleDork = (domain: string, components: DorkComponents) => {
    const { roleQuery, keywordsQuery, excludeQuery, timeQuery } = components;

    // Order matters for Google Dorks:
    // site:domain KEYWORDS ... EXCLUSIONS ... TIME

    // Optimization: Add intitle: for the role? 
    // Usually "intitle:" is too restrictive for some ATS that put "Job Application for..." in title.
    // But it's very high signal. For now, we stick to body search for max recall.

    const parts = [
        `site:${domain}`,
        roleQuery,
        keywordsQuery,
        excludeQuery,
        timeQuery
    ].filter(Boolean);

    return parts.join(' ');
};
