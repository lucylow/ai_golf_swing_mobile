/** Mock domain fixture: empty. */
export interface EmptyFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const EMPTY: EmptyFixture[] = [
  {
    id: "empty-1",
    title: "Empty scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "empty", "ready"],
  },
  {
    id: "empty-2",
    title: "Empty scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "empty", "loading"],
  },
  {
    id: "empty-3",
    title: "Empty scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "empty", "success"],
  },
  {
    id: "empty-4",
    title: "Empty scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "empty", "warning"],
  },
  {
    id: "empty-5",
    title: "Empty scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "empty", "error"],
  },
  {
    id: "empty-6",
    title: "Empty scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "empty", "empty"],
  },
  {
    id: "empty-7",
    title: "Empty scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "empty", "ready"],
  },
  {
    id: "empty-8",
    title: "Empty scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "empty", "loading"],
  },
  {
    id: "empty-9",
    title: "Empty scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "empty", "success"],
  },
  {
    id: "empty-10",
    title: "Empty scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "empty", "warning"],
  },
  {
    id: "empty-11",
    title: "Empty scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "empty", "error"],
  },
  {
    id: "empty-12",
    title: "Empty scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "empty", "empty"],
  },
  {
    id: "empty-13",
    title: "Empty scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "empty", "ready"],
  },
  {
    id: "empty-14",
    title: "Empty scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "empty", "loading"],
  },
  {
    id: "empty-15",
    title: "Empty scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "empty", "success"],
  },
  {
    id: "empty-16",
    title: "Empty scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for empty; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "empty", "warning"],
  }
];
export function getEmpty(id:string): EmptyFixture|undefined { return EMPTY.find(item=>item.id===id); }
export function byStateEmpty(state:EmptyFixture['state']): EmptyFixture[] { return EMPTY.filter(item=>item.state===state); }
export function featuredEmpty(): EmptyFixture { return EMPTY[0]; }
export function countEmpty(): number { return EMPTY.length; }
export function summaryEmpty(): string { return `$<built-in function len> fixtures for empty`; }
export const EMPTY_README = "Use empty fixtures for deterministic mock screenshots and scripted demo states.";
export const EMPTY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorEmpty(): boolean { return EMPTY.some(item=>item.state==='error'); }
export function hasLoadingEmpty(): boolean { return EMPTY.some(item=>item.state==='loading'); }
export function hasEmptyEmpty(): boolean { return EMPTY.some(item=>item.state==='empty'); }
export function averageScoreEmpty(): number { return Math.round(EMPTY.reduce((a,b)=>a+b.score,0)/Math.max(EMPTY.length,1)); }
export function maxScoreEmpty(): number { return Math.max(...EMPTY.map(item=>item.score)); }
export function minScoreEmpty(): number { return Math.min(...EMPTY.map(item=>item.score)); }
export const EMPTY_VERSION = 'v6';
export const EMPTY_SOURCE = 'demo-only';
export function isDemoOnlyEmpty(): true { return true; }
