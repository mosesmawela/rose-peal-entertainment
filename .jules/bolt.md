
## 2024-03-11 - [Optimize Loop with Constant Extraction]
 **Learning:** Instantiating objects or performing calculations inside map loops (like `new Date().toDateString()`) can cause measurable performance bottlenecks in React renders, leading to redundant work and unnecessary allocations per item.
 **Action:** Extract constants and calculations outside of map loops to cache the value and use it for comparison inside the loop to save CPU cycles and reduce overhead.
