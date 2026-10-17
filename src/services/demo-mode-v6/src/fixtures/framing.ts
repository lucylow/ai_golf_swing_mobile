/** Mock domain fixture: framing. */
export interface FramingFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const FRAMING: FramingFixture[] = [
  {
    id: "framing-1",
    title: "Framing scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "framing", "ready"],
  },
  {
    id: "framing-2",
    title: "Framing scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "framing", "loading"],
  },
  {
    id: "framing-3",
    title: "Framing scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "framing", "success"],
  },
  {
    id: "framing-4",
    title: "Framing scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "framing", "warning"],
  },
  {
    id: "framing-5",
    title: "Framing scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "framing", "error"],
  },
  {
    id: "framing-6",
    title: "Framing scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "framing", "empty"],
  },
  {
    id: "framing-7",
    title: "Framing scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "framing", "ready"],
  },
  {
    id: "framing-8",
    title: "Framing scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "framing", "loading"],
  },
  {
    id: "framing-9",
    title: "Framing scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "framing", "success"],
  },
  {
    id: "framing-10",
    title: "Framing scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "framing", "warning"],
  },
  {
    id: "framing-11",
    title: "Framing scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "framing", "error"],
  },
  {
    id: "framing-12",
    title: "Framing scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "framing", "empty"],
  },
  {
    id: "framing-13",
    title: "Framing scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "framing", "ready"],
  },
  {
    id: "framing-14",
    title: "Framing scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "framing", "loading"],
  },
  {
    id: "framing-15",
    title: "Framing scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "framing", "success"],
  },
  {
    id: "framing-16",
    title: "Framing scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for framing; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "framing", "warning"],
  }
];
export function getFraming(id:string): FramingFixture|undefined { return FRAMING.find(item=>item.id===id); }
export function byStateFraming(state:FramingFixture['state']): FramingFixture[] { return FRAMING.filter(item=>item.state===state); }
export function featuredFraming(): FramingFixture { return FRAMING[0]; }
export function countFraming(): number { return FRAMING.length; }
export function summaryFraming(): string { return `$<built-in function len> fixtures for framing`; }
export const FRAMING_README = "Use framing fixtures for deterministic mock screenshots and scripted demo states.";
export const FRAMING_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorFraming(): boolean { return FRAMING.some(item=>item.state==='error'); }
export function hasLoadingFraming(): boolean { return FRAMING.some(item=>item.state==='loading'); }
export function hasEmptyFraming(): boolean { return FRAMING.some(item=>item.state==='empty'); }
export function averageScoreFraming(): number { return Math.round(FRAMING.reduce((a,b)=>a+b.score,0)/Math.max(FRAMING.length,1)); }
export function maxScoreFraming(): number { return Math.max(...FRAMING.map(item=>item.score)); }
export function minScoreFraming(): number { return Math.min(...FRAMING.map(item=>item.score)); }
export const FRAMING_VERSION = 'v6';
export const FRAMING_SOURCE = 'demo-only';
export function isDemoOnlyFraming(): true { return true; }
