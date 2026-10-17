/** Mock domain fixture: usergoals. */
export interface UsergoalsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const USERGOALS: UsergoalsFixture[] = [
  {
    id: "usergoals-1",
    title: "Usergoals scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "usergoals", "ready"],
  },
  {
    id: "usergoals-2",
    title: "Usergoals scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "usergoals", "loading"],
  },
  {
    id: "usergoals-3",
    title: "Usergoals scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "usergoals", "success"],
  },
  {
    id: "usergoals-4",
    title: "Usergoals scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "usergoals", "warning"],
  },
  {
    id: "usergoals-5",
    title: "Usergoals scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "usergoals", "error"],
  },
  {
    id: "usergoals-6",
    title: "Usergoals scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "usergoals", "empty"],
  },
  {
    id: "usergoals-7",
    title: "Usergoals scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "usergoals", "ready"],
  },
  {
    id: "usergoals-8",
    title: "Usergoals scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "usergoals", "loading"],
  },
  {
    id: "usergoals-9",
    title: "Usergoals scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "usergoals", "success"],
  },
  {
    id: "usergoals-10",
    title: "Usergoals scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "usergoals", "warning"],
  },
  {
    id: "usergoals-11",
    title: "Usergoals scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "usergoals", "error"],
  },
  {
    id: "usergoals-12",
    title: "Usergoals scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "usergoals", "empty"],
  },
  {
    id: "usergoals-13",
    title: "Usergoals scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "usergoals", "ready"],
  },
  {
    id: "usergoals-14",
    title: "Usergoals scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "usergoals", "loading"],
  },
  {
    id: "usergoals-15",
    title: "Usergoals scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "usergoals", "success"],
  },
  {
    id: "usergoals-16",
    title: "Usergoals scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for usergoals; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "usergoals", "warning"],
  }
];
export function getUsergoals(id:string): UsergoalsFixture|undefined { return USERGOALS.find(item=>item.id===id); }
export function byStateUsergoals(state:UsergoalsFixture['state']): UsergoalsFixture[] { return USERGOALS.filter(item=>item.state===state); }
export function featuredUsergoals(): UsergoalsFixture { return USERGOALS[0]; }
export function countUsergoals(): number { return USERGOALS.length; }
export function summaryUsergoals(): string { return `$<built-in function len> fixtures for usergoals`; }
export const USERGOALS_README = "Use usergoals fixtures for deterministic mock screenshots and scripted demo states.";
export const USERGOALS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorUsergoals(): boolean { return USERGOALS.some(item=>item.state==='error'); }
export function hasLoadingUsergoals(): boolean { return USERGOALS.some(item=>item.state==='loading'); }
export function hasEmptyUsergoals(): boolean { return USERGOALS.some(item=>item.state==='empty'); }
export function averageScoreUsergoals(): number { return Math.round(USERGOALS.reduce((a,b)=>a+b.score,0)/Math.max(USERGOALS.length,1)); }
export function maxScoreUsergoals(): number { return Math.max(...USERGOALS.map(item=>item.score)); }
export function minScoreUsergoals(): number { return Math.min(...USERGOALS.map(item=>item.score)); }
export const USERGOALS_VERSION = 'v6';
export const USERGOALS_SOURCE = 'demo-only';
export function isDemoOnlyUsergoals(): true { return true; }
