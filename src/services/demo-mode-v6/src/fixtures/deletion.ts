/** Mock domain fixture: deletion. */
export interface DeletionFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const DELETION: DeletionFixture[] = [
  {
    id: "deletion-1",
    title: "Deletion scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "deletion", "ready"],
  },
  {
    id: "deletion-2",
    title: "Deletion scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "deletion", "loading"],
  },
  {
    id: "deletion-3",
    title: "Deletion scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "deletion", "success"],
  },
  {
    id: "deletion-4",
    title: "Deletion scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "deletion", "warning"],
  },
  {
    id: "deletion-5",
    title: "Deletion scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "deletion", "error"],
  },
  {
    id: "deletion-6",
    title: "Deletion scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "deletion", "empty"],
  },
  {
    id: "deletion-7",
    title: "Deletion scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "deletion", "ready"],
  },
  {
    id: "deletion-8",
    title: "Deletion scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "deletion", "loading"],
  },
  {
    id: "deletion-9",
    title: "Deletion scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "deletion", "success"],
  },
  {
    id: "deletion-10",
    title: "Deletion scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "deletion", "warning"],
  },
  {
    id: "deletion-11",
    title: "Deletion scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "deletion", "error"],
  },
  {
    id: "deletion-12",
    title: "Deletion scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "deletion", "empty"],
  },
  {
    id: "deletion-13",
    title: "Deletion scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "deletion", "ready"],
  },
  {
    id: "deletion-14",
    title: "Deletion scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "deletion", "loading"],
  },
  {
    id: "deletion-15",
    title: "Deletion scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "deletion", "success"],
  },
  {
    id: "deletion-16",
    title: "Deletion scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for deletion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "deletion", "warning"],
  }
];
export function getDeletion(id:string): DeletionFixture|undefined { return DELETION.find(item=>item.id===id); }
export function byStateDeletion(state:DeletionFixture['state']): DeletionFixture[] { return DELETION.filter(item=>item.state===state); }
export function featuredDeletion(): DeletionFixture { return DELETION[0]; }
export function countDeletion(): number { return DELETION.length; }
export function summaryDeletion(): string { return `$<built-in function len> fixtures for deletion`; }
export const DELETION_README = "Use deletion fixtures for deterministic mock screenshots and scripted demo states.";
export const DELETION_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorDeletion(): boolean { return DELETION.some(item=>item.state==='error'); }
export function hasLoadingDeletion(): boolean { return DELETION.some(item=>item.state==='loading'); }
export function hasEmptyDeletion(): boolean { return DELETION.some(item=>item.state==='empty'); }
export function averageScoreDeletion(): number { return Math.round(DELETION.reduce((a,b)=>a+b.score,0)/Math.max(DELETION.length,1)); }
export function maxScoreDeletion(): number { return Math.max(...DELETION.map(item=>item.score)); }
export function minScoreDeletion(): number { return Math.min(...DELETION.map(item=>item.score)); }
export const DELETION_VERSION = 'v6';
export const DELETION_SOURCE = 'demo-only';
export function isDemoOnlyDeletion(): true { return true; }
