/** Mock domain fixture: insights. */
export interface InsightsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const INSIGHTS: InsightsFixture[] = [
  {
    id: "insights-1",
    title: "Insights scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "insights", "ready"],
  },
  {
    id: "insights-2",
    title: "Insights scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "insights", "loading"],
  },
  {
    id: "insights-3",
    title: "Insights scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "insights", "success"],
  },
  {
    id: "insights-4",
    title: "Insights scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "insights", "warning"],
  },
  {
    id: "insights-5",
    title: "Insights scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "insights", "error"],
  },
  {
    id: "insights-6",
    title: "Insights scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "insights", "empty"],
  },
  {
    id: "insights-7",
    title: "Insights scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "insights", "ready"],
  },
  {
    id: "insights-8",
    title: "Insights scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "insights", "loading"],
  },
  {
    id: "insights-9",
    title: "Insights scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "insights", "success"],
  },
  {
    id: "insights-10",
    title: "Insights scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "insights", "warning"],
  },
  {
    id: "insights-11",
    title: "Insights scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "insights", "error"],
  },
  {
    id: "insights-12",
    title: "Insights scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "insights", "empty"],
  },
  {
    id: "insights-13",
    title: "Insights scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "insights", "ready"],
  },
  {
    id: "insights-14",
    title: "Insights scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "insights", "loading"],
  },
  {
    id: "insights-15",
    title: "Insights scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "insights", "success"],
  },
  {
    id: "insights-16",
    title: "Insights scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for insights; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "insights", "warning"],
  }
];
export function getInsights(id:string): InsightsFixture|undefined { return INSIGHTS.find(item=>item.id===id); }
export function byStateInsights(state:InsightsFixture['state']): InsightsFixture[] { return INSIGHTS.filter(item=>item.state===state); }
export function featuredInsights(): InsightsFixture { return INSIGHTS[0]; }
export function countInsights(): number { return INSIGHTS.length; }
export function summaryInsights(): string { return `$<built-in function len> fixtures for insights`; }
export const INSIGHTS_README = "Use insights fixtures for deterministic mock screenshots and scripted demo states.";
export const INSIGHTS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorInsights(): boolean { return INSIGHTS.some(item=>item.state==='error'); }
export function hasLoadingInsights(): boolean { return INSIGHTS.some(item=>item.state==='loading'); }
export function hasEmptyInsights(): boolean { return INSIGHTS.some(item=>item.state==='empty'); }
export function averageScoreInsights(): number { return Math.round(INSIGHTS.reduce((a,b)=>a+b.score,0)/Math.max(INSIGHTS.length,1)); }
export function maxScoreInsights(): number { return Math.max(...INSIGHTS.map(item=>item.score)); }
export function minScoreInsights(): number { return Math.min(...INSIGHTS.map(item=>item.score)); }
export const INSIGHTS_VERSION = 'v6';
export const INSIGHTS_SOURCE = 'demo-only';
export function isDemoOnlyInsights(): true { return true; }
