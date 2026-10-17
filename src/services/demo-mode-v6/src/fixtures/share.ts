/** Mock domain fixture: share. */
export interface ShareFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SHARE: ShareFixture[] = [
  {
    id: "share-1",
    title: "Share scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "share", "ready"],
  },
  {
    id: "share-2",
    title: "Share scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "share", "loading"],
  },
  {
    id: "share-3",
    title: "Share scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "share", "success"],
  },
  {
    id: "share-4",
    title: "Share scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "share", "warning"],
  },
  {
    id: "share-5",
    title: "Share scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "share", "error"],
  },
  {
    id: "share-6",
    title: "Share scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "share", "empty"],
  },
  {
    id: "share-7",
    title: "Share scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "share", "ready"],
  },
  {
    id: "share-8",
    title: "Share scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "share", "loading"],
  },
  {
    id: "share-9",
    title: "Share scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "share", "success"],
  },
  {
    id: "share-10",
    title: "Share scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "share", "warning"],
  },
  {
    id: "share-11",
    title: "Share scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "share", "error"],
  },
  {
    id: "share-12",
    title: "Share scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "share", "empty"],
  },
  {
    id: "share-13",
    title: "Share scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "share", "ready"],
  },
  {
    id: "share-14",
    title: "Share scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "share", "loading"],
  },
  {
    id: "share-15",
    title: "Share scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "share", "success"],
  },
  {
    id: "share-16",
    title: "Share scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for share; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "share", "warning"],
  }
];
export function getShare(id:string): ShareFixture|undefined { return SHARE.find(item=>item.id===id); }
export function byStateShare(state:ShareFixture['state']): ShareFixture[] { return SHARE.filter(item=>item.state===state); }
export function featuredShare(): ShareFixture { return SHARE[0]; }
export function countShare(): number { return SHARE.length; }
export function summaryShare(): string { return `$<built-in function len> fixtures for share`; }
export const SHARE_README = "Use share fixtures for deterministic mock screenshots and scripted demo states.";
export const SHARE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorShare(): boolean { return SHARE.some(item=>item.state==='error'); }
export function hasLoadingShare(): boolean { return SHARE.some(item=>item.state==='loading'); }
export function hasEmptyShare(): boolean { return SHARE.some(item=>item.state==='empty'); }
export function averageScoreShare(): number { return Math.round(SHARE.reduce((a,b)=>a+b.score,0)/Math.max(SHARE.length,1)); }
export function maxScoreShare(): number { return Math.max(...SHARE.map(item=>item.score)); }
export function minScoreShare(): number { return Math.min(...SHARE.map(item=>item.score)); }
export const SHARE_VERSION = 'v6';
export const SHARE_SOURCE = 'demo-only';
export function isDemoOnlyShare(): true { return true; }
