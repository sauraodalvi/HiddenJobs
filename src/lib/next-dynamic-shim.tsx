import React, { lazy, Suspense } from "react";

export default function dynamic<T = {}>(
  loadFn: () => Promise<any>,
  options: { ssr?: boolean; loading?: React.ComponentType } = {}
) {
  const LazyComponent = lazy(async () => {
    const mod = await loadFn();
    if (mod && mod.default) {
      return mod;
    }
    return { default: mod };
  });

  const LoadingComp = options.loading || (() => null);

  return function DynamicWrapper(props: T) {
    return (
      <Suspense fallback={<LoadingComp />}>
        <LazyComponent {...(props as any)} />
      </Suspense>
    );
  };
}
