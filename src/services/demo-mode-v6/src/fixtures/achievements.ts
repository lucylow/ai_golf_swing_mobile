/** Mock domain fixture: achievements. */
export interface AchievementsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const ACHIEVEMENTS: AchievementsFixture[] = [
  {
    id: "achievements-1",
    title: "Achievements scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "achievements", "ready"],
  },
  {
    id: "achievements-2",
    title: "Achievements scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "achievements", "loading"],
  },
  {
    id: "achievements-3",
    title: "Achievements scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "achievements", "success"],
  },
  {
    id: "achievements-4",
    title: "Achievements scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "achievements", "warning"],
  },
  {
    id: "achievements-5",
    title: "Achievements scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "achievements", "error"],
  },
  {
    id: "achievements-6",
    title: "Achievements scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "achievements", "empty"],
  },
  {
    id: "achievements-7",
    title: "Achievements scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "achievements", "ready"],
  },
  {
    id: "achievements-8",
    title: "Achievements scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "achievements", "loading"],
  },
  {
    id: "achievements-9",
    title: "Achievements scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "achievements", "success"],
  },
  {
    id: "achievements-10",
    title: "Achievements scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "achievements", "warning"],
  },
  {
    id: "achievements-11",
    title: "Achievements scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "achievements", "error"],
  },
  {
    id: "achievements-12",
    title: "Achievements scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "achievements", "empty"],
  },
  {
    id: "achievements-13",
    title: "Achievements scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "achievements", "ready"],
  },
  {
    id: "achievements-14",
    title: "Achievements scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "achievements", "loading"],
  },
  {
    id: "achievements-15",
    title: "Achievements scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "achievements", "success"],
  },
  {
    id: "achievements-16",
    title: "Achievements scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for achievements; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "achievements", "warning"],
  }
];
export function getAchievements(id:string): AchievementsFixture|undefined { return ACHIEVEMENTS.find(item=>item.id===id); }
export function byStateAchievements(state:AchievementsFixture['state']): AchievementsFixture[] { return ACHIEVEMENTS.filter(item=>item.state===state); }
export function featuredAchievements(): AchievementsFixture { return ACHIEVEMENTS[0]; }
export function countAchievements(): number { return ACHIEVEMENTS.length; }
export function summaryAchievements(): string { return `$<built-in function len> fixtures for achievements`; }
export const ACHIEVEMENTS_README = "Use achievements fixtures for deterministic mock screenshots and scripted demo states.";
export const ACHIEVEMENTS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorAchievements(): boolean { return ACHIEVEMENTS.some(item=>item.state==='error'); }
export function hasLoadingAchievements(): boolean { return ACHIEVEMENTS.some(item=>item.state==='loading'); }
export function hasEmptyAchievements(): boolean { return ACHIEVEMENTS.some(item=>item.state==='empty'); }
export function averageScoreAchievements(): number { return Math.round(ACHIEVEMENTS.reduce((a,b)=>a+b.score,0)/Math.max(ACHIEVEMENTS.length,1)); }
export function maxScoreAchievements(): number { return Math.max(...ACHIEVEMENTS.map(item=>item.score)); }
export function minScoreAchievements(): number { return Math.min(...ACHIEVEMENTS.map(item=>item.score)); }
export const ACHIEVEMENTS_VERSION = 'v6';
export const ACHIEVEMENTS_SOURCE = 'demo-only';
export function isDemoOnlyAchievements(): true { return true; }
