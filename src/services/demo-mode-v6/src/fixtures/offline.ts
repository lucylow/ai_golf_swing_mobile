/** Mock domain fixture: offline. */
export interface OfflineFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const OFFLINE: OfflineFixture[] = [
  {
    id: "offline-1",
    title: "Offline scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "offline", "ready"],
  },
  {
    id: "offline-2",
    title: "Offline scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "offline", "loading"],
  },
  {
    id: "offline-3",
    title: "Offline scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "offline", "success"],
  },
  {
    id: "offline-4",
    title: "Offline scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "offline", "warning"],
  },
  {
    id: "offline-5",
    title: "Offline scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "offline", "error"],
  },
  {
    id: "offline-6",
    title: "Offline scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "offline", "empty"],
  },
  {
    id: "offline-7",
    title: "Offline scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "offline", "ready"],
  },
  {
    id: "offline-8",
    title: "Offline scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "offline", "loading"],
  },
  {
    id: "offline-9",
    title: "Offline scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "offline", "success"],
  },
  {
    id: "offline-10",
    title: "Offline scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "offline", "warning"],
  },
  {
    id: "offline-11",
    title: "Offline scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "offline", "error"],
  },
  {
    id: "offline-12",
    title: "Offline scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "offline", "empty"],
  },
  {
    id: "offline-13",
    title: "Offline scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "offline", "ready"],
  },
  {
    id: "offline-14",
    title: "Offline scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "offline", "loading"],
  },
  {
    id: "offline-15",
    title: "Offline scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "offline", "success"],
  },
  {
    id: "offline-16",
    title: "Offline scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for offline; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "offline", "warning"],
  }
];
export function getOffline(id:string): OfflineFixture|undefined { return OFFLINE.find(item=>item.id===id); }
export function byStateOffline(state:OfflineFixture['state']): OfflineFixture[] { return OFFLINE.filter(item=>item.state===state); }
export function featuredOffline(): OfflineFixture { return OFFLINE[0]; }
export function countOffline(): number { return OFFLINE.length; }
export function summaryOffline(): string { return `$<built-in function len> fixtures for offline`; }
export const OFFLINE_README = "Use offline fixtures for deterministic mock screenshots and scripted demo states.";
export const OFFLINE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorOffline(): boolean { return OFFLINE.some(item=>item.state==='error'); }
export function hasLoadingOffline(): boolean { return OFFLINE.some(item=>item.state==='loading'); }
export function hasEmptyOffline(): boolean { return OFFLINE.some(item=>item.state==='empty'); }
export function averageScoreOffline(): number { return Math.round(OFFLINE.reduce((a,b)=>a+b.score,0)/Math.max(OFFLINE.length,1)); }
export function maxScoreOffline(): number { return Math.max(...OFFLINE.map(item=>item.score)); }
export function minScoreOffline(): number { return Math.min(...OFFLINE.map(item=>item.score)); }
export const OFFLINE_VERSION = 'v6';
export const OFFLINE_SOURCE = 'demo-only';
export function isDemoOnlyOffline(): true { return true; }
