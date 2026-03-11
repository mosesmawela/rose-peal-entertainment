import { performance } from 'perf_hooks';

// Simulate events array
const events = Array.from({ length: 100000 }, (_, i) => ({
  date: new Date(Date.now() + (Math.random() - 0.5) * 10000000000).toISOString()
}));

function testBaseline() {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const upcoming = events.filter(e => new Date(e.date) > new Date()).length;
  }
  const end = performance.now();
  return end - start;
}

function testOptimized() {
  const start = performance.now();
  for (let i = 0; i < 100; i++) {
    const now = new Date();
    const upcoming = events.filter(e => new Date(e.date) > now).length;
  }
  const end = performance.now();
  return end - start;
}

const baselineTime = testBaseline();
console.log(`Baseline time: ${baselineTime.toFixed(2)} ms`);

const optimizedTime = testOptimized();
console.log(`Optimized time: ${optimizedTime.toFixed(2)} ms`);

console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}%`);
