/** Mock domain fixture: putting. */
export interface PuttingFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PUTTING: PuttingFixture[] = [
  {
    id: "putting-1",
    title: "Putting scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "putting", "ready"],
  },
  {
    id: "putting-2",
    title: "Putting scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "putting", "loading"],
  },
  {
    id: "putting-3",
    title: "Putting scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "putting", "success"],
  },
  {
    id: "putting-4",
    title: "Putting scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "putting", "warning"],
  },
  {
    id: "putting-5",
    title: "Putting scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "putting", "error"],
  },
  {
    id: "putting-6",
    title: "Putting scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "putting", "empty"],
  },
  {
    id: "putting-7",
    title: "Putting scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "putting", "ready"],
  },
  {
    id: "putting-8",
    title: "Putting scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "putting", "loading"],
  },
  {
    id: "putting-9",
    title: "Putting scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "putting", "success"],
  },
  {
    id: "putting-10",
    title: "Putting scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "putting", "warning"],
  },
  {
    id: "putting-11",
    title: "Putting scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "putting", "error"],
  },
  {
    id: "putting-12",
    title: "Putting scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "putting", "empty"],
  },
  {
    id: "putting-13",
    title: "Putting scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "putting", "ready"],
  },
  {
    id: "putting-14",
    title: "Putting scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "putting", "loading"],
  },
  {
    id: "putting-15",
    title: "Putting scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "putting", "success"],
  },
  {
    id: "putting-16",
    title: "Putting scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for putting; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "putting", "warning"],
  }
];
export function getPutting(id:string): PuttingFixture|undefined { return PUTTING.find(item=>item.id===id); }
export function byStatePutting(state:PuttingFixture['state']): PuttingFixture[] { return PUTTING.filter(item=>item.state===state); }
export function featuredPutting(): PuttingFixture { return PUTTING[0]; }
export function countPutting(): number { return PUTTING.length; }
export function summaryPutting(): string { return `$<built-in function len> fixtures for putting`; }
export const PUTTING_README = "Use putting fixtures for deterministic mock screenshots and scripted demo states.";
export const PUTTING_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPutting(): boolean { return PUTTING.some(item=>item.state==='error'); }
export function hasLoadingPutting(): boolean { return PUTTING.some(item=>item.state==='loading'); }
export function hasEmptyPutting(): boolean { return PUTTING.some(item=>item.state==='empty'); }
export function averageScorePutting(): number { return Math.round(PUTTING.reduce((a,b)=>a+b.score,0)/Math.max(PUTTING.length,1)); }
export function maxScorePutting(): number { return Math.max(...PUTTING.map(item=>item.score)); }
export function minScorePutting(): number { return Math.min(...PUTTING.map(item=>item.score)); }
export const PUTTING_VERSION = 'v6';
export const PUTTING_SOURCE = 'demo-only';
export function isDemoOnlyPutting(): true { return true; }
