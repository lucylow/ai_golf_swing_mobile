/** Mock domain fixture: coachchat. */
export interface CoachchatFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const COACHCHAT: CoachchatFixture[] = [
  {
    id: "coachchat-1",
    title: "Coachchat scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "coachchat", "ready"],
  },
  {
    id: "coachchat-2",
    title: "Coachchat scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "coachchat", "loading"],
  },
  {
    id: "coachchat-3",
    title: "Coachchat scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "coachchat", "success"],
  },
  {
    id: "coachchat-4",
    title: "Coachchat scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "coachchat", "warning"],
  },
  {
    id: "coachchat-5",
    title: "Coachchat scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "coachchat", "error"],
  },
  {
    id: "coachchat-6",
    title: "Coachchat scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "coachchat", "empty"],
  },
  {
    id: "coachchat-7",
    title: "Coachchat scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "coachchat", "ready"],
  },
  {
    id: "coachchat-8",
    title: "Coachchat scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "coachchat", "loading"],
  },
  {
    id: "coachchat-9",
    title: "Coachchat scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "coachchat", "success"],
  },
  {
    id: "coachchat-10",
    title: "Coachchat scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "coachchat", "warning"],
  },
  {
    id: "coachchat-11",
    title: "Coachchat scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "coachchat", "error"],
  },
  {
    id: "coachchat-12",
    title: "Coachchat scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "coachchat", "empty"],
  },
  {
    id: "coachchat-13",
    title: "Coachchat scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "coachchat", "ready"],
  },
  {
    id: "coachchat-14",
    title: "Coachchat scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "coachchat", "loading"],
  },
  {
    id: "coachchat-15",
    title: "Coachchat scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "coachchat", "success"],
  },
  {
    id: "coachchat-16",
    title: "Coachchat scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for coachchat; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "coachchat", "warning"],
  }
];
export function getCoachchat(id:string): CoachchatFixture|undefined { return COACHCHAT.find(item=>item.id===id); }
export function byStateCoachchat(state:CoachchatFixture['state']): CoachchatFixture[] { return COACHCHAT.filter(item=>item.state===state); }
export function featuredCoachchat(): CoachchatFixture { return COACHCHAT[0]; }
export function countCoachchat(): number { return COACHCHAT.length; }
export function summaryCoachchat(): string { return `$<built-in function len> fixtures for coachchat`; }
export const COACHCHAT_README = "Use coachchat fixtures for deterministic mock screenshots and scripted demo states.";
export const COACHCHAT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorCoachchat(): boolean { return COACHCHAT.some(item=>item.state==='error'); }
export function hasLoadingCoachchat(): boolean { return COACHCHAT.some(item=>item.state==='loading'); }
export function hasEmptyCoachchat(): boolean { return COACHCHAT.some(item=>item.state==='empty'); }
export function averageScoreCoachchat(): number { return Math.round(COACHCHAT.reduce((a,b)=>a+b.score,0)/Math.max(COACHCHAT.length,1)); }
export function maxScoreCoachchat(): number { return Math.max(...COACHCHAT.map(item=>item.score)); }
export function minScoreCoachchat(): number { return Math.min(...COACHCHAT.map(item=>item.score)); }
export const COACHCHAT_VERSION = 'v6';
export const COACHCHAT_SOURCE = 'demo-only';
export function isDemoOnlyCoachchat(): true { return true; }
