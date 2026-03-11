const numEvents = 1000000;
const events = Array.from({ length: numEvents }).map(() => ({
  date: new Date(Date.now() + (Math.random() - 0.5) * 10000000000).toISOString()
}));

console.log(`Benchmarking with ${numEvents} events...`);

// Baseline
console.time('Baseline');
const baselineCount = events.filter(e => new Date(e.date) > new Date()).length;
console.timeEnd('Baseline');

// Optimized
console.time('Optimized');
const now = new Date();
const optimizedCount = events.filter(e => new Date(e.date) > now).length;
console.timeEnd('Optimized');

console.log(`Results match: ${baselineCount === optimizedCount}`);
