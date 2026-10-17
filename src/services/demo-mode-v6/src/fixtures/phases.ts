/** Mock domain fixture: phases. */
export interface PhasesFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PHASES: PhasesFixture[] = [
  {
    id: "phases-1",
    title: "Phases scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "phases", "ready"],
  },
  {
    id: "phases-2",
    title: "Phases scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "phases", "loading"],
  },
  {
    id: "phases-3",
    title: "Phases scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "phases", "success"],
  },
  {
    id: "phases-4",
    title: "Phases scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "phases", "warning"],
  },
  {
    id: "phases-5",
    title: "Phases scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "phases", "error"],
  },
  {
    id: "phases-6",
    title: "Phases scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "phases", "empty"],
  },
  {
    id: "phases-7",
    title: "Phases scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "phases", "ready"],
  },
  {
    id: "phases-8",
    title: "Phases scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "phases", "loading"],
  },
  {
    id: "phases-9",
    title: "Phases scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "phases", "success"],
  },
  {
    id: "phases-10",
    title: "Phases scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "phases", "warning"],
  },
  {
    id: "phases-11",
    title: "Phases scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "phases", "error"],
  },
  {
    id: "phases-12",
    title: "Phases scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "phases", "empty"],
  },
  {
    id: "phases-13",
    title: "Phases scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "phases", "ready"],
  },
  {
    id: "phases-14",
    title: "Phases scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "phases", "loading"],
  },
  {
    id: "phases-15",
    title: "Phases scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "phases", "success"],
  },
  {
    id: "phases-16",
    title: "Phases scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for phases; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "phases", "warning"],
  }
];
export function getPhases(id:string): PhasesFixture|undefined { return PHASES.find(item=>item.id===id); }
export function byStatePhases(state:PhasesFixture['state']): PhasesFixture[] { return PHASES.filter(item=>item.state===state); }
export function featuredPhases(): PhasesFixture { return PHASES[0]; }
export function countPhases(): number { return PHASES.length; }
export function summaryPhases(): string { return `$<built-in function len> fixtures for phases`; }
export const PHASES_README = "Use phases fixtures for deterministic mock screenshots and scripted demo states.";
export const PHASES_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPhases(): boolean { return PHASES.some(item=>item.state==='error'); }
export function hasLoadingPhases(): boolean { return PHASES.some(item=>item.state==='loading'); }
export function hasEmptyPhases(): boolean { return PHASES.some(item=>item.state==='empty'); }
export function averageScorePhases(): number { return Math.round(PHASES.reduce((a,b)=>a+b.score,0)/Math.max(PHASES.length,1)); }
export function maxScorePhases(): number { return Math.max(...PHASES.map(item=>item.score)); }
export function minScorePhases(): number { return Math.min(...PHASES.map(item=>item.score)); }
export const PHASES_VERSION = 'v6';
export const PHASES_SOURCE = 'demo-only';
export function isDemoOnlyPhases(): true { return true; }
