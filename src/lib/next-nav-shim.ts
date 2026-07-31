export function useRouter() {
  return {
    push: (url: string) => { window.location.href = url; },
    replace: (url: string) => { window.location.href = url; },
    prefetch: () => {},
  };
}

export function useSearchParams() {
  return new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
}

export function usePathname() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}
