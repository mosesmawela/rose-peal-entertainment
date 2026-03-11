
## 2026-03-11 - Pre-compute Static Knowledge Base Strings in Chat API
**Learning:** In API routes, repeatedly iterating over constant static arrays (like knowledge base items) to build formatted string contexts on every single request consumes unnecessary CPU cycles and increases response latency.
**Action:** Extract the `Array.map().join()` operations for static data into module-level constants outside the request handler. This ensures the strings are computed only once when the module loads, significantly improving the performance of the request loop.
