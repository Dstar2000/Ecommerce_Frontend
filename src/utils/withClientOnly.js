import dynamic from "next/dynamic";
import React from "react";

/**
 * Wraps a component with dynamic import and ssr: false
 * Use this for components that use React Query or other browser-only APIs
 * @param importFn - Import function: () => import("@/path/to/component")
 * @param loadingFallback - React component to show while loading
 */
export function withClientOnly(importFn, loadingFallback = <div>Loading...</div>) {
  return dynamic(importFn, {
    ssr: false,
    loading: () => loadingFallback,
  });
}
