/** Mock domain fixture: progress. */
export interface ProgressFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PROGRESS: ProgressFixture[] = [
  {
    id: "progress-1",
    title: "Progress scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "progress", "ready"],
  },
  {
    id: "progress-2",
    title: "Progress scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "progress", "loading"],
  },
  {
    id: "progress-3",
    title: "Progress scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "progress", "success"],
  },
  {
    id: "progress-4",
    title: "Progress scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "progress", "warning"],
  },
  {
    id: "progress-5",
    title: "Progress scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "progress", "error"],
  },
  {
    id: "progress-6",
    title: "Progress scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "progress", "empty"],
  },
  {
    id: "progress-7",
    title: "Progress scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "progress", "ready"],
  },
  {
    id: "progress-8",
    title: "Progress scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "progress", "loading"],
  },
  {
    id: "progress-9",
    title: "Progress scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "progress", "success"],
  },
  {
    id: "progress-10",
    title: "Progress scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "progress", "warning"],
  },
  {
    id: "progress-11",
    title: "Progress scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "progress", "error"],
  },
  {
    id: "progress-12",
    title: "Progress scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "progress", "empty"],
  },
  {
    id: "progress-13",
    title: "Progress scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "progress", "ready"],
  },
  {
    id: "progress-14",
    title: "Progress scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "progress", "loading"],
  },
  {
    id: "progress-15",
    title: "Progress scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "progress", "success"],
  },
  {
    id: "progress-16",
    title: "Progress scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for progress; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "progress", "warning"],
  }
];
export function getProgress(id:string): ProgressFixture|undefined { return PROGRESS.find(item=>item.id===id); }
export function byStateProgress(state:ProgressFixture['state']): ProgressFixture[] { return PROGRESS.filter(item=>item.state===state); }
export function featuredProgress(): ProgressFixture { return PROGRESS[0]; }
export function countProgress(): number { return PROGRESS.length; }
export function summaryProgress(): string { return `$<built-in function len> fixtures for progress`; }
export const PROGRESS_README = "Use progress fixtures for deterministic mock screenshots and scripted demo states.";
export const PROGRESS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorProgress(): boolean { return PROGRESS.some(item=>item.state==='error'); }
export function hasLoadingProgress(): boolean { return PROGRESS.some(item=>item.state==='loading'); }
export function hasEmptyProgress(): boolean { return PROGRESS.some(item=>item.state==='empty'); }
export function averageScoreProgress(): number { return Math.round(PROGRESS.reduce((a,b)=>a+b.score,0)/Math.max(PROGRESS.length,1)); }
export function maxScoreProgress(): number { return Math.max(...PROGRESS.map(item=>item.score)); }
export function minScoreProgress(): number { return Math.min(...PROGRESS.map(item=>item.score)); }
export const PROGRESS_VERSION = 'v6';
export const PROGRESS_SOURCE = 'demo-only';
export function isDemoOnlyProgress(): true { return true; }
