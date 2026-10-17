/** Mock domain fixture: tracking. */
export interface TrackingFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const TRACKING: TrackingFixture[] = [
  {
    id: "tracking-1",
    title: "Tracking scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "tracking", "ready"],
  },
  {
    id: "tracking-2",
    title: "Tracking scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "tracking", "loading"],
  },
  {
    id: "tracking-3",
    title: "Tracking scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "tracking", "success"],
  },
  {
    id: "tracking-4",
    title: "Tracking scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "tracking", "warning"],
  },
  {
    id: "tracking-5",
    title: "Tracking scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "tracking", "error"],
  },
  {
    id: "tracking-6",
    title: "Tracking scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "tracking", "empty"],
  },
  {
    id: "tracking-7",
    title: "Tracking scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "tracking", "ready"],
  },
  {
    id: "tracking-8",
    title: "Tracking scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "tracking", "loading"],
  },
  {
    id: "tracking-9",
    title: "Tracking scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "tracking", "success"],
  },
  {
    id: "tracking-10",
    title: "Tracking scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "tracking", "warning"],
  },
  {
    id: "tracking-11",
    title: "Tracking scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "tracking", "error"],
  },
  {
    id: "tracking-12",
    title: "Tracking scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "tracking", "empty"],
  },
  {
    id: "tracking-13",
    title: "Tracking scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "tracking", "ready"],
  },
  {
    id: "tracking-14",
    title: "Tracking scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "tracking", "loading"],
  },
  {
    id: "tracking-15",
    title: "Tracking scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "tracking", "success"],
  },
  {
    id: "tracking-16",
    title: "Tracking scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for tracking; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "tracking", "warning"],
  }
];
export function getTracking(id:string): TrackingFixture|undefined { return TRACKING.find(item=>item.id===id); }
export function byStateTracking(state:TrackingFixture['state']): TrackingFixture[] { return TRACKING.filter(item=>item.state===state); }
export function featuredTracking(): TrackingFixture { return TRACKING[0]; }
export function countTracking(): number { return TRACKING.length; }
export function summaryTracking(): string { return `$<built-in function len> fixtures for tracking`; }
export const TRACKING_README = "Use tracking fixtures for deterministic mock screenshots and scripted demo states.";
export const TRACKING_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorTracking(): boolean { return TRACKING.some(item=>item.state==='error'); }
export function hasLoadingTracking(): boolean { return TRACKING.some(item=>item.state==='loading'); }
export function hasEmptyTracking(): boolean { return TRACKING.some(item=>item.state==='empty'); }
export function averageScoreTracking(): number { return Math.round(TRACKING.reduce((a,b)=>a+b.score,0)/Math.max(TRACKING.length,1)); }
export function maxScoreTracking(): number { return Math.max(...TRACKING.map(item=>item.score)); }
export function minScoreTracking(): number { return Math.min(...TRACKING.map(item=>item.score)); }
export const TRACKING_VERSION = 'v6';
export const TRACKING_SOURCE = 'demo-only';
export function isDemoOnlyTracking(): true { return true; }
