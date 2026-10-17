/** Mock domain fixture: privacy. */
export interface PrivacyFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PRIVACY: PrivacyFixture[] = [
  {
    id: "privacy-1",
    title: "Privacy scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "privacy", "ready"],
  },
  {
    id: "privacy-2",
    title: "Privacy scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "privacy", "loading"],
  },
  {
    id: "privacy-3",
    title: "Privacy scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "privacy", "success"],
  },
  {
    id: "privacy-4",
    title: "Privacy scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "privacy", "warning"],
  },
  {
    id: "privacy-5",
    title: "Privacy scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "privacy", "error"],
  },
  {
    id: "privacy-6",
    title: "Privacy scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "privacy", "empty"],
  },
  {
    id: "privacy-7",
    title: "Privacy scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "privacy", "ready"],
  },
  {
    id: "privacy-8",
    title: "Privacy scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "privacy", "loading"],
  },
  {
    id: "privacy-9",
    title: "Privacy scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "privacy", "success"],
  },
  {
    id: "privacy-10",
    title: "Privacy scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "privacy", "warning"],
  },
  {
    id: "privacy-11",
    title: "Privacy scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "privacy", "error"],
  },
  {
    id: "privacy-12",
    title: "Privacy scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "privacy", "empty"],
  },
  {
    id: "privacy-13",
    title: "Privacy scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "privacy", "ready"],
  },
  {
    id: "privacy-14",
    title: "Privacy scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "privacy", "loading"],
  },
  {
    id: "privacy-15",
    title: "Privacy scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "privacy", "success"],
  },
  {
    id: "privacy-16",
    title: "Privacy scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for privacy; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "privacy", "warning"],
  }
];
export function getPrivacy(id:string): PrivacyFixture|undefined { return PRIVACY.find(item=>item.id===id); }
export function byStatePrivacy(state:PrivacyFixture['state']): PrivacyFixture[] { return PRIVACY.filter(item=>item.state===state); }
export function featuredPrivacy(): PrivacyFixture { return PRIVACY[0]; }
export function countPrivacy(): number { return PRIVACY.length; }
export function summaryPrivacy(): string { return `$<built-in function len> fixtures for privacy`; }
export const PRIVACY_README = "Use privacy fixtures for deterministic mock screenshots and scripted demo states.";
export const PRIVACY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPrivacy(): boolean { return PRIVACY.some(item=>item.state==='error'); }
export function hasLoadingPrivacy(): boolean { return PRIVACY.some(item=>item.state==='loading'); }
export function hasEmptyPrivacy(): boolean { return PRIVACY.some(item=>item.state==='empty'); }
export function averageScorePrivacy(): number { return Math.round(PRIVACY.reduce((a,b)=>a+b.score,0)/Math.max(PRIVACY.length,1)); }
export function maxScorePrivacy(): number { return Math.max(...PRIVACY.map(item=>item.score)); }
export function minScorePrivacy(): number { return Math.min(...PRIVACY.map(item=>item.score)); }
export const PRIVACY_VERSION = 'v6';
export const PRIVACY_SOURCE = 'demo-only';
export function isDemoOnlyPrivacy(): true { return true; }
