/** Mock domain fixture: impact. */
export interface ImpactFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const IMPACT: ImpactFixture[] = [
  {
    id: "impact-1",
    title: "Impact scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "impact", "ready"],
  },
  {
    id: "impact-2",
    title: "Impact scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "impact", "loading"],
  },
  {
    id: "impact-3",
    title: "Impact scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "impact", "success"],
  },
  {
    id: "impact-4",
    title: "Impact scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "impact", "warning"],
  },
  {
    id: "impact-5",
    title: "Impact scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "impact", "error"],
  },
  {
    id: "impact-6",
    title: "Impact scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "impact", "empty"],
  },
  {
    id: "impact-7",
    title: "Impact scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "impact", "ready"],
  },
  {
    id: "impact-8",
    title: "Impact scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "impact", "loading"],
  },
  {
    id: "impact-9",
    title: "Impact scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "impact", "success"],
  },
  {
    id: "impact-10",
    title: "Impact scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "impact", "warning"],
  },
  {
    id: "impact-11",
    title: "Impact scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "impact", "error"],
  },
  {
    id: "impact-12",
    title: "Impact scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "impact", "empty"],
  },
  {
    id: "impact-13",
    title: "Impact scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "impact", "ready"],
  },
  {
    id: "impact-14",
    title: "Impact scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "impact", "loading"],
  },
  {
    id: "impact-15",
    title: "Impact scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "impact", "success"],
  },
  {
    id: "impact-16",
    title: "Impact scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for impact; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "impact", "warning"],
  }
];
export function getImpact(id:string): ImpactFixture|undefined { return IMPACT.find(item=>item.id===id); }
export function byStateImpact(state:ImpactFixture['state']): ImpactFixture[] { return IMPACT.filter(item=>item.state===state); }
export function featuredImpact(): ImpactFixture { return IMPACT[0]; }
export function countImpact(): number { return IMPACT.length; }
export function summaryImpact(): string { return `$<built-in function len> fixtures for impact`; }
export const IMPACT_README = "Use impact fixtures for deterministic mock screenshots and scripted demo states.";
export const IMPACT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorImpact(): boolean { return IMPACT.some(item=>item.state==='error'); }
export function hasLoadingImpact(): boolean { return IMPACT.some(item=>item.state==='loading'); }
export function hasEmptyImpact(): boolean { return IMPACT.some(item=>item.state==='empty'); }
export function averageScoreImpact(): number { return Math.round(IMPACT.reduce((a,b)=>a+b.score,0)/Math.max(IMPACT.length,1)); }
export function maxScoreImpact(): number { return Math.max(...IMPACT.map(item=>item.score)); }
export function minScoreImpact(): number { return Math.min(...IMPACT.map(item=>item.score)); }
export const IMPACT_VERSION = 'v6';
export const IMPACT_SOURCE = 'demo-only';
export function isDemoOnlyImpact(): true { return true; }
