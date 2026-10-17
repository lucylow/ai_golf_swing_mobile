/** Mock domain fixture: trends. */
export interface TrendsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const TRENDS: TrendsFixture[] = [
  {
    id: "trends-1",
    title: "Trends scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "trends", "ready"],
  },
  {
    id: "trends-2",
    title: "Trends scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "trends", "loading"],
  },
  {
    id: "trends-3",
    title: "Trends scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "trends", "success"],
  },
  {
    id: "trends-4",
    title: "Trends scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "trends", "warning"],
  },
  {
    id: "trends-5",
    title: "Trends scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "trends", "error"],
  },
  {
    id: "trends-6",
    title: "Trends scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "trends", "empty"],
  },
  {
    id: "trends-7",
    title: "Trends scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "trends", "ready"],
  },
  {
    id: "trends-8",
    title: "Trends scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "trends", "loading"],
  },
  {
    id: "trends-9",
    title: "Trends scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "trends", "success"],
  },
  {
    id: "trends-10",
    title: "Trends scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "trends", "warning"],
  },
  {
    id: "trends-11",
    title: "Trends scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "trends", "error"],
  },
  {
    id: "trends-12",
    title: "Trends scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "trends", "empty"],
  },
  {
    id: "trends-13",
    title: "Trends scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "trends", "ready"],
  },
  {
    id: "trends-14",
    title: "Trends scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "trends", "loading"],
  },
  {
    id: "trends-15",
    title: "Trends scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "trends", "success"],
  },
  {
    id: "trends-16",
    title: "Trends scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for trends; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "trends", "warning"],
  }
];
export function getTrends(id:string): TrendsFixture|undefined { return TRENDS.find(item=>item.id===id); }
export function byStateTrends(state:TrendsFixture['state']): TrendsFixture[] { return TRENDS.filter(item=>item.state===state); }
export function featuredTrends(): TrendsFixture { return TRENDS[0]; }
export function countTrends(): number { return TRENDS.length; }
export function summaryTrends(): string { return `$<built-in function len> fixtures for trends`; }
export const TRENDS_README = "Use trends fixtures for deterministic mock screenshots and scripted demo states.";
export const TRENDS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorTrends(): boolean { return TRENDS.some(item=>item.state==='error'); }
export function hasLoadingTrends(): boolean { return TRENDS.some(item=>item.state==='loading'); }
export function hasEmptyTrends(): boolean { return TRENDS.some(item=>item.state==='empty'); }
export function averageScoreTrends(): number { return Math.round(TRENDS.reduce((a,b)=>a+b.score,0)/Math.max(TRENDS.length,1)); }
export function maxScoreTrends(): number { return Math.max(...TRENDS.map(item=>item.score)); }
export function minScoreTrends(): number { return Math.min(...TRENDS.map(item=>item.score)); }
export const TRENDS_VERSION = 'v6';
export const TRENDS_SOURCE = 'demo-only';
export function isDemoOnlyTrends(): true { return true; }
