/** Mock domain fixture: range. */
export interface RangeFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const RANGE: RangeFixture[] = [
  {
    id: "range-1",
    title: "Range scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "range", "ready"],
  },
  {
    id: "range-2",
    title: "Range scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "range", "loading"],
  },
  {
    id: "range-3",
    title: "Range scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "range", "success"],
  },
  {
    id: "range-4",
    title: "Range scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "range", "warning"],
  },
  {
    id: "range-5",
    title: "Range scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "range", "error"],
  },
  {
    id: "range-6",
    title: "Range scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "range", "empty"],
  },
  {
    id: "range-7",
    title: "Range scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "range", "ready"],
  },
  {
    id: "range-8",
    title: "Range scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "range", "loading"],
  },
  {
    id: "range-9",
    title: "Range scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "range", "success"],
  },
  {
    id: "range-10",
    title: "Range scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "range", "warning"],
  },
  {
    id: "range-11",
    title: "Range scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "range", "error"],
  },
  {
    id: "range-12",
    title: "Range scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "range", "empty"],
  },
  {
    id: "range-13",
    title: "Range scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "range", "ready"],
  },
  {
    id: "range-14",
    title: "Range scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "range", "loading"],
  },
  {
    id: "range-15",
    title: "Range scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "range", "success"],
  },
  {
    id: "range-16",
    title: "Range scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for range; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "range", "warning"],
  }
];
export function getRange(id:string): RangeFixture|undefined { return RANGE.find(item=>item.id===id); }
export function byStateRange(state:RangeFixture['state']): RangeFixture[] { return RANGE.filter(item=>item.state===state); }
export function featuredRange(): RangeFixture { return RANGE[0]; }
export function countRange(): number { return RANGE.length; }
export function summaryRange(): string { return `$<built-in function len> fixtures for range`; }
export const RANGE_README = "Use range fixtures for deterministic mock screenshots and scripted demo states.";
export const RANGE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorRange(): boolean { return RANGE.some(item=>item.state==='error'); }
export function hasLoadingRange(): boolean { return RANGE.some(item=>item.state==='loading'); }
export function hasEmptyRange(): boolean { return RANGE.some(item=>item.state==='empty'); }
export function averageScoreRange(): number { return Math.round(RANGE.reduce((a,b)=>a+b.score,0)/Math.max(RANGE.length,1)); }
export function maxScoreRange(): number { return Math.max(...RANGE.map(item=>item.score)); }
export function minScoreRange(): number { return Math.min(...RANGE.map(item=>item.score)); }
export const RANGE_VERSION = 'v6';
export const RANGE_SOURCE = 'demo-only';
export function isDemoOnlyRange(): true { return true; }
