import { useState, useEffect } from "react";

function navigateTo(url: string) {
  if (typeof window !== "undefined") {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      window.location.href = url;
    } else {
      window.history.pushState({}, "", url);
      window.dispatchEvent(new Event("popstate"));
    }
  }
}

export function useRouter() {
  return {
    push: (url: string) => navigateTo(url),
    replace: (url: string) => {
      if (typeof window !== "undefined") {
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
          window.location.href = url;
        } else {
          window.history.replaceState({}, "", url);
          window.dispatchEvent(new Event("popstate"));
        }
      }
    },
    prefetch: () => {},
    back: () => typeof window !== "undefined" && window.history.back(),
    forward: () => typeof window !== "undefined" && window.history.forward(),
  };
}

export function useSearchParams() {
  const [params, setParams] = useState(() =>
    new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return params;
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return pathname;
}

export function notFound() {
  const error = new Error("NEXT_NOT_FOUND");
  (error as any).digest = "NEXT_NOT_FOUND";
  throw error;
}

export function redirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}

export function permanentRedirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
