"use client";

import { useState, useEffect, useCallback } from "react";

interface SavedSearch {
  id: string;
  label: string;
  query: string;
  timestamp: number;
}

const STORAGE_KEY = "hiddenjobs-saved-searches";
const MAX_SEARCHES = 10;

export function useSavedSearches() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSearches(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((query: string) => {
    if (!query) return;
    const label = query
      .split("&")[0]
      .replace(/[+]/g, " ")
      .replace(/%20/g, " ")
      .replace(/site%3A\S+?\.\w+%20/gi, "")
      .replace(/after%3A\S+/gi, "")
      .replace(/\(|\)/g, "")
      .replace(/%22/g, "")
      .trim()
      .substring(0, 60);

    setSearches((prev) => {
      const next: SavedSearch[] = [
        { id: Date.now().toString(), label, query, timestamp: Date.now() },
        ...prev.filter((s) => s.query !== query),
      ].slice(0, MAX_SEARCHES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSearches((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { searches, save, remove };
}
