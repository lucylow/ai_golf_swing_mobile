/** Mock domain fixture: iron. */
export interface IronFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const IRON: IronFixture[] = [
  {
    id: "iron-1",
    title: "Iron scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "iron", "ready"],
  },
  {
    id: "iron-2",
    title: "Iron scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "iron", "loading"],
  },
  {
    id: "iron-3",
    title: "Iron scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "iron", "success"],
  },
  {
    id: "iron-4",
    title: "Iron scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "iron", "warning"],
  },
  {
    id: "iron-5",
    title: "Iron scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "iron", "error"],
  },
  {
    id: "iron-6",
    title: "Iron scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "iron", "empty"],
  },
  {
    id: "iron-7",
    title: "Iron scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "iron", "ready"],
  },
  {
    id: "iron-8",
    title: "Iron scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "iron", "loading"],
  },
  {
    id: "iron-9",
    title: "Iron scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "iron", "success"],
  },
  {
    id: "iron-10",
    title: "Iron scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "iron", "warning"],
  },
  {
    id: "iron-11",
    title: "Iron scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "iron", "error"],
  },
  {
    id: "iron-12",
    title: "Iron scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "iron", "empty"],
  },
  {
    id: "iron-13",
    title: "Iron scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "iron", "ready"],
  },
  {
    id: "iron-14",
    title: "Iron scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "iron", "loading"],
  },
  {
    id: "iron-15",
    title: "Iron scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "iron", "success"],
  },
  {
    id: "iron-16",
    title: "Iron scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for iron; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "iron", "warning"],
  }
];
export function getIron(id:string): IronFixture|undefined { return IRON.find(item=>item.id===id); }
export function byStateIron(state:IronFixture['state']): IronFixture[] { return IRON.filter(item=>item.state===state); }
export function featuredIron(): IronFixture { return IRON[0]; }
export function countIron(): number { return IRON.length; }
export function summaryIron(): string { return `$<built-in function len> fixtures for iron`; }
export const IRON_README = "Use iron fixtures for deterministic mock screenshots and scripted demo states.";
export const IRON_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorIron(): boolean { return IRON.some(item=>item.state==='error'); }
export function hasLoadingIron(): boolean { return IRON.some(item=>item.state==='loading'); }
export function hasEmptyIron(): boolean { return IRON.some(item=>item.state==='empty'); }
export function averageScoreIron(): number { return Math.round(IRON.reduce((a,b)=>a+b.score,0)/Math.max(IRON.length,1)); }
export function maxScoreIron(): number { return Math.max(...IRON.map(item=>item.score)); }
export function minScoreIron(): number { return Math.min(...IRON.map(item=>item.score)); }
export const IRON_VERSION = 'v6';
export const IRON_SOURCE = 'demo-only';
export function isDemoOnlyIron(): true { return true; }
