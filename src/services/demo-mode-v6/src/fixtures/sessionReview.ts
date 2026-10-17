/** Mock domain fixture: sessionReview. */
export interface SessionreviewFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SESSIONREVIEW: SessionreviewFixture[] = [
  {
    id: "sessionReview-1",
    title: "Sessionreview scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "sessionReview", "ready"],
  },
  {
    id: "sessionReview-2",
    title: "Sessionreview scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "sessionReview", "loading"],
  },
  {
    id: "sessionReview-3",
    title: "Sessionreview scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "sessionReview", "success"],
  },
  {
    id: "sessionReview-4",
    title: "Sessionreview scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "sessionReview", "warning"],
  },
  {
    id: "sessionReview-5",
    title: "Sessionreview scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "sessionReview", "error"],
  },
  {
    id: "sessionReview-6",
    title: "Sessionreview scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "sessionReview", "empty"],
  },
  {
    id: "sessionReview-7",
    title: "Sessionreview scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "sessionReview", "ready"],
  },
  {
    id: "sessionReview-8",
    title: "Sessionreview scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "sessionReview", "loading"],
  },
  {
    id: "sessionReview-9",
    title: "Sessionreview scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "sessionReview", "success"],
  },
  {
    id: "sessionReview-10",
    title: "Sessionreview scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "sessionReview", "warning"],
  },
  {
    id: "sessionReview-11",
    title: "Sessionreview scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "sessionReview", "error"],
  },
  {
    id: "sessionReview-12",
    title: "Sessionreview scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "sessionReview", "empty"],
  },
  {
    id: "sessionReview-13",
    title: "Sessionreview scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "sessionReview", "ready"],
  },
  {
    id: "sessionReview-14",
    title: "Sessionreview scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "sessionReview", "loading"],
  },
  {
    id: "sessionReview-15",
    title: "Sessionreview scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "sessionReview", "success"],
  },
  {
    id: "sessionReview-16",
    title: "Sessionreview scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for sessionReview; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "sessionReview", "warning"],
  }
];
export function getSessionreview(id:string): SessionreviewFixture|undefined { return SESSIONREVIEW.find(item=>item.id===id); }
export function byStateSessionreview(state:SessionreviewFixture['state']): SessionreviewFixture[] { return SESSIONREVIEW.filter(item=>item.state===state); }
export function featuredSessionreview(): SessionreviewFixture { return SESSIONREVIEW[0]; }
export function countSessionreview(): number { return SESSIONREVIEW.length; }
export function summarySessionreview(): string { return `$<built-in function len> fixtures for sessionReview`; }
export const SESSIONREVIEW_README = "Use sessionReview fixtures for deterministic mock screenshots and scripted demo states.";
export const SESSIONREVIEW_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSessionreview(): boolean { return SESSIONREVIEW.some(item=>item.state==='error'); }
export function hasLoadingSessionreview(): boolean { return SESSIONREVIEW.some(item=>item.state==='loading'); }
export function hasEmptySessionreview(): boolean { return SESSIONREVIEW.some(item=>item.state==='empty'); }
export function averageScoreSessionreview(): number { return Math.round(SESSIONREVIEW.reduce((a,b)=>a+b.score,0)/Math.max(SESSIONREVIEW.length,1)); }
export function maxScoreSessionreview(): number { return Math.max(...SESSIONREVIEW.map(item=>item.score)); }
export function minScoreSessionreview(): number { return Math.min(...SESSIONREVIEW.map(item=>item.score)); }
export const SESSIONREVIEW_VERSION = 'v6';
export const SESSIONREVIEW_SOURCE = 'demo-only';
export function isDemoOnlySessionreview(): true { return true; }
