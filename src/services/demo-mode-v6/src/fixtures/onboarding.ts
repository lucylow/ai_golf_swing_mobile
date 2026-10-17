/** Mock domain fixture: onboarding. */
export interface OnboardingFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const ONBOARDING: OnboardingFixture[] = [
  {
    id: "onboarding-1",
    title: "Onboarding scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "onboarding", "ready"],
  },
  {
    id: "onboarding-2",
    title: "Onboarding scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "onboarding", "loading"],
  },
  {
    id: "onboarding-3",
    title: "Onboarding scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "onboarding", "success"],
  },
  {
    id: "onboarding-4",
    title: "Onboarding scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "onboarding", "warning"],
  },
  {
    id: "onboarding-5",
    title: "Onboarding scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "onboarding", "error"],
  },
  {
    id: "onboarding-6",
    title: "Onboarding scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "onboarding", "empty"],
  },
  {
    id: "onboarding-7",
    title: "Onboarding scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "onboarding", "ready"],
  },
  {
    id: "onboarding-8",
    title: "Onboarding scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "onboarding", "loading"],
  },
  {
    id: "onboarding-9",
    title: "Onboarding scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "onboarding", "success"],
  },
  {
    id: "onboarding-10",
    title: "Onboarding scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "onboarding", "warning"],
  },
  {
    id: "onboarding-11",
    title: "Onboarding scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "onboarding", "error"],
  },
  {
    id: "onboarding-12",
    title: "Onboarding scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "onboarding", "empty"],
  },
  {
    id: "onboarding-13",
    title: "Onboarding scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "onboarding", "ready"],
  },
  {
    id: "onboarding-14",
    title: "Onboarding scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "onboarding", "loading"],
  },
  {
    id: "onboarding-15",
    title: "Onboarding scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "onboarding", "success"],
  },
  {
    id: "onboarding-16",
    title: "Onboarding scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for onboarding; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "onboarding", "warning"],
  }
];
export function getOnboarding(id:string): OnboardingFixture|undefined { return ONBOARDING.find(item=>item.id===id); }
export function byStateOnboarding(state:OnboardingFixture['state']): OnboardingFixture[] { return ONBOARDING.filter(item=>item.state===state); }
export function featuredOnboarding(): OnboardingFixture { return ONBOARDING[0]; }
export function countOnboarding(): number { return ONBOARDING.length; }
export function summaryOnboarding(): string { return `$<built-in function len> fixtures for onboarding`; }
export const ONBOARDING_README = "Use onboarding fixtures for deterministic mock screenshots and scripted demo states.";
export const ONBOARDING_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorOnboarding(): boolean { return ONBOARDING.some(item=>item.state==='error'); }
export function hasLoadingOnboarding(): boolean { return ONBOARDING.some(item=>item.state==='loading'); }
export function hasEmptyOnboarding(): boolean { return ONBOARDING.some(item=>item.state==='empty'); }
export function averageScoreOnboarding(): number { return Math.round(ONBOARDING.reduce((a,b)=>a+b.score,0)/Math.max(ONBOARDING.length,1)); }
export function maxScoreOnboarding(): number { return Math.max(...ONBOARDING.map(item=>item.score)); }
export function minScoreOnboarding(): number { return Math.min(...ONBOARDING.map(item=>item.score)); }
export const ONBOARDING_VERSION = 'v6';
export const ONBOARDING_SOURCE = 'demo-only';
export function isDemoOnlyOnboarding(): true { return true; }
