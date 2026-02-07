
"use client";

// Safe wrapper for localStorage to avoid hydration mismatch
export const getStorageItem = (key: string, defaultValue: any = null) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn(`Error reading localStorage key "${key}":`, e);
        return defaultValue;
    }
};

export const setStorageItem = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        // Dispatch storage event for cross-tab or same-tab hook sync
        window.dispatchEvent(new Event("local-storage"));
    } catch (e) {
        console.warn(`Error writing localStorage key "${key}":`, e);
    }
};

export const removeStorageItem = (key: string) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new Event("local-storage"));
    } catch (e) {
        console.warn(`Error removing localStorage key "${key}":`, e);
    }
};
