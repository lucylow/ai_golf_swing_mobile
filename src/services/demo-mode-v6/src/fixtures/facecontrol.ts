/** Mock domain fixture: facecontrol. */
export interface FacecontrolFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const FACECONTROL: FacecontrolFixture[] = [
  {
    id: "facecontrol-1",
    title: "Facecontrol scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "facecontrol", "ready"],
  },
  {
    id: "facecontrol-2",
    title: "Facecontrol scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "facecontrol", "loading"],
  },
  {
    id: "facecontrol-3",
    title: "Facecontrol scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "facecontrol", "success"],
  },
  {
    id: "facecontrol-4",
    title: "Facecontrol scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "facecontrol", "warning"],
  },
  {
    id: "facecontrol-5",
    title: "Facecontrol scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "facecontrol", "error"],
  },
  {
    id: "facecontrol-6",
    title: "Facecontrol scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "facecontrol", "empty"],
  },
  {
    id: "facecontrol-7",
    title: "Facecontrol scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "facecontrol", "ready"],
  },
  {
    id: "facecontrol-8",
    title: "Facecontrol scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "facecontrol", "loading"],
  },
  {
    id: "facecontrol-9",
    title: "Facecontrol scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "facecontrol", "success"],
  },
  {
    id: "facecontrol-10",
    title: "Facecontrol scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "facecontrol", "warning"],
  },
  {
    id: "facecontrol-11",
    title: "Facecontrol scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "facecontrol", "error"],
  },
  {
    id: "facecontrol-12",
    title: "Facecontrol scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "facecontrol", "empty"],
  },
  {
    id: "facecontrol-13",
    title: "Facecontrol scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "facecontrol", "ready"],
  },
  {
    id: "facecontrol-14",
    title: "Facecontrol scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "facecontrol", "loading"],
  },
  {
    id: "facecontrol-15",
    title: "Facecontrol scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "facecontrol", "success"],
  },
  {
    id: "facecontrol-16",
    title: "Facecontrol scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for facecontrol; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "facecontrol", "warning"],
  }
];
export function getFacecontrol(id:string): FacecontrolFixture|undefined { return FACECONTROL.find(item=>item.id===id); }
export function byStateFacecontrol(state:FacecontrolFixture['state']): FacecontrolFixture[] { return FACECONTROL.filter(item=>item.state===state); }
export function featuredFacecontrol(): FacecontrolFixture { return FACECONTROL[0]; }
export function countFacecontrol(): number { return FACECONTROL.length; }
export function summaryFacecontrol(): string { return `$<built-in function len> fixtures for facecontrol`; }
export const FACECONTROL_README = "Use facecontrol fixtures for deterministic mock screenshots and scripted demo states.";
export const FACECONTROL_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorFacecontrol(): boolean { return FACECONTROL.some(item=>item.state==='error'); }
export function hasLoadingFacecontrol(): boolean { return FACECONTROL.some(item=>item.state==='loading'); }
export function hasEmptyFacecontrol(): boolean { return FACECONTROL.some(item=>item.state==='empty'); }
export function averageScoreFacecontrol(): number { return Math.round(FACECONTROL.reduce((a,b)=>a+b.score,0)/Math.max(FACECONTROL.length,1)); }
export function maxScoreFacecontrol(): number { return Math.max(...FACECONTROL.map(item=>item.score)); }
export function minScoreFacecontrol(): number { return Math.min(...FACECONTROL.map(item=>item.score)); }
export const FACECONTROL_VERSION = 'v6';
export const FACECONTROL_SOURCE = 'demo-only';
export function isDemoOnlyFacecontrol(): true { return true; }
