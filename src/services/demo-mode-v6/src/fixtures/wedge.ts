/** Mock domain fixture: wedge. */
export interface WedgeFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const WEDGE: WedgeFixture[] = [
  {
    id: "wedge-1",
    title: "Wedge scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "wedge", "ready"],
  },
  {
    id: "wedge-2",
    title: "Wedge scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "wedge", "loading"],
  },
  {
    id: "wedge-3",
    title: "Wedge scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "wedge", "success"],
  },
  {
    id: "wedge-4",
    title: "Wedge scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "wedge", "warning"],
  },
  {
    id: "wedge-5",
    title: "Wedge scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "wedge", "error"],
  },
  {
    id: "wedge-6",
    title: "Wedge scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "wedge", "empty"],
  },
  {
    id: "wedge-7",
    title: "Wedge scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "wedge", "ready"],
  },
  {
    id: "wedge-8",
    title: "Wedge scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "wedge", "loading"],
  },
  {
    id: "wedge-9",
    title: "Wedge scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "wedge", "success"],
  },
  {
    id: "wedge-10",
    title: "Wedge scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "wedge", "warning"],
  },
  {
    id: "wedge-11",
    title: "Wedge scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "wedge", "error"],
  },
  {
    id: "wedge-12",
    title: "Wedge scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "wedge", "empty"],
  },
  {
    id: "wedge-13",
    title: "Wedge scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "wedge", "ready"],
  },
  {
    id: "wedge-14",
    title: "Wedge scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "wedge", "loading"],
  },
  {
    id: "wedge-15",
    title: "Wedge scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "wedge", "success"],
  },
  {
    id: "wedge-16",
    title: "Wedge scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for wedge; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "wedge", "warning"],
  }
];
export function getWedge(id:string): WedgeFixture|undefined { return WEDGE.find(item=>item.id===id); }
export function byStateWedge(state:WedgeFixture['state']): WedgeFixture[] { return WEDGE.filter(item=>item.state===state); }
export function featuredWedge(): WedgeFixture { return WEDGE[0]; }
export function countWedge(): number { return WEDGE.length; }
export function summaryWedge(): string { return `$<built-in function len> fixtures for wedge`; }
export const WEDGE_README = "Use wedge fixtures for deterministic mock screenshots and scripted demo states.";
export const WEDGE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorWedge(): boolean { return WEDGE.some(item=>item.state==='error'); }
export function hasLoadingWedge(): boolean { return WEDGE.some(item=>item.state==='loading'); }
export function hasEmptyWedge(): boolean { return WEDGE.some(item=>item.state==='empty'); }
export function averageScoreWedge(): number { return Math.round(WEDGE.reduce((a,b)=>a+b.score,0)/Math.max(WEDGE.length,1)); }
export function maxScoreWedge(): number { return Math.max(...WEDGE.map(item=>item.score)); }
export function minScoreWedge(): number { return Math.min(...WEDGE.map(item=>item.score)); }
export const WEDGE_VERSION = 'v6';
export const WEDGE_SOURCE = 'demo-only';
export function isDemoOnlyWedge(): true { return true; }
