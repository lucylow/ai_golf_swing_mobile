/** Mock domain fixture: clubfit. */
export interface ClubfitFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const CLUBFIT: ClubfitFixture[] = [
  {
    id: "clubfit-1",
    title: "Clubfit scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "clubfit", "ready"],
  },
  {
    id: "clubfit-2",
    title: "Clubfit scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "clubfit", "loading"],
  },
  {
    id: "clubfit-3",
    title: "Clubfit scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "clubfit", "success"],
  },
  {
    id: "clubfit-4",
    title: "Clubfit scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "clubfit", "warning"],
  },
  {
    id: "clubfit-5",
    title: "Clubfit scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "clubfit", "error"],
  },
  {
    id: "clubfit-6",
    title: "Clubfit scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "clubfit", "empty"],
  },
  {
    id: "clubfit-7",
    title: "Clubfit scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "clubfit", "ready"],
  },
  {
    id: "clubfit-8",
    title: "Clubfit scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "clubfit", "loading"],
  },
  {
    id: "clubfit-9",
    title: "Clubfit scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "clubfit", "success"],
  },
  {
    id: "clubfit-10",
    title: "Clubfit scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "clubfit", "warning"],
  },
  {
    id: "clubfit-11",
    title: "Clubfit scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "clubfit", "error"],
  },
  {
    id: "clubfit-12",
    title: "Clubfit scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "clubfit", "empty"],
  },
  {
    id: "clubfit-13",
    title: "Clubfit scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "clubfit", "ready"],
  },
  {
    id: "clubfit-14",
    title: "Clubfit scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "clubfit", "loading"],
  },
  {
    id: "clubfit-15",
    title: "Clubfit scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "clubfit", "success"],
  },
  {
    id: "clubfit-16",
    title: "Clubfit scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for clubfit; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "clubfit", "warning"],
  }
];
export function getClubfit(id:string): ClubfitFixture|undefined { return CLUBFIT.find(item=>item.id===id); }
export function byStateClubfit(state:ClubfitFixture['state']): ClubfitFixture[] { return CLUBFIT.filter(item=>item.state===state); }
export function featuredClubfit(): ClubfitFixture { return CLUBFIT[0]; }
export function countClubfit(): number { return CLUBFIT.length; }
export function summaryClubfit(): string { return `$<built-in function len> fixtures for clubfit`; }
export const CLUBFIT_README = "Use clubfit fixtures for deterministic mock screenshots and scripted demo states.";
export const CLUBFIT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorClubfit(): boolean { return CLUBFIT.some(item=>item.state==='error'); }
export function hasLoadingClubfit(): boolean { return CLUBFIT.some(item=>item.state==='loading'); }
export function hasEmptyClubfit(): boolean { return CLUBFIT.some(item=>item.state==='empty'); }
export function averageScoreClubfit(): number { return Math.round(CLUBFIT.reduce((a,b)=>a+b.score,0)/Math.max(CLUBFIT.length,1)); }
export function maxScoreClubfit(): number { return Math.max(...CLUBFIT.map(item=>item.score)); }
export function minScoreClubfit(): number { return Math.min(...CLUBFIT.map(item=>item.score)); }
export const CLUBFIT_VERSION = 'v6';
export const CLUBFIT_SOURCE = 'demo-only';
export function isDemoOnlyClubfit(): true { return true; }
