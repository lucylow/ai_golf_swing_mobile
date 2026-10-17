/** Mock domain fixture: recap. */
export interface RecapFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const RECAP: RecapFixture[] = [
  {
    id: "recap-1",
    title: "Recap scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "recap", "ready"],
  },
  {
    id: "recap-2",
    title: "Recap scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "recap", "loading"],
  },
  {
    id: "recap-3",
    title: "Recap scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "recap", "success"],
  },
  {
    id: "recap-4",
    title: "Recap scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "recap", "warning"],
  },
  {
    id: "recap-5",
    title: "Recap scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "recap", "error"],
  },
  {
    id: "recap-6",
    title: "Recap scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "recap", "empty"],
  },
  {
    id: "recap-7",
    title: "Recap scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "recap", "ready"],
  },
  {
    id: "recap-8",
    title: "Recap scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "recap", "loading"],
  },
  {
    id: "recap-9",
    title: "Recap scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "recap", "success"],
  },
  {
    id: "recap-10",
    title: "Recap scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "recap", "warning"],
  },
  {
    id: "recap-11",
    title: "Recap scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "recap", "error"],
  },
  {
    id: "recap-12",
    title: "Recap scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "recap", "empty"],
  },
  {
    id: "recap-13",
    title: "Recap scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "recap", "ready"],
  },
  {
    id: "recap-14",
    title: "Recap scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "recap", "loading"],
  },
  {
    id: "recap-15",
    title: "Recap scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "recap", "success"],
  },
  {
    id: "recap-16",
    title: "Recap scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for recap; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "recap", "warning"],
  }
];
export function getRecap(id:string): RecapFixture|undefined { return RECAP.find(item=>item.id===id); }
export function byStateRecap(state:RecapFixture['state']): RecapFixture[] { return RECAP.filter(item=>item.state===state); }
export function featuredRecap(): RecapFixture { return RECAP[0]; }
export function countRecap(): number { return RECAP.length; }
export function summaryRecap(): string { return `$<built-in function len> fixtures for recap`; }
export const RECAP_README = "Use recap fixtures for deterministic mock screenshots and scripted demo states.";
export const RECAP_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorRecap(): boolean { return RECAP.some(item=>item.state==='error'); }
export function hasLoadingRecap(): boolean { return RECAP.some(item=>item.state==='loading'); }
export function hasEmptyRecap(): boolean { return RECAP.some(item=>item.state==='empty'); }
export function averageScoreRecap(): number { return Math.round(RECAP.reduce((a,b)=>a+b.score,0)/Math.max(RECAP.length,1)); }
export function maxScoreRecap(): number { return Math.max(...RECAP.map(item=>item.score)); }
export function minScoreRecap(): number { return Math.min(...RECAP.map(item=>item.score)); }
export const RECAP_VERSION = 'v6';
export const RECAP_SOURCE = 'demo-only';
export function isDemoOnlyRecap(): true { return true; }
