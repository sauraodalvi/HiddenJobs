
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
        const customRole = getParam('custom', '');
        return {
            role: getParam('role', 'Product Manager'),
            customRole: customRole,
            isCustomRole: !!customRole,
            location: getParam('location', 'remote'),
            specificLocation: getParam('specificLocation', ''),
            exclude: getParam('exclude', ''),
            time: getParam('time', '30'),
        };
    }, [searchParams]);

    const updateFilter = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // Special handling for role modes
        if (key === 'custom' && value) {
            // If setting custom role, clear preset role to avoid confusion (or keep it as fallback?)
            // Actually, spec says: isCustomRole check.
            // If we set 'custom', isCustomRole becomes true.
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    // Derived logic
    const dorkComponents = useMemo(() => buildDorkComponents(filters), [filters]);

    const generateLinks = useCallback((isPro: boolean = false) => {
        const tabLimit = isPro ? 12 : 8;
        const atsToOpen = ATS_PLATFORMS.slice(0, tabLimit);

        return atsToOpen.map(ats => {
            const query = assembleDork(ats.domain, dorkComponents);
            return {
                name: ats.name,
                domain: ats.domain,
                query,
                googleUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                duckduckgoUrl: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
                bingUrl: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
                directUrl: `https://${ats.domain}`
            };
        });
    }, [dorkComponents]);

    return {
        filters,
        updateFilter,
        preview: dorkComponents.preview,
        generateLinks
    };
}
