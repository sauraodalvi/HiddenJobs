
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLE_PRESETS } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDaysAgo = (days: string | number) => {
    const date = new Date();
    date.setDate(date.getDate() - Number(days));
    return date.toISOString().split('T')[0];
};

interface DorkComponents {
    roleQuery: string;
    locationQuery: string;
    excludeArray: string[];
    after: string;
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
}

export const buildDorkComponents = ({
    role,
    customRole,
    isCustomRole,
    location,
    specificLocation,
    exclude,
    time
}: BuildDorkParams): DorkComponents => {
    // Role
    const roleToUse = isCustomRole ? customRole : role;
    const roleQuery = isCustomRole
        ? `"${customRole}"`
        : (ROLE_PRESETS[role] || `"${role}"`); // Fallback to quoted role if not found

    // Location
    let locationQuery = '';
    let locationLabel = 'any location';

    if (location === 'remote') {
        locationQuery = '"remote" OR "work from home" OR "wfh"';
        locationLabel = 'remote';
    } else if (location === 'hybrid') {
        locationQuery = '"hybrid" OR "flexible location"';
        locationLabel = 'hybrid';
    } else if (location === 'onsite') {
        locationQuery = '"on-site" OR "in-office" OR "office-based"';
        locationLabel = 'on-site';
    } else if (location === 'specific' && specificLocation) {
        locationQuery = `"${specificLocation}"`;
        locationLabel = `in ${specificLocation}`;
    }

    // Exclude
    const excludeArray = exclude
        .split(',')
        .map(t => t.trim())
        .filter(t => t)
        .map(t => `-"${t}"`);

    // Time
    const after = time ? `after:${getDaysAgo(time)}` : '';

    const timeLabel = time === '1' ? '24 hours' :
        time === '7' ? 'week' :
            time === '30' ? '30 days' :
                time === '90' ? '3 months' :
                    time === '180' ? '6 months' :
                        time === '365' ? 'year' : `${time} days`;

    const preview = `Searching for "${roleToUse}" ${locationLabel} jobs${excludeArray.length > 0 ? ` excluding: ${excludeArray.join(', ')}` : ''} posted in last ${timeLabel}`;

    return {
        roleQuery,
        locationQuery,
        excludeArray,
        after,
        preview
    };
};

export const assembleDork = (domain: string, components: DorkComponents) => {
    const { roleQuery, locationQuery, excludeArray, after } = components;
    // site:domain role location excludes after
    const parts = [
        `site:${domain}`,
        roleQuery,
        locationQuery,
        ...excludeArray,
        after
    ].filter(Boolean);

    return parts.join(' ');
};
