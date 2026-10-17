/** Mock domain fixture: sessionCapture. */
export interface SessioncaptureFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SESSIONCAPTURE: SessioncaptureFixture[] = [
  {
    id: "sessionCapture-1",
    title: "Sessioncapture scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "sessionCapture", "ready"],
  },
  {
    id: "sessionCapture-2",
    title: "Sessioncapture scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "sessionCapture", "loading"],
  },
  {
    id: "sessionCapture-3",
    title: "Sessioncapture scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "sessionCapture", "success"],
  },
  {
    id: "sessionCapture-4",
    title: "Sessioncapture scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "sessionCapture", "warning"],
  },
  {
    id: "sessionCapture-5",
    title: "Sessioncapture scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "sessionCapture", "error"],
  },
  {
    id: "sessionCapture-6",
    title: "Sessioncapture scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "sessionCapture", "empty"],
  },
  {
    id: "sessionCapture-7",
    title: "Sessioncapture scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "sessionCapture", "ready"],
  },
  {
    id: "sessionCapture-8",
    title: "Sessioncapture scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "sessionCapture", "loading"],
  },
  {
    id: "sessionCapture-9",
    title: "Sessioncapture scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "sessionCapture", "success"],
  },
  {
    id: "sessionCapture-10",
    title: "Sessioncapture scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "sessionCapture", "warning"],
  },
  {
    id: "sessionCapture-11",
    title: "Sessioncapture scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "sessionCapture", "error"],
  },
  {
    id: "sessionCapture-12",
    title: "Sessioncapture scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "sessionCapture", "empty"],
  },
  {
    id: "sessionCapture-13",
    title: "Sessioncapture scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "sessionCapture", "ready"],
  },
  {
    id: "sessionCapture-14",
    title: "Sessioncapture scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "sessionCapture", "loading"],
  },
  {
    id: "sessionCapture-15",
    title: "Sessioncapture scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "sessionCapture", "success"],
  },
  {
    id: "sessionCapture-16",
    title: "Sessioncapture scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for sessionCapture; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "sessionCapture", "warning"],
  }
];
export function getSessioncapture(id:string): SessioncaptureFixture|undefined { return SESSIONCAPTURE.find(item=>item.id===id); }
export function byStateSessioncapture(state:SessioncaptureFixture['state']): SessioncaptureFixture[] { return SESSIONCAPTURE.filter(item=>item.state===state); }
export function featuredSessioncapture(): SessioncaptureFixture { return SESSIONCAPTURE[0]; }
export function countSessioncapture(): number { return SESSIONCAPTURE.length; }
export function summarySessioncapture(): string { return `$<built-in function len> fixtures for sessionCapture`; }
export const SESSIONCAPTURE_README = "Use sessionCapture fixtures for deterministic mock screenshots and scripted demo states.";
export const SESSIONCAPTURE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSessioncapture(): boolean { return SESSIONCAPTURE.some(item=>item.state==='error'); }
export function hasLoadingSessioncapture(): boolean { return SESSIONCAPTURE.some(item=>item.state==='loading'); }
export function hasEmptySessioncapture(): boolean { return SESSIONCAPTURE.some(item=>item.state==='empty'); }
export function averageScoreSessioncapture(): number { return Math.round(SESSIONCAPTURE.reduce((a,b)=>a+b.score,0)/Math.max(SESSIONCAPTURE.length,1)); }
export function maxScoreSessioncapture(): number { return Math.max(...SESSIONCAPTURE.map(item=>item.score)); }
export function minScoreSessioncapture(): number { return Math.min(...SESSIONCAPTURE.map(item=>item.score)); }
export const SESSIONCAPTURE_VERSION = 'v6';
export const SESSIONCAPTURE_SOURCE = 'demo-only';
export function isDemoOnlySessioncapture(): true { return true; }
