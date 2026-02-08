
"use client";

// import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const FREE_SEARCH_LIMIT = 3;

export function useProFeatures() {
    // Auth removed: Everyone is treated as a free user by default for now
    // const { isLoaded, isSignedIn, user } = useUser();

    const isLoaded = true;
    const isPro = true; // Everyone is Pro now
    const user = null;

    const [searchCount, setSearchCount] = useState<number>(0);
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const count = getStorageItem("search_count", 0);
        setSearchCount(Number(count));
        setHasHydrated(true);

        // Listen for storage events to sync across tabs
        const handleStorage = () => {
            const newCount = getStorageItem("search_count", 0);
            setSearchCount(Number(newCount));
        };

        window.addEventListener("local-storage", handleStorage);
        window.addEventListener("storage", handleStorage);
        return () => {
            window.removeEventListener("local-storage", handleStorage);
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    const incrementSearch = () => {
        // Disabled searching tracking for now as it's free
        /*
        const current = getStorageItem("search_count", 0);
        const next = Number(current) + 1;
        setStorageItem("search_count", next);
        setSearchCount(next);
        */
    };

    const searchesLeft = Infinity; // Infinite searches
    const isLimitReached = false; // Never reached

    return {
        isPro,
        isLoaded,
        searchCount,
        searchesLeft,
        isLimitReached,
        incrementSearch,
        isLoading: !isLoaded || !hasHydrated
    };
}
