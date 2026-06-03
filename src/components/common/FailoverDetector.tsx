"use client";

import { useEffect } from "react";

const FALLBACK_SITES = [
  "https://hiddenjobs.vercel.app",
  "https://hiddenjobs.netlify.app",
];

export function FailoverDetector() {
  useEffect(() => {
    const fallback = process.env.NEXT_PUBLIC_FALLBACK_URL;
    const current = window.location.origin;
    let tried = 0;

    const check = async () => {
      try {
        const res = await fetch("/api/health", { signal: AbortSignal.timeout(5000) });
        if (res.ok) return;
      } catch {}

      if (fallback && fallback !== current) {
        window.location.href = fallback + window.location.pathname + window.location.search;
        return;
      }

      const candidates = FALLBACK_SITES.filter((s) => s !== current);
      if (tried < candidates.length) {
        window.location.href = candidates[tried] + window.location.pathname + window.location.search;
        tried++;
      }
    };

    const timer = setTimeout(check, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
