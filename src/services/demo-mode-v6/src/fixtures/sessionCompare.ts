/** Mock domain fixture: sessionCompare. */
export interface SessioncompareFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SESSIONCOMPARE: SessioncompareFixture[] = [
  {
    id: "sessionCompare-1",
    title: "Sessioncompare scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "sessionCompare", "ready"],
  },
  {
    id: "sessionCompare-2",
    title: "Sessioncompare scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "sessionCompare", "loading"],
  },
  {
    id: "sessionCompare-3",
    title: "Sessioncompare scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "sessionCompare", "success"],
  },
  {
    id: "sessionCompare-4",
    title: "Sessioncompare scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "sessionCompare", "warning"],
  },
  {
    id: "sessionCompare-5",
    title: "Sessioncompare scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "sessionCompare", "error"],
  },
  {
    id: "sessionCompare-6",
    title: "Sessioncompare scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "sessionCompare", "empty"],
  },
  {
    id: "sessionCompare-7",
    title: "Sessioncompare scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "sessionCompare", "ready"],
  },
  {
    id: "sessionCompare-8",
    title: "Sessioncompare scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "sessionCompare", "loading"],
  },
  {
    id: "sessionCompare-9",
    title: "Sessioncompare scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "sessionCompare", "success"],
  },
  {
    id: "sessionCompare-10",
    title: "Sessioncompare scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "sessionCompare", "warning"],
  },
  {
    id: "sessionCompare-11",
    title: "Sessioncompare scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "sessionCompare", "error"],
  },
  {
    id: "sessionCompare-12",
    title: "Sessioncompare scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "sessionCompare", "empty"],
  },
  {
    id: "sessionCompare-13",
    title: "Sessioncompare scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "sessionCompare", "ready"],
  },
  {
    id: "sessionCompare-14",
    title: "Sessioncompare scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "sessionCompare", "loading"],
  },
  {
    id: "sessionCompare-15",
    title: "Sessioncompare scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "sessionCompare", "success"],
  },
  {
    id: "sessionCompare-16",
    title: "Sessioncompare scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for sessionCompare; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "sessionCompare", "warning"],
  }
];
export function getSessioncompare(id:string): SessioncompareFixture|undefined { return SESSIONCOMPARE.find(item=>item.id===id); }
export function byStateSessioncompare(state:SessioncompareFixture['state']): SessioncompareFixture[] { return SESSIONCOMPARE.filter(item=>item.state===state); }
export function featuredSessioncompare(): SessioncompareFixture { return SESSIONCOMPARE[0]; }
export function countSessioncompare(): number { return SESSIONCOMPARE.length; }
export function summarySessioncompare(): string { return `$<built-in function len> fixtures for sessionCompare`; }
export const SESSIONCOMPARE_README = "Use sessionCompare fixtures for deterministic mock screenshots and scripted demo states.";
export const SESSIONCOMPARE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSessioncompare(): boolean { return SESSIONCOMPARE.some(item=>item.state==='error'); }
export function hasLoadingSessioncompare(): boolean { return SESSIONCOMPARE.some(item=>item.state==='loading'); }
export function hasEmptySessioncompare(): boolean { return SESSIONCOMPARE.some(item=>item.state==='empty'); }
export function averageScoreSessioncompare(): number { return Math.round(SESSIONCOMPARE.reduce((a,b)=>a+b.score,0)/Math.max(SESSIONCOMPARE.length,1)); }
export function maxScoreSessioncompare(): number { return Math.max(...SESSIONCOMPARE.map(item=>item.score)); }
export function minScoreSessioncompare(): number { return Math.min(...SESSIONCOMPARE.map(item=>item.score)); }
export const SESSIONCOMPARE_VERSION = 'v6';
export const SESSIONCOMPARE_SOURCE = 'demo-only';
export function isDemoOnlySessioncompare(): true { return true; }
