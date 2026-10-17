/** Mock domain fixture: transition. */
export interface TransitionFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const TRANSITION: TransitionFixture[] = [
  {
    id: "transition-1",
    title: "Transition scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "transition", "ready"],
  },
  {
    id: "transition-2",
    title: "Transition scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "transition", "loading"],
  },
  {
    id: "transition-3",
    title: "Transition scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "transition", "success"],
  },
  {
    id: "transition-4",
    title: "Transition scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "transition", "warning"],
  },
  {
    id: "transition-5",
    title: "Transition scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "transition", "error"],
  },
  {
    id: "transition-6",
    title: "Transition scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "transition", "empty"],
  },
  {
    id: "transition-7",
    title: "Transition scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "transition", "ready"],
  },
  {
    id: "transition-8",
    title: "Transition scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "transition", "loading"],
  },
  {
    id: "transition-9",
    title: "Transition scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "transition", "success"],
  },
  {
    id: "transition-10",
    title: "Transition scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "transition", "warning"],
  },
  {
    id: "transition-11",
    title: "Transition scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "transition", "error"],
  },
  {
    id: "transition-12",
    title: "Transition scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "transition", "empty"],
  },
  {
    id: "transition-13",
    title: "Transition scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "transition", "ready"],
  },
  {
    id: "transition-14",
    title: "Transition scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "transition", "loading"],
  },
  {
    id: "transition-15",
    title: "Transition scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "transition", "success"],
  },
  {
    id: "transition-16",
    title: "Transition scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for transition; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "transition", "warning"],
  }
];
export function getTransition(id:string): TransitionFixture|undefined { return TRANSITION.find(item=>item.id===id); }
export function byStateTransition(state:TransitionFixture['state']): TransitionFixture[] { return TRANSITION.filter(item=>item.state===state); }
export function featuredTransition(): TransitionFixture { return TRANSITION[0]; }
export function countTransition(): number { return TRANSITION.length; }
export function summaryTransition(): string { return `$<built-in function len> fixtures for transition`; }
export const TRANSITION_README = "Use transition fixtures for deterministic mock screenshots and scripted demo states.";
export const TRANSITION_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorTransition(): boolean { return TRANSITION.some(item=>item.state==='error'); }
export function hasLoadingTransition(): boolean { return TRANSITION.some(item=>item.state==='loading'); }
export function hasEmptyTransition(): boolean { return TRANSITION.some(item=>item.state==='empty'); }
export function averageScoreTransition(): number { return Math.round(TRANSITION.reduce((a,b)=>a+b.score,0)/Math.max(TRANSITION.length,1)); }
export function maxScoreTransition(): number { return Math.max(...TRANSITION.map(item=>item.score)); }
export function minScoreTransition(): number { return Math.min(...TRANSITION.map(item=>item.score)); }
export const TRANSITION_VERSION = 'v6';
export const TRANSITION_SOURCE = 'demo-only';
export function isDemoOnlyTransition(): true { return true; }
