/** Mock domain fixture: wood. */
export interface WoodFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const WOOD: WoodFixture[] = [
  {
    id: "wood-1",
    title: "Wood scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "wood", "ready"],
  },
  {
    id: "wood-2",
    title: "Wood scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "wood", "loading"],
  },
  {
    id: "wood-3",
    title: "Wood scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "wood", "success"],
  },
  {
    id: "wood-4",
    title: "Wood scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "wood", "warning"],
  },
  {
    id: "wood-5",
    title: "Wood scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "wood", "error"],
  },
  {
    id: "wood-6",
    title: "Wood scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "wood", "empty"],
  },
  {
    id: "wood-7",
    title: "Wood scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "wood", "ready"],
  },
  {
    id: "wood-8",
    title: "Wood scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "wood", "loading"],
  },
  {
    id: "wood-9",
    title: "Wood scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "wood", "success"],
  },
  {
    id: "wood-10",
    title: "Wood scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "wood", "warning"],
  },
  {
    id: "wood-11",
    title: "Wood scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "wood", "error"],
  },
  {
    id: "wood-12",
    title: "Wood scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "wood", "empty"],
  },
  {
    id: "wood-13",
    title: "Wood scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "wood", "ready"],
  },
  {
    id: "wood-14",
    title: "Wood scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "wood", "loading"],
  },
  {
    id: "wood-15",
    title: "Wood scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "wood", "success"],
  },
  {
    id: "wood-16",
    title: "Wood scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for wood; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "wood", "warning"],
  }
];
export function getWood(id:string): WoodFixture|undefined { return WOOD.find(item=>item.id===id); }
export function byStateWood(state:WoodFixture['state']): WoodFixture[] { return WOOD.filter(item=>item.state===state); }
export function featuredWood(): WoodFixture { return WOOD[0]; }
export function countWood(): number { return WOOD.length; }
export function summaryWood(): string { return `$<built-in function len> fixtures for wood`; }
export const WOOD_README = "Use wood fixtures for deterministic mock screenshots and scripted demo states.";
export const WOOD_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorWood(): boolean { return WOOD.some(item=>item.state==='error'); }
export function hasLoadingWood(): boolean { return WOOD.some(item=>item.state==='loading'); }
export function hasEmptyWood(): boolean { return WOOD.some(item=>item.state==='empty'); }
export function averageScoreWood(): number { return Math.round(WOOD.reduce((a,b)=>a+b.score,0)/Math.max(WOOD.length,1)); }
export function maxScoreWood(): number { return Math.max(...WOOD.map(item=>item.score)); }
export function minScoreWood(): number { return Math.min(...WOOD.map(item=>item.score)); }
export const WOOD_VERSION = 'v6';
export const WOOD_SOURCE = 'demo-only';
export function isDemoOnlyWood(): true { return true; }
