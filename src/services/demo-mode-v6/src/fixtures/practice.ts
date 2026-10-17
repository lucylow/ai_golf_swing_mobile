/** Mock domain fixture: practice. */
export interface PracticeFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PRACTICE: PracticeFixture[] = [
  {
    id: "practice-1",
    title: "Practice scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "practice", "ready"],
  },
  {
    id: "practice-2",
    title: "Practice scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "practice", "loading"],
  },
  {
    id: "practice-3",
    title: "Practice scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "practice", "success"],
  },
  {
    id: "practice-4",
    title: "Practice scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "practice", "warning"],
  },
  {
    id: "practice-5",
    title: "Practice scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "practice", "error"],
  },
  {
    id: "practice-6",
    title: "Practice scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "practice", "empty"],
  },
  {
    id: "practice-7",
    title: "Practice scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "practice", "ready"],
  },
  {
    id: "practice-8",
    title: "Practice scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "practice", "loading"],
  },
  {
    id: "practice-9",
    title: "Practice scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "practice", "success"],
  },
  {
    id: "practice-10",
    title: "Practice scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "practice", "warning"],
  },
  {
    id: "practice-11",
    title: "Practice scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "practice", "error"],
  },
  {
    id: "practice-12",
    title: "Practice scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "practice", "empty"],
  },
  {
    id: "practice-13",
    title: "Practice scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "practice", "ready"],
  },
  {
    id: "practice-14",
    title: "Practice scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "practice", "loading"],
  },
  {
    id: "practice-15",
    title: "Practice scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "practice", "success"],
  },
  {
    id: "practice-16",
    title: "Practice scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for practice; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "practice", "warning"],
  }
];
export function getPractice(id:string): PracticeFixture|undefined { return PRACTICE.find(item=>item.id===id); }
export function byStatePractice(state:PracticeFixture['state']): PracticeFixture[] { return PRACTICE.filter(item=>item.state===state); }
export function featuredPractice(): PracticeFixture { return PRACTICE[0]; }
export function countPractice(): number { return PRACTICE.length; }
export function summaryPractice(): string { return `$<built-in function len> fixtures for practice`; }
export const PRACTICE_README = "Use practice fixtures for deterministic mock screenshots and scripted demo states.";
export const PRACTICE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPractice(): boolean { return PRACTICE.some(item=>item.state==='error'); }
export function hasLoadingPractice(): boolean { return PRACTICE.some(item=>item.state==='loading'); }
export function hasEmptyPractice(): boolean { return PRACTICE.some(item=>item.state==='empty'); }
export function averageScorePractice(): number { return Math.round(PRACTICE.reduce((a,b)=>a+b.score,0)/Math.max(PRACTICE.length,1)); }
export function maxScorePractice(): number { return Math.max(...PRACTICE.map(item=>item.score)); }
export function minScorePractice(): number { return Math.min(...PRACTICE.map(item=>item.score)); }
export const PRACTICE_VERSION = 'v6';
export const PRACTICE_SOURCE = 'demo-only';
export function isDemoOnlyPractice(): true { return true; }
