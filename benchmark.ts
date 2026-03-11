import { performance } from 'perf_hooks';

interface MockEvent {
    id: string;
    title: string;
    type: string;
    date: Date;
}

// Generate a large number of events
const numEvents = 10000;
const events: MockEvent[] = [];
const startDate = new Date();
for (let i = 0; i < numEvents; i++) {
    const d = new Date(startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    events.push({
        id: `e${i}`,
        title: `Event ${i}`,
        type: 'Session',
        date: d
    });
}

const days: Date[] = [];
for (let i = 0; i < 35; i++) {
    days.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
}

// Old Method
console.log("Benchmarking Old Method...");
const t0 = performance.now();
let totalFoundOld = 0;
const getEventsForDateOld = (date: Date) => {
    return events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear();
    });
};

for (const day of days) {
    totalFoundOld += getEventsForDateOld(day).length;
}
const t1 = performance.now();
const oldTime = t1 - t0;
console.log(`Old method took ${oldTime.toFixed(2)} ms. Found ${totalFoundOld} events.`);

// New Method
console.log("\nBenchmarking New Method...");
const t2 = performance.now();
const eventsByDate = new Map<string, MockEvent[]>();
events.forEach(event => {
    const dateStr = new Date(event.date).toDateString();
    if (!eventsByDate.has(dateStr)) {
        eventsByDate.set(dateStr, []);
    }
    eventsByDate.get(dateStr)!.push(event);
});

let totalFoundNew = 0;
const getEventsForDateNew = (date: Date) => {
    return eventsByDate.get(date.toDateString()) || [];
};

for (const day of days) {
    totalFoundNew += getEventsForDateNew(day).length;
}
const t3 = performance.now();
const newTime = t3 - t2;
console.log(`New method took ${newTime.toFixed(2)} ms. Found ${totalFoundNew} events.`);

console.log(`\nImprovement: ${(oldTime / newTime).toFixed(2)}x faster`);
