
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { buildDorkComponents, assembleDork } from '@/lib/utils';
import { ATS_PLATFORMS } from '@/lib/constants';

export function useSearchFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Helper to get param with default
    const getParam = (key: string, defaultValue: string) => searchParams.get(key) ?? defaultValue;

    // State values derived from URL
    const filters = useMemo(() => {
        const isCustomRole = searchParams.has('custom');
        const customRole = searchParams.get('custom') ?? '';

        return {
            role: getParam('role', 'Product Manager'),
            customRole: customRole,
            isCustomRole: isCustomRole,
            location: getParam('location', 'remote'),
            specificLocation: getParam('specificLocation', ''),
            exclude: getParam('exclude', ''),
            include: getParam('include', ''),
            experience: getParam('experience', ''),
            country: getParam('country', ''),
            time: getParam('time', '30'),
            from: getParam('from', ''),
            to: getParam('to', ''),
            exactTitle: getParam('exact', 'false') === 'true',
            excludeLocation: getParam('excludeLocation', ''),
            // New Power User filters
            company: getParam('company', ''),
            salaryMin: getParam('salaryMin', ''),
            salaryMax: getParam('salaryMax', ''),
            englishOnly: getParam('englishOnly', 'false') === 'true',
        };
    }, [searchParams]);

    const updateFilter = useCallback((key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value !== null && value !== undefined) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    // Batch update helper to avoid race conditions
    const updateFilters = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    // Derived logic
    const dorkComponents = useMemo(() => buildDorkComponents(filters), [filters]);

    const generateLinks = useCallback(() => {
        return ATS_PLATFORMS.map((ats) => {
            const query = assembleDork(ats.domain, dorkComponents);
            return {
                name: ats.name,
                domain: ats.domain,
                query,
                locked: false, // Logic handled in UI
                isPro: ats.isPro, // Pass through
                googleUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                duckduckgoUrl: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
                bingUrl: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
                braveUrl: `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
                yahooUrl: `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`,
                directUrl: `https://${ats.domain}`
            };
        });
    }, [dorkComponents]);

    return {
        filters,
        updateFilter,
        updateFilters,
        preview: dorkComponents.preview,
        generateLinks
    };
}
