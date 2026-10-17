/** Mock domain fixture: history. */
export interface HistoryFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const HISTORY: HistoryFixture[] = [
  {
    id: "history-1",
    title: "History scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "history", "ready"],
  },
  {
    id: "history-2",
    title: "History scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "history", "loading"],
  },
  {
    id: "history-3",
    title: "History scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "history", "success"],
  },
  {
    id: "history-4",
    title: "History scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "history", "warning"],
  },
  {
    id: "history-5",
    title: "History scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "history", "error"],
  },
  {
    id: "history-6",
    title: "History scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "history", "empty"],
  },
  {
    id: "history-7",
    title: "History scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "history", "ready"],
  },
  {
    id: "history-8",
    title: "History scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "history", "loading"],
  },
  {
    id: "history-9",
    title: "History scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "history", "success"],
  },
  {
    id: "history-10",
    title: "History scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "history", "warning"],
  },
  {
    id: "history-11",
    title: "History scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "history", "error"],
  },
  {
    id: "history-12",
    title: "History scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "history", "empty"],
  },
  {
    id: "history-13",
    title: "History scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "history", "ready"],
  },
  {
    id: "history-14",
    title: "History scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "history", "loading"],
  },
  {
    id: "history-15",
    title: "History scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "history", "success"],
  },
  {
    id: "history-16",
    title: "History scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for history; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "history", "warning"],
  }
];
export function getHistory(id:string): HistoryFixture|undefined { return HISTORY.find(item=>item.id===id); }
export function byStateHistory(state:HistoryFixture['state']): HistoryFixture[] { return HISTORY.filter(item=>item.state===state); }
export function featuredHistory(): HistoryFixture { return HISTORY[0]; }
export function countHistory(): number { return HISTORY.length; }
export function summaryHistory(): string { return `$<built-in function len> fixtures for history`; }
export const HISTORY_README = "Use history fixtures for deterministic mock screenshots and scripted demo states.";
export const HISTORY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorHistory(): boolean { return HISTORY.some(item=>item.state==='error'); }
export function hasLoadingHistory(): boolean { return HISTORY.some(item=>item.state==='loading'); }
export function hasEmptyHistory(): boolean { return HISTORY.some(item=>item.state==='empty'); }
export function averageScoreHistory(): number { return Math.round(HISTORY.reduce((a,b)=>a+b.score,0)/Math.max(HISTORY.length,1)); }
export function maxScoreHistory(): number { return Math.max(...HISTORY.map(item=>item.score)); }
export function minScoreHistory(): number { return Math.min(...HISTORY.map(item=>item.score)); }
export const HISTORY_VERSION = 'v6';
export const HISTORY_SOURCE = 'demo-only';
export function isDemoOnlyHistory(): true { return true; }
