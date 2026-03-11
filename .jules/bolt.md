
## 2023-10-27 - [Optimize Calendar Date Render Loop]
 **Learning:** Instantiating `new Date()` and calling `.toDateString()` inside loops (like calendar cell renderers) causes redundant performance overhead.
 **Action:** Extract `new Date().toDateString()` outside the loop and reference a cached variable (`todayString`) to avoid unnecessary string conversions.
