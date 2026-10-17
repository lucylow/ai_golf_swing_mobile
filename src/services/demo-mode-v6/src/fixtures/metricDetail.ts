/** Mock domain fixture: metricDetail. */
export interface MetricdetailFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const METRICDETAIL: MetricdetailFixture[] = [
  {
    id: "metricDetail-1",
    title: "Metricdetail scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "metricDetail", "ready"],
  },
  {
    id: "metricDetail-2",
    title: "Metricdetail scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "metricDetail", "loading"],
  },
  {
    id: "metricDetail-3",
    title: "Metricdetail scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "metricDetail", "success"],
  },
  {
    id: "metricDetail-4",
    title: "Metricdetail scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "metricDetail", "warning"],
  },
  {
    id: "metricDetail-5",
    title: "Metricdetail scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "metricDetail", "error"],
  },
  {
    id: "metricDetail-6",
    title: "Metricdetail scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "metricDetail", "empty"],
  },
  {
    id: "metricDetail-7",
    title: "Metricdetail scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "metricDetail", "ready"],
  },
  {
    id: "metricDetail-8",
    title: "Metricdetail scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "metricDetail", "loading"],
  },
  {
    id: "metricDetail-9",
    title: "Metricdetail scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "metricDetail", "success"],
  },
  {
    id: "metricDetail-10",
    title: "Metricdetail scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "metricDetail", "warning"],
  },
  {
    id: "metricDetail-11",
    title: "Metricdetail scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "metricDetail", "error"],
  },
  {
    id: "metricDetail-12",
    title: "Metricdetail scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "metricDetail", "empty"],
  },
  {
    id: "metricDetail-13",
    title: "Metricdetail scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "metricDetail", "ready"],
  },
  {
    id: "metricDetail-14",
    title: "Metricdetail scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "metricDetail", "loading"],
  },
  {
    id: "metricDetail-15",
    title: "Metricdetail scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "metricDetail", "success"],
  },
  {
    id: "metricDetail-16",
    title: "Metricdetail scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for metricDetail; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "metricDetail", "warning"],
  }
];
export function getMetricdetail(id:string): MetricdetailFixture|undefined { return METRICDETAIL.find(item=>item.id===id); }
export function byStateMetricdetail(state:MetricdetailFixture['state']): MetricdetailFixture[] { return METRICDETAIL.filter(item=>item.state===state); }
export function featuredMetricdetail(): MetricdetailFixture { return METRICDETAIL[0]; }
export function countMetricdetail(): number { return METRICDETAIL.length; }
export function summaryMetricdetail(): string { return `$<built-in function len> fixtures for metricDetail`; }
export const METRICDETAIL_README = "Use metricDetail fixtures for deterministic mock screenshots and scripted demo states.";
export const METRICDETAIL_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorMetricdetail(): boolean { return METRICDETAIL.some(item=>item.state==='error'); }
export function hasLoadingMetricdetail(): boolean { return METRICDETAIL.some(item=>item.state==='loading'); }
export function hasEmptyMetricdetail(): boolean { return METRICDETAIL.some(item=>item.state==='empty'); }
export function averageScoreMetricdetail(): number { return Math.round(METRICDETAIL.reduce((a,b)=>a+b.score,0)/Math.max(METRICDETAIL.length,1)); }
export function maxScoreMetricdetail(): number { return Math.max(...METRICDETAIL.map(item=>item.score)); }
export function minScoreMetricdetail(): number { return Math.min(...METRICDETAIL.map(item=>item.score)); }
export const METRICDETAIL_VERSION = 'v6';
export const METRICDETAIL_SOURCE = 'demo-only';
export function isDemoOnlyMetricdetail(): true { return true; }
