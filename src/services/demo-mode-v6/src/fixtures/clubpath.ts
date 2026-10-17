/** Mock domain fixture: clubpath. */
export interface ClubpathFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const CLUBPATH: ClubpathFixture[] = [
  {
    id: "clubpath-1",
    title: "Clubpath scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "clubpath", "ready"],
  },
  {
    id: "clubpath-2",
    title: "Clubpath scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "clubpath", "loading"],
  },
  {
    id: "clubpath-3",
    title: "Clubpath scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "clubpath", "success"],
  },
  {
    id: "clubpath-4",
    title: "Clubpath scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "clubpath", "warning"],
  },
  {
    id: "clubpath-5",
    title: "Clubpath scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "clubpath", "error"],
  },
  {
    id: "clubpath-6",
    title: "Clubpath scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "clubpath", "empty"],
  },
  {
    id: "clubpath-7",
    title: "Clubpath scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "clubpath", "ready"],
  },
  {
    id: "clubpath-8",
    title: "Clubpath scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "clubpath", "loading"],
  },
  {
    id: "clubpath-9",
    title: "Clubpath scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "clubpath", "success"],
  },
  {
    id: "clubpath-10",
    title: "Clubpath scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "clubpath", "warning"],
  },
  {
    id: "clubpath-11",
    title: "Clubpath scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "clubpath", "error"],
  },
  {
    id: "clubpath-12",
    title: "Clubpath scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "clubpath", "empty"],
  },
  {
    id: "clubpath-13",
    title: "Clubpath scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "clubpath", "ready"],
  },
  {
    id: "clubpath-14",
    title: "Clubpath scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "clubpath", "loading"],
  },
  {
    id: "clubpath-15",
    title: "Clubpath scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "clubpath", "success"],
  },
  {
    id: "clubpath-16",
    title: "Clubpath scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for clubpath; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "clubpath", "warning"],
  }
];
export function getClubpath(id:string): ClubpathFixture|undefined { return CLUBPATH.find(item=>item.id===id); }
export function byStateClubpath(state:ClubpathFixture['state']): ClubpathFixture[] { return CLUBPATH.filter(item=>item.state===state); }
export function featuredClubpath(): ClubpathFixture { return CLUBPATH[0]; }
export function countClubpath(): number { return CLUBPATH.length; }
export function summaryClubpath(): string { return `$<built-in function len> fixtures for clubpath`; }
export const CLUBPATH_README = "Use clubpath fixtures for deterministic mock screenshots and scripted demo states.";
export const CLUBPATH_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorClubpath(): boolean { return CLUBPATH.some(item=>item.state==='error'); }
export function hasLoadingClubpath(): boolean { return CLUBPATH.some(item=>item.state==='loading'); }
export function hasEmptyClubpath(): boolean { return CLUBPATH.some(item=>item.state==='empty'); }
export function averageScoreClubpath(): number { return Math.round(CLUBPATH.reduce((a,b)=>a+b.score,0)/Math.max(CLUBPATH.length,1)); }
export function maxScoreClubpath(): number { return Math.max(...CLUBPATH.map(item=>item.score)); }
export function minScoreClubpath(): number { return Math.min(...CLUBPATH.map(item=>item.score)); }
export const CLUBPATH_VERSION = 'v6';
export const CLUBPATH_SOURCE = 'demo-only';
export function isDemoOnlyClubpath(): true { return true; }
