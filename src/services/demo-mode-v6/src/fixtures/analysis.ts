/** Mock domain fixture: analysis. */
export interface AnalysisFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const ANALYSIS: AnalysisFixture[] = [
  {
    id: "analysis-1",
    title: "Analysis scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "analysis", "ready"],
  },
  {
    id: "analysis-2",
    title: "Analysis scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "analysis", "loading"],
  },
  {
    id: "analysis-3",
    title: "Analysis scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "analysis", "success"],
  },
  {
    id: "analysis-4",
    title: "Analysis scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "analysis", "warning"],
  },
  {
    id: "analysis-5",
    title: "Analysis scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "analysis", "error"],
  },
  {
    id: "analysis-6",
    title: "Analysis scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "analysis", "empty"],
  },
  {
    id: "analysis-7",
    title: "Analysis scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "analysis", "ready"],
  },
  {
    id: "analysis-8",
    title: "Analysis scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "analysis", "loading"],
  },
  {
    id: "analysis-9",
    title: "Analysis scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "analysis", "success"],
  },
  {
    id: "analysis-10",
    title: "Analysis scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "analysis", "warning"],
  },
  {
    id: "analysis-11",
    title: "Analysis scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "analysis", "error"],
  },
  {
    id: "analysis-12",
    title: "Analysis scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "analysis", "empty"],
  },
  {
    id: "analysis-13",
    title: "Analysis scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "analysis", "ready"],
  },
  {
    id: "analysis-14",
    title: "Analysis scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "analysis", "loading"],
  },
  {
    id: "analysis-15",
    title: "Analysis scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "analysis", "success"],
  },
  {
    id: "analysis-16",
    title: "Analysis scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for analysis; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "analysis", "warning"],
  }
];
export function getAnalysis(id:string): AnalysisFixture|undefined { return ANALYSIS.find(item=>item.id===id); }
export function byStateAnalysis(state:AnalysisFixture['state']): AnalysisFixture[] { return ANALYSIS.filter(item=>item.state===state); }
export function featuredAnalysis(): AnalysisFixture { return ANALYSIS[0]; }
export function countAnalysis(): number { return ANALYSIS.length; }
export function summaryAnalysis(): string { return `$<built-in function len> fixtures for analysis`; }
export const ANALYSIS_README = "Use analysis fixtures for deterministic mock screenshots and scripted demo states.";
export const ANALYSIS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorAnalysis(): boolean { return ANALYSIS.some(item=>item.state==='error'); }
export function hasLoadingAnalysis(): boolean { return ANALYSIS.some(item=>item.state==='loading'); }
export function hasEmptyAnalysis(): boolean { return ANALYSIS.some(item=>item.state==='empty'); }
export function averageScoreAnalysis(): number { return Math.round(ANALYSIS.reduce((a,b)=>a+b.score,0)/Math.max(ANALYSIS.length,1)); }
export function maxScoreAnalysis(): number { return Math.max(...ANALYSIS.map(item=>item.score)); }
export function minScoreAnalysis(): number { return Math.min(...ANALYSIS.map(item=>item.score)); }
export const ANALYSIS_VERSION = 'v6';
export const ANALYSIS_SOURCE = 'demo-only';
export function isDemoOnlyAnalysis(): true { return true; }
