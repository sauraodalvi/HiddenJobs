"use client";

import { Clock, Trash2, ArrowRight } from "lucide-react";
import { useSavedSearches } from "@/hooks/use-saved-searches";
import { useRouter } from "next/navigation";

export function SavedSearches() {
  const { searches, remove } = useSavedSearches();
  const router = useRouter();

  if (searches.length === 0) return null;

  const handleClick = (query: string) => {
    router.push(`/?${query}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Recent Searches
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm group hover:border-primary/50 transition-colors"
          >
            <button
              onClick={() => handleClick(s.query)}
              className="flex items-center gap-1.5"
            >
              <span className="max-w-[200px] truncate">{s.label}</span>
              <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
            <button
              onClick={() => remove(s.id)}
              className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
