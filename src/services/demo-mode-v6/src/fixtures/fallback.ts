/** Mock domain fixture: fallback. */
export interface FallbackFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const FALLBACK: FallbackFixture[] = [
  {
    id: "fallback-1",
    title: "Fallback scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "fallback", "ready"],
  },
  {
    id: "fallback-2",
    title: "Fallback scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "fallback", "loading"],
  },
  {
    id: "fallback-3",
    title: "Fallback scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "fallback", "success"],
  },
  {
    id: "fallback-4",
    title: "Fallback scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "fallback", "warning"],
  },
  {
    id: "fallback-5",
    title: "Fallback scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "fallback", "error"],
  },
  {
    id: "fallback-6",
    title: "Fallback scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "fallback", "empty"],
  },
  {
    id: "fallback-7",
    title: "Fallback scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "fallback", "ready"],
  },
  {
    id: "fallback-8",
    title: "Fallback scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "fallback", "loading"],
  },
  {
    id: "fallback-9",
    title: "Fallback scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "fallback", "success"],
  },
  {
    id: "fallback-10",
    title: "Fallback scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "fallback", "warning"],
  },
  {
    id: "fallback-11",
    title: "Fallback scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "fallback", "error"],
  },
  {
    id: "fallback-12",
    title: "Fallback scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "fallback", "empty"],
  },
  {
    id: "fallback-13",
    title: "Fallback scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "fallback", "ready"],
  },
  {
    id: "fallback-14",
    title: "Fallback scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "fallback", "loading"],
  },
  {
    id: "fallback-15",
    title: "Fallback scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "fallback", "success"],
  },
  {
    id: "fallback-16",
    title: "Fallback scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for fallback; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "fallback", "warning"],
  }
];
export function getFallback(id:string): FallbackFixture|undefined { return FALLBACK.find(item=>item.id===id); }
export function byStateFallback(state:FallbackFixture['state']): FallbackFixture[] { return FALLBACK.filter(item=>item.state===state); }
export function featuredFallback(): FallbackFixture { return FALLBACK[0]; }
export function countFallback(): number { return FALLBACK.length; }
export function summaryFallback(): string { return `$<built-in function len> fixtures for fallback`; }
export const FALLBACK_README = "Use fallback fixtures for deterministic mock screenshots and scripted demo states.";
export const FALLBACK_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorFallback(): boolean { return FALLBACK.some(item=>item.state==='error'); }
export function hasLoadingFallback(): boolean { return FALLBACK.some(item=>item.state==='loading'); }
export function hasEmptyFallback(): boolean { return FALLBACK.some(item=>item.state==='empty'); }
export function averageScoreFallback(): number { return Math.round(FALLBACK.reduce((a,b)=>a+b.score,0)/Math.max(FALLBACK.length,1)); }
export function maxScoreFallback(): number { return Math.max(...FALLBACK.map(item=>item.score)); }
export function minScoreFallback(): number { return Math.min(...FALLBACK.map(item=>item.score)); }
export const FALLBACK_VERSION = 'v6';
export const FALLBACK_SOURCE = 'demo-only';
export function isDemoOnlyFallback(): true { return true; }
