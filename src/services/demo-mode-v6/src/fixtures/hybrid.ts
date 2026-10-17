/** Mock domain fixture: hybrid. */
export interface HybridFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const HYBRID: HybridFixture[] = [
  {
    id: "hybrid-1",
    title: "Hybrid scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "hybrid", "ready"],
  },
  {
    id: "hybrid-2",
    title: "Hybrid scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "hybrid", "loading"],
  },
  {
    id: "hybrid-3",
    title: "Hybrid scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "hybrid", "success"],
  },
  {
    id: "hybrid-4",
    title: "Hybrid scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "hybrid", "warning"],
  },
  {
    id: "hybrid-5",
    title: "Hybrid scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "hybrid", "error"],
  },
  {
    id: "hybrid-6",
    title: "Hybrid scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "hybrid", "empty"],
  },
  {
    id: "hybrid-7",
    title: "Hybrid scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "hybrid", "ready"],
  },
  {
    id: "hybrid-8",
    title: "Hybrid scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "hybrid", "loading"],
  },
  {
    id: "hybrid-9",
    title: "Hybrid scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "hybrid", "success"],
  },
  {
    id: "hybrid-10",
    title: "Hybrid scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "hybrid", "warning"],
  },
  {
    id: "hybrid-11",
    title: "Hybrid scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "hybrid", "error"],
  },
  {
    id: "hybrid-12",
    title: "Hybrid scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "hybrid", "empty"],
  },
  {
    id: "hybrid-13",
    title: "Hybrid scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "hybrid", "ready"],
  },
  {
    id: "hybrid-14",
    title: "Hybrid scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "hybrid", "loading"],
  },
  {
    id: "hybrid-15",
    title: "Hybrid scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "hybrid", "success"],
  },
  {
    id: "hybrid-16",
    title: "Hybrid scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for hybrid; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "hybrid", "warning"],
  }
];
export function getHybrid(id:string): HybridFixture|undefined { return HYBRID.find(item=>item.id===id); }
export function byStateHybrid(state:HybridFixture['state']): HybridFixture[] { return HYBRID.filter(item=>item.state===state); }
export function featuredHybrid(): HybridFixture { return HYBRID[0]; }
export function countHybrid(): number { return HYBRID.length; }
export function summaryHybrid(): string { return `$<built-in function len> fixtures for hybrid`; }
export const HYBRID_README = "Use hybrid fixtures for deterministic mock screenshots and scripted demo states.";
export const HYBRID_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorHybrid(): boolean { return HYBRID.some(item=>item.state==='error'); }
export function hasLoadingHybrid(): boolean { return HYBRID.some(item=>item.state==='loading'); }
export function hasEmptyHybrid(): boolean { return HYBRID.some(item=>item.state==='empty'); }
export function averageScoreHybrid(): number { return Math.round(HYBRID.reduce((a,b)=>a+b.score,0)/Math.max(HYBRID.length,1)); }
export function maxScoreHybrid(): number { return Math.max(...HYBRID.map(item=>item.score)); }
export function minScoreHybrid(): number { return Math.min(...HYBRID.map(item=>item.score)); }
export const HYBRID_VERSION = 'v6';
export const HYBRID_SOURCE = 'demo-only';
export function isDemoOnlyHybrid(): true { return true; }
