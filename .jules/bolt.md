## 2024-05-18 - Optimized List Rendering with `useMemo`
**Learning:** Found multiple instances where large arrays of data (e.g., `projects` or `artists` on dashboard pages) were filtered directly during render, which can lead to unnecessary re-evaluations and slow down the component when state changes rapidly.
**Action:** Use `useMemo` to cache the filtered results for lists to avoid recalculating them unless the dependencies (`files`, `searchQuery`, or `statusFilter`) have changed.

## 2024-05-18 - Extracted Analytics to avoid deopt
**Learning:** Usage of `useSearchParams` inside an unbounded Suspense wrapper can cause builds to de-opt to client-side rendering only and fail static site generation.
**Action:** Wrap any component calling `useSearchParams` into `<Suspense>` so the page can still be statically generated correctly while evaluating search parameters on the client side at runtime.
