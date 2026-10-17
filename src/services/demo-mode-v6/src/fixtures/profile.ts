/** Mock domain fixture: profile. */
export interface ProfileFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PROFILE: ProfileFixture[] = [
  {
    id: "profile-1",
    title: "Profile scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "profile", "ready"],
  },
  {
    id: "profile-2",
    title: "Profile scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "profile", "loading"],
  },
  {
    id: "profile-3",
    title: "Profile scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "profile", "success"],
  },
  {
    id: "profile-4",
    title: "Profile scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "profile", "warning"],
  },
  {
    id: "profile-5",
    title: "Profile scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "profile", "error"],
  },
  {
    id: "profile-6",
    title: "Profile scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "profile", "empty"],
  },
  {
    id: "profile-7",
    title: "Profile scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "profile", "ready"],
  },
  {
    id: "profile-8",
    title: "Profile scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "profile", "loading"],
  },
  {
    id: "profile-9",
    title: "Profile scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "profile", "success"],
  },
  {
    id: "profile-10",
    title: "Profile scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "profile", "warning"],
  },
  {
    id: "profile-11",
    title: "Profile scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "profile", "error"],
  },
  {
    id: "profile-12",
    title: "Profile scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "profile", "empty"],
  },
  {
    id: "profile-13",
    title: "Profile scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "profile", "ready"],
  },
  {
    id: "profile-14",
    title: "Profile scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "profile", "loading"],
  },
  {
    id: "profile-15",
    title: "Profile scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "profile", "success"],
  },
  {
    id: "profile-16",
    title: "Profile scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for profile; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "profile", "warning"],
  }
];
export function getProfile(id:string): ProfileFixture|undefined { return PROFILE.find(item=>item.id===id); }
export function byStateProfile(state:ProfileFixture['state']): ProfileFixture[] { return PROFILE.filter(item=>item.state===state); }
export function featuredProfile(): ProfileFixture { return PROFILE[0]; }
export function countProfile(): number { return PROFILE.length; }
export function summaryProfile(): string { return `$<built-in function len> fixtures for profile`; }
export const PROFILE_README = "Use profile fixtures for deterministic mock screenshots and scripted demo states.";
export const PROFILE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorProfile(): boolean { return PROFILE.some(item=>item.state==='error'); }
export function hasLoadingProfile(): boolean { return PROFILE.some(item=>item.state==='loading'); }
export function hasEmptyProfile(): boolean { return PROFILE.some(item=>item.state==='empty'); }
export function averageScoreProfile(): number { return Math.round(PROFILE.reduce((a,b)=>a+b.score,0)/Math.max(PROFILE.length,1)); }
export function maxScoreProfile(): number { return Math.max(...PROFILE.map(item=>item.score)); }
export function minScoreProfile(): number { return Math.min(...PROFILE.map(item=>item.score)); }
export const PROFILE_VERSION = 'v6';
export const PROFILE_SOURCE = 'demo-only';
export function isDemoOnlyProfile(): true { return true; }
