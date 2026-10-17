/** Mock domain fixture: goals. */
export interface GoalsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const GOALS: GoalsFixture[] = [
  {
    id: "goals-1",
    title: "Goals scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "goals", "ready"],
  },
  {
    id: "goals-2",
    title: "Goals scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "goals", "loading"],
  },
  {
    id: "goals-3",
    title: "Goals scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "goals", "success"],
  },
  {
    id: "goals-4",
    title: "Goals scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "goals", "warning"],
  },
  {
    id: "goals-5",
    title: "Goals scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "goals", "error"],
  },
  {
    id: "goals-6",
    title: "Goals scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "goals", "empty"],
  },
  {
    id: "goals-7",
    title: "Goals scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "goals", "ready"],
  },
  {
    id: "goals-8",
    title: "Goals scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "goals", "loading"],
  },
  {
    id: "goals-9",
    title: "Goals scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "goals", "success"],
  },
  {
    id: "goals-10",
    title: "Goals scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "goals", "warning"],
  },
  {
    id: "goals-11",
    title: "Goals scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "goals", "error"],
  },
  {
    id: "goals-12",
    title: "Goals scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "goals", "empty"],
  },
  {
    id: "goals-13",
    title: "Goals scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "goals", "ready"],
  },
  {
    id: "goals-14",
    title: "Goals scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "goals", "loading"],
  },
  {
    id: "goals-15",
    title: "Goals scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "goals", "success"],
  },
  {
    id: "goals-16",
    title: "Goals scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for goals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "goals", "warning"],
  }
];
export function getGoals(id:string): GoalsFixture|undefined { return GOALS.find(item=>item.id===id); }
export function byStateGoals(state:GoalsFixture['state']): GoalsFixture[] { return GOALS.filter(item=>item.state===state); }
export function featuredGoals(): GoalsFixture { return GOALS[0]; }
export function countGoals(): number { return GOALS.length; }
export function summaryGoals(): string { return `$<built-in function len> fixtures for goals`; }
export const GOALS_README = "Use goals fixtures for deterministic mock screenshots and scripted demo states.";
export const GOALS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorGoals(): boolean { return GOALS.some(item=>item.state==='error'); }
export function hasLoadingGoals(): boolean { return GOALS.some(item=>item.state==='loading'); }
export function hasEmptyGoals(): boolean { return GOALS.some(item=>item.state==='empty'); }
export function averageScoreGoals(): number { return Math.round(GOALS.reduce((a,b)=>a+b.score,0)/Math.max(GOALS.length,1)); }
export function maxScoreGoals(): number { return Math.max(...GOALS.map(item=>item.score)); }
export function minScoreGoals(): number { return Math.min(...GOALS.map(item=>item.score)); }
export const GOALS_VERSION = 'v6';
export const GOALS_SOURCE = 'demo-only';
export function isDemoOnlyGoals(): true { return true; }
