/** Mock domain fixture: confidence. */
export interface ConfidenceFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const CONFIDENCE: ConfidenceFixture[] = [
  {
    id: "confidence-1",
    title: "Confidence scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "confidence", "ready"],
  },
  {
    id: "confidence-2",
    title: "Confidence scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "confidence", "loading"],
  },
  {
    id: "confidence-3",
    title: "Confidence scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "confidence", "success"],
  },
  {
    id: "confidence-4",
    title: "Confidence scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "confidence", "warning"],
  },
  {
    id: "confidence-5",
    title: "Confidence scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "confidence", "error"],
  },
  {
    id: "confidence-6",
    title: "Confidence scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "confidence", "empty"],
  },
  {
    id: "confidence-7",
    title: "Confidence scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "confidence", "ready"],
  },
  {
    id: "confidence-8",
    title: "Confidence scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "confidence", "loading"],
  },
  {
    id: "confidence-9",
    title: "Confidence scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "confidence", "success"],
  },
  {
    id: "confidence-10",
    title: "Confidence scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "confidence", "warning"],
  },
  {
    id: "confidence-11",
    title: "Confidence scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "confidence", "error"],
  },
  {
    id: "confidence-12",
    title: "Confidence scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "confidence", "empty"],
  },
  {
    id: "confidence-13",
    title: "Confidence scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "confidence", "ready"],
  },
  {
    id: "confidence-14",
    title: "Confidence scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "confidence", "loading"],
  },
  {
    id: "confidence-15",
    title: "Confidence scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "confidence", "success"],
  },
  {
    id: "confidence-16",
    title: "Confidence scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for confidence; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "confidence", "warning"],
  }
];
export function getConfidence(id:string): ConfidenceFixture|undefined { return CONFIDENCE.find(item=>item.id===id); }
export function byStateConfidence(state:ConfidenceFixture['state']): ConfidenceFixture[] { return CONFIDENCE.filter(item=>item.state===state); }
export function featuredConfidence(): ConfidenceFixture { return CONFIDENCE[0]; }
export function countConfidence(): number { return CONFIDENCE.length; }
export function summaryConfidence(): string { return `$<built-in function len> fixtures for confidence`; }
export const CONFIDENCE_README = "Use confidence fixtures for deterministic mock screenshots and scripted demo states.";
export const CONFIDENCE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorConfidence(): boolean { return CONFIDENCE.some(item=>item.state==='error'); }
export function hasLoadingConfidence(): boolean { return CONFIDENCE.some(item=>item.state==='loading'); }
export function hasEmptyConfidence(): boolean { return CONFIDENCE.some(item=>item.state==='empty'); }
export function averageScoreConfidence(): number { return Math.round(CONFIDENCE.reduce((a,b)=>a+b.score,0)/Math.max(CONFIDENCE.length,1)); }
export function maxScoreConfidence(): number { return Math.max(...CONFIDENCE.map(item=>item.score)); }
export function minScoreConfidence(): number { return Math.min(...CONFIDENCE.map(item=>item.score)); }
export const CONFIDENCE_VERSION = 'v6';
export const CONFIDENCE_SOURCE = 'demo-only';
export function isDemoOnlyConfidence(): true { return true; }
