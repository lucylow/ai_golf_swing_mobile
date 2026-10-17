/** Mock domain fixture: sessionShare. */
export interface SessionshareFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SESSIONSHARE: SessionshareFixture[] = [
  {
    id: "sessionShare-1",
    title: "Sessionshare scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "sessionShare", "ready"],
  },
  {
    id: "sessionShare-2",
    title: "Sessionshare scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "sessionShare", "loading"],
  },
  {
    id: "sessionShare-3",
    title: "Sessionshare scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "sessionShare", "success"],
  },
  {
    id: "sessionShare-4",
    title: "Sessionshare scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "sessionShare", "warning"],
  },
  {
    id: "sessionShare-5",
    title: "Sessionshare scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "sessionShare", "error"],
  },
  {
    id: "sessionShare-6",
    title: "Sessionshare scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "sessionShare", "empty"],
  },
  {
    id: "sessionShare-7",
    title: "Sessionshare scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "sessionShare", "ready"],
  },
  {
    id: "sessionShare-8",
    title: "Sessionshare scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "sessionShare", "loading"],
  },
  {
    id: "sessionShare-9",
    title: "Sessionshare scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "sessionShare", "success"],
  },
  {
    id: "sessionShare-10",
    title: "Sessionshare scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "sessionShare", "warning"],
  },
  {
    id: "sessionShare-11",
    title: "Sessionshare scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "sessionShare", "error"],
  },
  {
    id: "sessionShare-12",
    title: "Sessionshare scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "sessionShare", "empty"],
  },
  {
    id: "sessionShare-13",
    title: "Sessionshare scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "sessionShare", "ready"],
  },
  {
    id: "sessionShare-14",
    title: "Sessionshare scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "sessionShare", "loading"],
  },
  {
    id: "sessionShare-15",
    title: "Sessionshare scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "sessionShare", "success"],
  },
  {
    id: "sessionShare-16",
    title: "Sessionshare scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for sessionShare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "sessionShare", "warning"],
  }
];
export function getSessionshare(id:string): SessionshareFixture|undefined { return SESSIONSHARE.find(item=>item.id===id); }
export function byStateSessionshare(state:SessionshareFixture['state']): SessionshareFixture[] { return SESSIONSHARE.filter(item=>item.state===state); }
export function featuredSessionshare(): SessionshareFixture { return SESSIONSHARE[0]; }
export function countSessionshare(): number { return SESSIONSHARE.length; }
export function summarySessionshare(): string { return `$<built-in function len> fixtures for sessionShare`; }
export const SESSIONSHARE_README = "Use sessionShare fixtures for deterministic mock screenshots and scripted demo states.";
export const SESSIONSHARE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSessionshare(): boolean { return SESSIONSHARE.some(item=>item.state==='error'); }
export function hasLoadingSessionshare(): boolean { return SESSIONSHARE.some(item=>item.state==='loading'); }
export function hasEmptySessionshare(): boolean { return SESSIONSHARE.some(item=>item.state==='empty'); }
export function averageScoreSessionshare(): number { return Math.round(SESSIONSHARE.reduce((a,b)=>a+b.score,0)/Math.max(SESSIONSHARE.length,1)); }
export function maxScoreSessionshare(): number { return Math.max(...SESSIONSHARE.map(item=>item.score)); }
export function minScoreSessionshare(): number { return Math.min(...SESSIONSHARE.map(item=>item.score)); }
export const SESSIONSHARE_VERSION = 'v6';
export const SESSIONSHARE_SOURCE = 'demo-only';
export function isDemoOnlySessionshare(): true { return true; }
