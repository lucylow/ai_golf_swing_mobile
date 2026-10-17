/** Mock domain fixture: metrics. */
export interface MetricsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const METRICS: MetricsFixture[] = [
  {
    id: "metrics-1",
    title: "Metrics scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "metrics", "ready"],
  },
  {
    id: "metrics-2",
    title: "Metrics scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "metrics", "loading"],
  },
  {
    id: "metrics-3",
    title: "Metrics scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "metrics", "success"],
  },
  {
    id: "metrics-4",
    title: "Metrics scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "metrics", "warning"],
  },
  {
    id: "metrics-5",
    title: "Metrics scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "metrics", "error"],
  },
  {
    id: "metrics-6",
    title: "Metrics scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "metrics", "empty"],
  },
  {
    id: "metrics-7",
    title: "Metrics scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "metrics", "ready"],
  },
  {
    id: "metrics-8",
    title: "Metrics scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "metrics", "loading"],
  },
  {
    id: "metrics-9",
    title: "Metrics scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "metrics", "success"],
  },
  {
    id: "metrics-10",
    title: "Metrics scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "metrics", "warning"],
  },
  {
    id: "metrics-11",
    title: "Metrics scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "metrics", "error"],
  },
  {
    id: "metrics-12",
    title: "Metrics scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "metrics", "empty"],
  },
  {
    id: "metrics-13",
    title: "Metrics scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "metrics", "ready"],
  },
  {
    id: "metrics-14",
    title: "Metrics scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "metrics", "loading"],
  },
  {
    id: "metrics-15",
    title: "Metrics scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "metrics", "success"],
  },
  {
    id: "metrics-16",
    title: "Metrics scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for metrics; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "metrics", "warning"],
  }
];
export function getMetrics(id:string): MetricsFixture|undefined { return METRICS.find(item=>item.id===id); }
export function byStateMetrics(state:MetricsFixture['state']): MetricsFixture[] { return METRICS.filter(item=>item.state===state); }
export function featuredMetrics(): MetricsFixture { return METRICS[0]; }
export function countMetrics(): number { return METRICS.length; }
export function summaryMetrics(): string { return `$<built-in function len> fixtures for metrics`; }
export const METRICS_README = "Use metrics fixtures for deterministic mock screenshots and scripted demo states.";
export const METRICS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorMetrics(): boolean { return METRICS.some(item=>item.state==='error'); }
export function hasLoadingMetrics(): boolean { return METRICS.some(item=>item.state==='loading'); }
export function hasEmptyMetrics(): boolean { return METRICS.some(item=>item.state==='empty'); }
export function averageScoreMetrics(): number { return Math.round(METRICS.reduce((a,b)=>a+b.score,0)/Math.max(METRICS.length,1)); }
export function maxScoreMetrics(): number { return Math.max(...METRICS.map(item=>item.score)); }
export function minScoreMetrics(): number { return Math.min(...METRICS.map(item=>item.score)); }
export const METRICS_VERSION = 'v6';
export const METRICS_SOURCE = 'demo-only';
export function isDemoOnlyMetrics(): true { return true; }
