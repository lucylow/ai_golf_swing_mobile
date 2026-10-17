/** Mock domain fixture: drills. */
export interface DrillsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const DRILLS: DrillsFixture[] = [
  {
    id: "drills-1",
    title: "Drills scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "drills", "ready"],
  },
  {
    id: "drills-2",
    title: "Drills scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "drills", "loading"],
  },
  {
    id: "drills-3",
    title: "Drills scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "drills", "success"],
  },
  {
    id: "drills-4",
    title: "Drills scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "drills", "warning"],
  },
  {
    id: "drills-5",
    title: "Drills scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "drills", "error"],
  },
  {
    id: "drills-6",
    title: "Drills scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "drills", "empty"],
  },
  {
    id: "drills-7",
    title: "Drills scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "drills", "ready"],
  },
  {
    id: "drills-8",
    title: "Drills scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "drills", "loading"],
  },
  {
    id: "drills-9",
    title: "Drills scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "drills", "success"],
  },
  {
    id: "drills-10",
    title: "Drills scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "drills", "warning"],
  },
  {
    id: "drills-11",
    title: "Drills scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "drills", "error"],
  },
  {
    id: "drills-12",
    title: "Drills scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "drills", "empty"],
  },
  {
    id: "drills-13",
    title: "Drills scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "drills", "ready"],
  },
  {
    id: "drills-14",
    title: "Drills scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "drills", "loading"],
  },
  {
    id: "drills-15",
    title: "Drills scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "drills", "success"],
  },
  {
    id: "drills-16",
    title: "Drills scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for drills; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "drills", "warning"],
  }
];
export function getDrills(id:string): DrillsFixture|undefined { return DRILLS.find(item=>item.id===id); }
export function byStateDrills(state:DrillsFixture['state']): DrillsFixture[] { return DRILLS.filter(item=>item.state===state); }
export function featuredDrills(): DrillsFixture { return DRILLS[0]; }
export function countDrills(): number { return DRILLS.length; }
export function summaryDrills(): string { return `$<built-in function len> fixtures for drills`; }
export const DRILLS_README = "Use drills fixtures for deterministic mock screenshots and scripted demo states.";
export const DRILLS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorDrills(): boolean { return DRILLS.some(item=>item.state==='error'); }
export function hasLoadingDrills(): boolean { return DRILLS.some(item=>item.state==='loading'); }
export function hasEmptyDrills(): boolean { return DRILLS.some(item=>item.state==='empty'); }
export function averageScoreDrills(): number { return Math.round(DRILLS.reduce((a,b)=>a+b.score,0)/Math.max(DRILLS.length,1)); }
export function maxScoreDrills(): number { return Math.max(...DRILLS.map(item=>item.score)); }
export function minScoreDrills(): number { return Math.min(...DRILLS.map(item=>item.score)); }
export const DRILLS_VERSION = 'v6';
export const DRILLS_SOURCE = 'demo-only';
export function isDemoOnlyDrills(): true { return true; }
