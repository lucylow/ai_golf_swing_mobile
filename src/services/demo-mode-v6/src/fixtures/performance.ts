/** Mock domain fixture: performance. */
export interface PerformanceFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PERFORMANCE: PerformanceFixture[] = [
  {
    id: "performance-1",
    title: "Performance scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "performance", "ready"],
  },
  {
    id: "performance-2",
    title: "Performance scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "performance", "loading"],
  },
  {
    id: "performance-3",
    title: "Performance scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "performance", "success"],
  },
  {
    id: "performance-4",
    title: "Performance scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "performance", "warning"],
  },
  {
    id: "performance-5",
    title: "Performance scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "performance", "error"],
  },
  {
    id: "performance-6",
    title: "Performance scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "performance", "empty"],
  },
  {
    id: "performance-7",
    title: "Performance scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "performance", "ready"],
  },
  {
    id: "performance-8",
    title: "Performance scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "performance", "loading"],
  },
  {
    id: "performance-9",
    title: "Performance scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "performance", "success"],
  },
  {
    id: "performance-10",
    title: "Performance scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "performance", "warning"],
  },
  {
    id: "performance-11",
    title: "Performance scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "performance", "error"],
  },
  {
    id: "performance-12",
    title: "Performance scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "performance", "empty"],
  },
  {
    id: "performance-13",
    title: "Performance scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "performance", "ready"],
  },
  {
    id: "performance-14",
    title: "Performance scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "performance", "loading"],
  },
  {
    id: "performance-15",
    title: "Performance scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "performance", "success"],
  },
  {
    id: "performance-16",
    title: "Performance scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for performance; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "performance", "warning"],
  }
];
export function getPerformance(id:string): PerformanceFixture|undefined { return PERFORMANCE.find(item=>item.id===id); }
export function byStatePerformance(state:PerformanceFixture['state']): PerformanceFixture[] { return PERFORMANCE.filter(item=>item.state===state); }
export function featuredPerformance(): PerformanceFixture { return PERFORMANCE[0]; }
export function countPerformance(): number { return PERFORMANCE.length; }
export function summaryPerformance(): string { return `$<built-in function len> fixtures for performance`; }
export const PERFORMANCE_README = "Use performance fixtures for deterministic mock screenshots and scripted demo states.";
export const PERFORMANCE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPerformance(): boolean { return PERFORMANCE.some(item=>item.state==='error'); }
export function hasLoadingPerformance(): boolean { return PERFORMANCE.some(item=>item.state==='loading'); }
export function hasEmptyPerformance(): boolean { return PERFORMANCE.some(item=>item.state==='empty'); }
export function averageScorePerformance(): number { return Math.round(PERFORMANCE.reduce((a,b)=>a+b.score,0)/Math.max(PERFORMANCE.length,1)); }
export function maxScorePerformance(): number { return Math.max(...PERFORMANCE.map(item=>item.score)); }
export function minScorePerformance(): number { return Math.min(...PERFORMANCE.map(item=>item.score)); }
export const PERFORMANCE_VERSION = 'v6';
export const PERFORMANCE_SOURCE = 'demo-only';
export function isDemoOnlyPerformance(): true { return true; }
