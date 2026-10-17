/** Mock domain fixture: restore. */
export interface RestoreFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const RESTORE: RestoreFixture[] = [
  {
    id: "restore-1",
    title: "Restore scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "restore", "ready"],
  },
  {
    id: "restore-2",
    title: "Restore scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "restore", "loading"],
  },
  {
    id: "restore-3",
    title: "Restore scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "restore", "success"],
  },
  {
    id: "restore-4",
    title: "Restore scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "restore", "warning"],
  },
  {
    id: "restore-5",
    title: "Restore scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "restore", "error"],
  },
  {
    id: "restore-6",
    title: "Restore scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "restore", "empty"],
  },
  {
    id: "restore-7",
    title: "Restore scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "restore", "ready"],
  },
  {
    id: "restore-8",
    title: "Restore scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "restore", "loading"],
  },
  {
    id: "restore-9",
    title: "Restore scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "restore", "success"],
  },
  {
    id: "restore-10",
    title: "Restore scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "restore", "warning"],
  },
  {
    id: "restore-11",
    title: "Restore scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "restore", "error"],
  },
  {
    id: "restore-12",
    title: "Restore scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "restore", "empty"],
  },
  {
    id: "restore-13",
    title: "Restore scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "restore", "ready"],
  },
  {
    id: "restore-14",
    title: "Restore scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "restore", "loading"],
  },
  {
    id: "restore-15",
    title: "Restore scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "restore", "success"],
  },
  {
    id: "restore-16",
    title: "Restore scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for restore; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "restore", "warning"],
  }
];
export function getRestore(id:string): RestoreFixture|undefined { return RESTORE.find(item=>item.id===id); }
export function byStateRestore(state:RestoreFixture['state']): RestoreFixture[] { return RESTORE.filter(item=>item.state===state); }
export function featuredRestore(): RestoreFixture { return RESTORE[0]; }
export function countRestore(): number { return RESTORE.length; }
export function summaryRestore(): string { return `$<built-in function len> fixtures for restore`; }
export const RESTORE_README = "Use restore fixtures for deterministic mock screenshots and scripted demo states.";
export const RESTORE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorRestore(): boolean { return RESTORE.some(item=>item.state==='error'); }
export function hasLoadingRestore(): boolean { return RESTORE.some(item=>item.state==='loading'); }
export function hasEmptyRestore(): boolean { return RESTORE.some(item=>item.state==='empty'); }
export function averageScoreRestore(): number { return Math.round(RESTORE.reduce((a,b)=>a+b.score,0)/Math.max(RESTORE.length,1)); }
export function maxScoreRestore(): number { return Math.max(...RESTORE.map(item=>item.score)); }
export function minScoreRestore(): number { return Math.min(...RESTORE.map(item=>item.score)); }
export const RESTORE_VERSION = 'v6';
export const RESTORE_SOURCE = 'demo-only';
export function isDemoOnlyRestore(): true { return true; }
