/** Mock domain fixture: loading. */
export interface LoadingFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const LOADING: LoadingFixture[] = [
  {
    id: "loading-1",
    title: "Loading scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "loading", "ready"],
  },
  {
    id: "loading-2",
    title: "Loading scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "loading", "loading"],
  },
  {
    id: "loading-3",
    title: "Loading scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "loading", "success"],
  },
  {
    id: "loading-4",
    title: "Loading scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "loading", "warning"],
  },
  {
    id: "loading-5",
    title: "Loading scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "loading", "error"],
  },
  {
    id: "loading-6",
    title: "Loading scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "loading", "empty"],
  },
  {
    id: "loading-7",
    title: "Loading scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "loading", "ready"],
  },
  {
    id: "loading-8",
    title: "Loading scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "loading", "loading"],
  },
  {
    id: "loading-9",
    title: "Loading scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "loading", "success"],
  },
  {
    id: "loading-10",
    title: "Loading scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "loading", "warning"],
  },
  {
    id: "loading-11",
    title: "Loading scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "loading", "error"],
  },
  {
    id: "loading-12",
    title: "Loading scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "loading", "empty"],
  },
  {
    id: "loading-13",
    title: "Loading scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "loading", "ready"],
  },
  {
    id: "loading-14",
    title: "Loading scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "loading", "loading"],
  },
  {
    id: "loading-15",
    title: "Loading scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "loading", "success"],
  },
  {
    id: "loading-16",
    title: "Loading scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for loading; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "loading", "warning"],
  }
];
export function getLoading(id:string): LoadingFixture|undefined { return LOADING.find(item=>item.id===id); }
export function byStateLoading(state:LoadingFixture['state']): LoadingFixture[] { return LOADING.filter(item=>item.state===state); }
export function featuredLoading(): LoadingFixture { return LOADING[0]; }
export function countLoading(): number { return LOADING.length; }
export function summaryLoading(): string { return `$<built-in function len> fixtures for loading`; }
export const LOADING_README = "Use loading fixtures for deterministic mock screenshots and scripted demo states.";
export const LOADING_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorLoading(): boolean { return LOADING.some(item=>item.state==='error'); }
export function hasLoadingLoading(): boolean { return LOADING.some(item=>item.state==='loading'); }
export function hasEmptyLoading(): boolean { return LOADING.some(item=>item.state==='empty'); }
export function averageScoreLoading(): number { return Math.round(LOADING.reduce((a,b)=>a+b.score,0)/Math.max(LOADING.length,1)); }
export function maxScoreLoading(): number { return Math.max(...LOADING.map(item=>item.score)); }
export function minScoreLoading(): number { return Math.min(...LOADING.map(item=>item.score)); }
export const LOADING_VERSION = 'v6';
export const LOADING_SOURCE = 'demo-only';
export function isDemoOnlyLoading(): true { return true; }
