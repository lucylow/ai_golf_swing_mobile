/** Mock domain fixture: compare. */
export interface CompareFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const COMPARE: CompareFixture[] = [
  {
    id: "compare-1",
    title: "Compare scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "compare", "ready"],
  },
  {
    id: "compare-2",
    title: "Compare scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "compare", "loading"],
  },
  {
    id: "compare-3",
    title: "Compare scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "compare", "success"],
  },
  {
    id: "compare-4",
    title: "Compare scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "compare", "warning"],
  },
  {
    id: "compare-5",
    title: "Compare scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "compare", "error"],
  },
  {
    id: "compare-6",
    title: "Compare scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "compare", "empty"],
  },
  {
    id: "compare-7",
    title: "Compare scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "compare", "ready"],
  },
  {
    id: "compare-8",
    title: "Compare scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "compare", "loading"],
  },
  {
    id: "compare-9",
    title: "Compare scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "compare", "success"],
  },
  {
    id: "compare-10",
    title: "Compare scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "compare", "warning"],
  },
  {
    id: "compare-11",
    title: "Compare scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "compare", "error"],
  },
  {
    id: "compare-12",
    title: "Compare scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "compare", "empty"],
  },
  {
    id: "compare-13",
    title: "Compare scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "compare", "ready"],
  },
  {
    id: "compare-14",
    title: "Compare scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "compare", "loading"],
  },
  {
    id: "compare-15",
    title: "Compare scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "compare", "success"],
  },
  {
    id: "compare-16",
    title: "Compare scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for compare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "compare", "warning"],
  }
];
export function getCompare(id:string): CompareFixture|undefined { return COMPARE.find(item=>item.id===id); }
export function byStateCompare(state:CompareFixture['state']): CompareFixture[] { return COMPARE.filter(item=>item.state===state); }
export function featuredCompare(): CompareFixture { return COMPARE[0]; }
export function countCompare(): number { return COMPARE.length; }
export function summaryCompare(): string { return `$<built-in function len> fixtures for compare`; }
export const COMPARE_README = "Use compare fixtures for deterministic mock screenshots and scripted demo states.";
export const COMPARE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorCompare(): boolean { return COMPARE.some(item=>item.state==='error'); }
export function hasLoadingCompare(): boolean { return COMPARE.some(item=>item.state==='loading'); }
export function hasEmptyCompare(): boolean { return COMPARE.some(item=>item.state==='empty'); }
export function averageScoreCompare(): number { return Math.round(COMPARE.reduce((a,b)=>a+b.score,0)/Math.max(COMPARE.length,1)); }
export function maxScoreCompare(): number { return Math.max(...COMPARE.map(item=>item.score)); }
export function minScoreCompare(): number { return Math.min(...COMPARE.map(item=>item.score)); }
export const COMPARE_VERSION = 'v6';
export const COMPARE_SOURCE = 'demo-only';
export function isDemoOnlyCompare(): true { return true; }
