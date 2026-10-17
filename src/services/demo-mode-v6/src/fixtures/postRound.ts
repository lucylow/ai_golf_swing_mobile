/** Mock domain fixture: postRound. */
export interface PostroundFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const POSTROUND: PostroundFixture[] = [
  {
    id: "postRound-1",
    title: "Postround scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "postRound", "ready"],
  },
  {
    id: "postRound-2",
    title: "Postround scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "postRound", "loading"],
  },
  {
    id: "postRound-3",
    title: "Postround scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "postRound", "success"],
  },
  {
    id: "postRound-4",
    title: "Postround scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "postRound", "warning"],
  },
  {
    id: "postRound-5",
    title: "Postround scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "postRound", "error"],
  },
  {
    id: "postRound-6",
    title: "Postround scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "postRound", "empty"],
  },
  {
    id: "postRound-7",
    title: "Postround scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "postRound", "ready"],
  },
  {
    id: "postRound-8",
    title: "Postround scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "postRound", "loading"],
  },
  {
    id: "postRound-9",
    title: "Postround scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "postRound", "success"],
  },
  {
    id: "postRound-10",
    title: "Postround scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "postRound", "warning"],
  },
  {
    id: "postRound-11",
    title: "Postround scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "postRound", "error"],
  },
  {
    id: "postRound-12",
    title: "Postround scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "postRound", "empty"],
  },
  {
    id: "postRound-13",
    title: "Postround scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "postRound", "ready"],
  },
  {
    id: "postRound-14",
    title: "Postround scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "postRound", "loading"],
  },
  {
    id: "postRound-15",
    title: "Postround scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "postRound", "success"],
  },
  {
    id: "postRound-16",
    title: "Postround scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for postRound; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "postRound", "warning"],
  }
];
export function getPostround(id:string): PostroundFixture|undefined { return POSTROUND.find(item=>item.id===id); }
export function byStatePostround(state:PostroundFixture['state']): PostroundFixture[] { return POSTROUND.filter(item=>item.state===state); }
export function featuredPostround(): PostroundFixture { return POSTROUND[0]; }
export function countPostround(): number { return POSTROUND.length; }
export function summaryPostround(): string { return `$<built-in function len> fixtures for postRound`; }
export const POSTROUND_README = "Use postRound fixtures for deterministic mock screenshots and scripted demo states.";
export const POSTROUND_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPostround(): boolean { return POSTROUND.some(item=>item.state==='error'); }
export function hasLoadingPostround(): boolean { return POSTROUND.some(item=>item.state==='loading'); }
export function hasEmptyPostround(): boolean { return POSTROUND.some(item=>item.state==='empty'); }
export function averageScorePostround(): number { return Math.round(POSTROUND.reduce((a,b)=>a+b.score,0)/Math.max(POSTROUND.length,1)); }
export function maxScorePostround(): number { return Math.max(...POSTROUND.map(item=>item.score)); }
export function minScorePostround(): number { return Math.min(...POSTROUND.map(item=>item.score)); }
export const POSTROUND_VERSION = 'v6';
export const POSTROUND_SOURCE = 'demo-only';
export function isDemoOnlyPostround(): true { return true; }
