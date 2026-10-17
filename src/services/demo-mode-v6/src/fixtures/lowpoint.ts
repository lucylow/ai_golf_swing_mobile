/** Mock domain fixture: lowpoint. */
export interface LowpointFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const LOWPOINT: LowpointFixture[] = [
  {
    id: "lowpoint-1",
    title: "Lowpoint scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "lowpoint", "ready"],
  },
  {
    id: "lowpoint-2",
    title: "Lowpoint scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "lowpoint", "loading"],
  },
  {
    id: "lowpoint-3",
    title: "Lowpoint scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "lowpoint", "success"],
  },
  {
    id: "lowpoint-4",
    title: "Lowpoint scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "lowpoint", "warning"],
  },
  {
    id: "lowpoint-5",
    title: "Lowpoint scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "lowpoint", "error"],
  },
  {
    id: "lowpoint-6",
    title: "Lowpoint scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "lowpoint", "empty"],
  },
  {
    id: "lowpoint-7",
    title: "Lowpoint scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "lowpoint", "ready"],
  },
  {
    id: "lowpoint-8",
    title: "Lowpoint scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "lowpoint", "loading"],
  },
  {
    id: "lowpoint-9",
    title: "Lowpoint scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "lowpoint", "success"],
  },
  {
    id: "lowpoint-10",
    title: "Lowpoint scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "lowpoint", "warning"],
  },
  {
    id: "lowpoint-11",
    title: "Lowpoint scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "lowpoint", "error"],
  },
  {
    id: "lowpoint-12",
    title: "Lowpoint scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "lowpoint", "empty"],
  },
  {
    id: "lowpoint-13",
    title: "Lowpoint scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "lowpoint", "ready"],
  },
  {
    id: "lowpoint-14",
    title: "Lowpoint scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "lowpoint", "loading"],
  },
  {
    id: "lowpoint-15",
    title: "Lowpoint scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "lowpoint", "success"],
  },
  {
    id: "lowpoint-16",
    title: "Lowpoint scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for lowpoint; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "lowpoint", "warning"],
  }
];
export function getLowpoint(id:string): LowpointFixture|undefined { return LOWPOINT.find(item=>item.id===id); }
export function byStateLowpoint(state:LowpointFixture['state']): LowpointFixture[] { return LOWPOINT.filter(item=>item.state===state); }
export function featuredLowpoint(): LowpointFixture { return LOWPOINT[0]; }
export function countLowpoint(): number { return LOWPOINT.length; }
export function summaryLowpoint(): string { return `$<built-in function len> fixtures for lowpoint`; }
export const LOWPOINT_README = "Use lowpoint fixtures for deterministic mock screenshots and scripted demo states.";
export const LOWPOINT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorLowpoint(): boolean { return LOWPOINT.some(item=>item.state==='error'); }
export function hasLoadingLowpoint(): boolean { return LOWPOINT.some(item=>item.state==='loading'); }
export function hasEmptyLowpoint(): boolean { return LOWPOINT.some(item=>item.state==='empty'); }
export function averageScoreLowpoint(): number { return Math.round(LOWPOINT.reduce((a,b)=>a+b.score,0)/Math.max(LOWPOINT.length,1)); }
export function maxScoreLowpoint(): number { return Math.max(...LOWPOINT.map(item=>item.score)); }
export function minScoreLowpoint(): number { return Math.min(...LOWPOINT.map(item=>item.score)); }
export const LOWPOINT_VERSION = 'v6';
export const LOWPOINT_SOURCE = 'demo-only';
export function isDemoOnlyLowpoint(): true { return true; }
