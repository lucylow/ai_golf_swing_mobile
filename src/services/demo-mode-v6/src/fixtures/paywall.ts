/** Mock domain fixture: paywall. */
export interface PaywallFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PAYWALL: PaywallFixture[] = [
  {
    id: "paywall-1",
    title: "Paywall scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "paywall", "ready"],
  },
  {
    id: "paywall-2",
    title: "Paywall scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "paywall", "loading"],
  },
  {
    id: "paywall-3",
    title: "Paywall scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "paywall", "success"],
  },
  {
    id: "paywall-4",
    title: "Paywall scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "paywall", "warning"],
  },
  {
    id: "paywall-5",
    title: "Paywall scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "paywall", "error"],
  },
  {
    id: "paywall-6",
    title: "Paywall scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "paywall", "empty"],
  },
  {
    id: "paywall-7",
    title: "Paywall scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "paywall", "ready"],
  },
  {
    id: "paywall-8",
    title: "Paywall scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "paywall", "loading"],
  },
  {
    id: "paywall-9",
    title: "Paywall scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "paywall", "success"],
  },
  {
    id: "paywall-10",
    title: "Paywall scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "paywall", "warning"],
  },
  {
    id: "paywall-11",
    title: "Paywall scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "paywall", "error"],
  },
  {
    id: "paywall-12",
    title: "Paywall scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "paywall", "empty"],
  },
  {
    id: "paywall-13",
    title: "Paywall scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "paywall", "ready"],
  },
  {
    id: "paywall-14",
    title: "Paywall scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "paywall", "loading"],
  },
  {
    id: "paywall-15",
    title: "Paywall scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "paywall", "success"],
  },
  {
    id: "paywall-16",
    title: "Paywall scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for paywall; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "paywall", "warning"],
  }
];
export function getPaywall(id:string): PaywallFixture|undefined { return PAYWALL.find(item=>item.id===id); }
export function byStatePaywall(state:PaywallFixture['state']): PaywallFixture[] { return PAYWALL.filter(item=>item.state===state); }
export function featuredPaywall(): PaywallFixture { return PAYWALL[0]; }
export function countPaywall(): number { return PAYWALL.length; }
export function summaryPaywall(): string { return `$<built-in function len> fixtures for paywall`; }
export const PAYWALL_README = "Use paywall fixtures for deterministic mock screenshots and scripted demo states.";
export const PAYWALL_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPaywall(): boolean { return PAYWALL.some(item=>item.state==='error'); }
export function hasLoadingPaywall(): boolean { return PAYWALL.some(item=>item.state==='loading'); }
export function hasEmptyPaywall(): boolean { return PAYWALL.some(item=>item.state==='empty'); }
export function averageScorePaywall(): number { return Math.round(PAYWALL.reduce((a,b)=>a+b.score,0)/Math.max(PAYWALL.length,1)); }
export function maxScorePaywall(): number { return Math.max(...PAYWALL.map(item=>item.score)); }
export function minScorePaywall(): number { return Math.min(...PAYWALL.map(item=>item.score)); }
export const PAYWALL_VERSION = 'v6';
export const PAYWALL_SOURCE = 'demo-only';
export function isDemoOnlyPaywall(): true { return true; }
