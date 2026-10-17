/** Mock domain fixture: preRound. */
export interface PreroundFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PREROUND: PreroundFixture[] = [
  {
    id: "preRound-1",
    title: "Preround scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "preRound", "ready"],
  },
  {
    id: "preRound-2",
    title: "Preround scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "preRound", "loading"],
  },
  {
    id: "preRound-3",
    title: "Preround scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "preRound", "success"],
  },
  {
    id: "preRound-4",
    title: "Preround scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "preRound", "warning"],
  },
  {
    id: "preRound-5",
    title: "Preround scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "preRound", "error"],
  },
  {
    id: "preRound-6",
    title: "Preround scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "preRound", "empty"],
  },
  {
    id: "preRound-7",
    title: "Preround scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "preRound", "ready"],
  },
  {
    id: "preRound-8",
    title: "Preround scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "preRound", "loading"],
  },
  {
    id: "preRound-9",
    title: "Preround scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "preRound", "success"],
  },
  {
    id: "preRound-10",
    title: "Preround scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "preRound", "warning"],
  },
  {
    id: "preRound-11",
    title: "Preround scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "preRound", "error"],
  },
  {
    id: "preRound-12",
    title: "Preround scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "preRound", "empty"],
  },
  {
    id: "preRound-13",
    title: "Preround scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "preRound", "ready"],
  },
  {
    id: "preRound-14",
    title: "Preround scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "preRound", "loading"],
  },
  {
    id: "preRound-15",
    title: "Preround scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "preRound", "success"],
  },
  {
    id: "preRound-16",
    title: "Preround scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for preRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "preRound", "warning"],
  }
];
export function getPreround(id:string): PreroundFixture|undefined { return PREROUND.find(item=>item.id===id); }
export function byStatePreround(state:PreroundFixture['state']): PreroundFixture[] { return PREROUND.filter(item=>item.state===state); }
export function featuredPreround(): PreroundFixture { return PREROUND[0]; }
export function countPreround(): number { return PREROUND.length; }
export function summaryPreround(): string { return `$<built-in function len> fixtures for preRound`; }
export const PREROUND_README = "Use preRound fixtures for deterministic mock screenshots and scripted demo states.";
export const PREROUND_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPreround(): boolean { return PREROUND.some(item=>item.state==='error'); }
export function hasLoadingPreround(): boolean { return PREROUND.some(item=>item.state==='loading'); }
export function hasEmptyPreround(): boolean { return PREROUND.some(item=>item.state==='empty'); }
export function averageScorePreround(): number { return Math.round(PREROUND.reduce((a,b)=>a+b.score,0)/Math.max(PREROUND.length,1)); }
export function maxScorePreround(): number { return Math.max(...PREROUND.map(item=>item.score)); }
export function minScorePreround(): number { return Math.min(...PREROUND.map(item=>item.score)); }
export const PREROUND_VERSION = 'v6';
export const PREROUND_SOURCE = 'demo-only';
export function isDemoOnlyPreround(): true { return true; }
