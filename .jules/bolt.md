
## 2026-03-11 - [Optimize AI Knowledge Base Construction]
 **Learning:** Next.js API routes may execute expensive `.map().join()` loops on large data arrays for every incoming request if those arrays are concatenated within the handler function.
 **Action:** Pre-compute and cache expensive static string concatenations (like formatted knowledge base instructions for AI) at the module level (outside the request handler) to reduce CPU load and latency.
