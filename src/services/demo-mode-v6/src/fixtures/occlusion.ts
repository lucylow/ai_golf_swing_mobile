/** Mock domain fixture: occlusion. */
export interface OcclusionFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const OCCLUSION: OcclusionFixture[] = [
  {
    id: "occlusion-1",
    title: "Occlusion scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "occlusion", "ready"],
  },
  {
    id: "occlusion-2",
    title: "Occlusion scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "occlusion", "loading"],
  },
  {
    id: "occlusion-3",
    title: "Occlusion scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "occlusion", "success"],
  },
  {
    id: "occlusion-4",
    title: "Occlusion scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "occlusion", "warning"],
  },
  {
    id: "occlusion-5",
    title: "Occlusion scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "occlusion", "error"],
  },
  {
    id: "occlusion-6",
    title: "Occlusion scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "occlusion", "empty"],
  },
  {
    id: "occlusion-7",
    title: "Occlusion scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "occlusion", "ready"],
  },
  {
    id: "occlusion-8",
    title: "Occlusion scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "occlusion", "loading"],
  },
  {
    id: "occlusion-9",
    title: "Occlusion scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "occlusion", "success"],
  },
  {
    id: "occlusion-10",
    title: "Occlusion scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "occlusion", "warning"],
  },
  {
    id: "occlusion-11",
    title: "Occlusion scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "occlusion", "error"],
  },
  {
    id: "occlusion-12",
    title: "Occlusion scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "occlusion", "empty"],
  },
  {
    id: "occlusion-13",
    title: "Occlusion scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "occlusion", "ready"],
  },
  {
    id: "occlusion-14",
    title: "Occlusion scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "occlusion", "loading"],
  },
  {
    id: "occlusion-15",
    title: "Occlusion scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "occlusion", "success"],
  },
  {
    id: "occlusion-16",
    title: "Occlusion scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for occlusion; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "occlusion", "warning"],
  }
];
export function getOcclusion(id:string): OcclusionFixture|undefined { return OCCLUSION.find(item=>item.id===id); }
export function byStateOcclusion(state:OcclusionFixture['state']): OcclusionFixture[] { return OCCLUSION.filter(item=>item.state===state); }
export function featuredOcclusion(): OcclusionFixture { return OCCLUSION[0]; }
export function countOcclusion(): number { return OCCLUSION.length; }
export function summaryOcclusion(): string { return `$<built-in function len> fixtures for occlusion`; }
export const OCCLUSION_README = "Use occlusion fixtures for deterministic mock screenshots and scripted demo states.";
export const OCCLUSION_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorOcclusion(): boolean { return OCCLUSION.some(item=>item.state==='error'); }
export function hasLoadingOcclusion(): boolean { return OCCLUSION.some(item=>item.state==='loading'); }
export function hasEmptyOcclusion(): boolean { return OCCLUSION.some(item=>item.state==='empty'); }
export function averageScoreOcclusion(): number { return Math.round(OCCLUSION.reduce((a,b)=>a+b.score,0)/Math.max(OCCLUSION.length,1)); }
export function maxScoreOcclusion(): number { return Math.max(...OCCLUSION.map(item=>item.score)); }
export function minScoreOcclusion(): number { return Math.min(...OCCLUSION.map(item=>item.score)); }
export const OCCLUSION_VERSION = 'v6';
export const OCCLUSION_SOURCE = 'demo-only';
export function isDemoOnlyOcclusion(): true { return true; }
