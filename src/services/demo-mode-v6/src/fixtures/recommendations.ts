/** Mock domain fixture: recommendations. */
export interface RecommendationsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const RECOMMENDATIONS: RecommendationsFixture[] = [
  {
    id: "recommendations-1",
    title: "Recommendations scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "recommendations", "ready"],
  },
  {
    id: "recommendations-2",
    title: "Recommendations scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "recommendations", "loading"],
  },
  {
    id: "recommendations-3",
    title: "Recommendations scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "recommendations", "success"],
  },
  {
    id: "recommendations-4",
    title: "Recommendations scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "recommendations", "warning"],
  },
  {
    id: "recommendations-5",
    title: "Recommendations scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "recommendations", "error"],
  },
  {
    id: "recommendations-6",
    title: "Recommendations scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "recommendations", "empty"],
  },
  {
    id: "recommendations-7",
    title: "Recommendations scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "recommendations", "ready"],
  },
  {
    id: "recommendations-8",
    title: "Recommendations scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "recommendations", "loading"],
  },
  {
    id: "recommendations-9",
    title: "Recommendations scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "recommendations", "success"],
  },
  {
    id: "recommendations-10",
    title: "Recommendations scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "recommendations", "warning"],
  },
  {
    id: "recommendations-11",
    title: "Recommendations scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "recommendations", "error"],
  },
  {
    id: "recommendations-12",
    title: "Recommendations scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "recommendations", "empty"],
  },
  {
    id: "recommendations-13",
    title: "Recommendations scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "recommendations", "ready"],
  },
  {
    id: "recommendations-14",
    title: "Recommendations scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "recommendations", "loading"],
  },
  {
    id: "recommendations-15",
    title: "Recommendations scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "recommendations", "success"],
  },
  {
    id: "recommendations-16",
    title: "Recommendations scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for recommendations; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "recommendations", "warning"],
  }
];
export function getRecommendations(id:string): RecommendationsFixture|undefined { return RECOMMENDATIONS.find(item=>item.id===id); }
export function byStateRecommendations(state:RecommendationsFixture['state']): RecommendationsFixture[] { return RECOMMENDATIONS.filter(item=>item.state===state); }
export function featuredRecommendations(): RecommendationsFixture { return RECOMMENDATIONS[0]; }
export function countRecommendations(): number { return RECOMMENDATIONS.length; }
export function summaryRecommendations(): string { return `$<built-in function len> fixtures for recommendations`; }
export const RECOMMENDATIONS_README = "Use recommendations fixtures for deterministic mock screenshots and scripted demo states.";
export const RECOMMENDATIONS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorRecommendations(): boolean { return RECOMMENDATIONS.some(item=>item.state==='error'); }
export function hasLoadingRecommendations(): boolean { return RECOMMENDATIONS.some(item=>item.state==='loading'); }
export function hasEmptyRecommendations(): boolean { return RECOMMENDATIONS.some(item=>item.state==='empty'); }
export function averageScoreRecommendations(): number { return Math.round(RECOMMENDATIONS.reduce((a,b)=>a+b.score,0)/Math.max(RECOMMENDATIONS.length,1)); }
export function maxScoreRecommendations(): number { return Math.max(...RECOMMENDATIONS.map(item=>item.score)); }
export function minScoreRecommendations(): number { return Math.min(...RECOMMENDATIONS.map(item=>item.score)); }
export const RECOMMENDATIONS_VERSION = 'v6';
export const RECOMMENDATIONS_SOURCE = 'demo-only';
export function isDemoOnlyRecommendations(): true { return true; }
