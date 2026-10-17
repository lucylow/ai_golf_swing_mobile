/** Mock domain fixture: coach. */
export interface CoachFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const COACH: CoachFixture[] = [
  {
    id: "coach-1",
    title: "Coach scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "coach", "ready"],
  },
  {
    id: "coach-2",
    title: "Coach scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "coach", "loading"],
  },
  {
    id: "coach-3",
    title: "Coach scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "coach", "success"],
  },
  {
    id: "coach-4",
    title: "Coach scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "coach", "warning"],
  },
  {
    id: "coach-5",
    title: "Coach scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "coach", "error"],
  },
  {
    id: "coach-6",
    title: "Coach scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "coach", "empty"],
  },
  {
    id: "coach-7",
    title: "Coach scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "coach", "ready"],
  },
  {
    id: "coach-8",
    title: "Coach scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "coach", "loading"],
  },
  {
    id: "coach-9",
    title: "Coach scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "coach", "success"],
  },
  {
    id: "coach-10",
    title: "Coach scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "coach", "warning"],
  },
  {
    id: "coach-11",
    title: "Coach scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "coach", "error"],
  },
  {
    id: "coach-12",
    title: "Coach scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "coach", "empty"],
  },
  {
    id: "coach-13",
    title: "Coach scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "coach", "ready"],
  },
  {
    id: "coach-14",
    title: "Coach scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "coach", "loading"],
  },
  {
    id: "coach-15",
    title: "Coach scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "coach", "success"],
  },
  {
    id: "coach-16",
    title: "Coach scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for coach; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "coach", "warning"],
  }
];
export function getCoach(id:string): CoachFixture|undefined { return COACH.find(item=>item.id===id); }
export function byStateCoach(state:CoachFixture['state']): CoachFixture[] { return COACH.filter(item=>item.state===state); }
export function featuredCoach(): CoachFixture { return COACH[0]; }
export function countCoach(): number { return COACH.length; }
export function summaryCoach(): string { return `$<built-in function len> fixtures for coach`; }
export const COACH_README = "Use coach fixtures for deterministic mock screenshots and scripted demo states.";
export const COACH_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorCoach(): boolean { return COACH.some(item=>item.state==='error'); }
export function hasLoadingCoach(): boolean { return COACH.some(item=>item.state==='loading'); }
export function hasEmptyCoach(): boolean { return COACH.some(item=>item.state==='empty'); }
export function averageScoreCoach(): number { return Math.round(COACH.reduce((a,b)=>a+b.score,0)/Math.max(COACH.length,1)); }
export function maxScoreCoach(): number { return Math.max(...COACH.map(item=>item.score)); }
export function minScoreCoach(): number { return Math.min(...COACH.map(item=>item.score)); }
export const COACH_VERSION = 'v6';
export const COACH_SOURCE = 'demo-only';
export function isDemoOnlyCoach(): true { return true; }
