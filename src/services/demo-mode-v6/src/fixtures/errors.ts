/** Mock domain fixture: errors. */
export interface ErrorsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const ERRORS: ErrorsFixture[] = [
  {
    id: "errors-1",
    title: "Errors scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "errors", "ready"],
  },
  {
    id: "errors-2",
    title: "Errors scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "errors", "loading"],
  },
  {
    id: "errors-3",
    title: "Errors scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "errors", "success"],
  },
  {
    id: "errors-4",
    title: "Errors scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "errors", "warning"],
  },
  {
    id: "errors-5",
    title: "Errors scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "errors", "error"],
  },
  {
    id: "errors-6",
    title: "Errors scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "errors", "empty"],
  },
  {
    id: "errors-7",
    title: "Errors scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "errors", "ready"],
  },
  {
    id: "errors-8",
    title: "Errors scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "errors", "loading"],
  },
  {
    id: "errors-9",
    title: "Errors scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "errors", "success"],
  },
  {
    id: "errors-10",
    title: "Errors scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "errors", "warning"],
  },
  {
    id: "errors-11",
    title: "Errors scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "errors", "error"],
  },
  {
    id: "errors-12",
    title: "Errors scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "errors", "empty"],
  },
  {
    id: "errors-13",
    title: "Errors scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "errors", "ready"],
  },
  {
    id: "errors-14",
    title: "Errors scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "errors", "loading"],
  },
  {
    id: "errors-15",
    title: "Errors scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "errors", "success"],
  },
  {
    id: "errors-16",
    title: "Errors scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for errors; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "errors", "warning"],
  }
];
export function getErrors(id:string): ErrorsFixture|undefined { return ERRORS.find(item=>item.id===id); }
export function byStateErrors(state:ErrorsFixture['state']): ErrorsFixture[] { return ERRORS.filter(item=>item.state===state); }
export function featuredErrors(): ErrorsFixture { return ERRORS[0]; }
export function countErrors(): number { return ERRORS.length; }
export function summaryErrors(): string { return `$<built-in function len> fixtures for errors`; }
export const ERRORS_README = "Use errors fixtures for deterministic mock screenshots and scripted demo states.";
export const ERRORS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorErrors(): boolean { return ERRORS.some(item=>item.state==='error'); }
export function hasLoadingErrors(): boolean { return ERRORS.some(item=>item.state==='loading'); }
export function hasEmptyErrors(): boolean { return ERRORS.some(item=>item.state==='empty'); }
export function averageScoreErrors(): number { return Math.round(ERRORS.reduce((a,b)=>a+b.score,0)/Math.max(ERRORS.length,1)); }
export function maxScoreErrors(): number { return Math.max(...ERRORS.map(item=>item.score)); }
export function minScoreErrors(): number { return Math.min(...ERRORS.map(item=>item.score)); }
export const ERRORS_VERSION = 'v6';
export const ERRORS_SOURCE = 'demo-only';
export function isDemoOnlyErrors(): true { return true; }
