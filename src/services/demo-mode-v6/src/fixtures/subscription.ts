/** Mock domain fixture: subscription. */
export interface SubscriptionFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SUBSCRIPTION: SubscriptionFixture[] = [
  {
    id: "subscription-1",
    title: "Subscription scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "subscription", "ready"],
  },
  {
    id: "subscription-2",
    title: "Subscription scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "subscription", "loading"],
  },
  {
    id: "subscription-3",
    title: "Subscription scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "subscription", "success"],
  },
  {
    id: "subscription-4",
    title: "Subscription scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "subscription", "warning"],
  },
  {
    id: "subscription-5",
    title: "Subscription scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "subscription", "error"],
  },
  {
    id: "subscription-6",
    title: "Subscription scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "subscription", "empty"],
  },
  {
    id: "subscription-7",
    title: "Subscription scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "subscription", "ready"],
  },
  {
    id: "subscription-8",
    title: "Subscription scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "subscription", "loading"],
  },
  {
    id: "subscription-9",
    title: "Subscription scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "subscription", "success"],
  },
  {
    id: "subscription-10",
    title: "Subscription scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "subscription", "warning"],
  },
  {
    id: "subscription-11",
    title: "Subscription scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "subscription", "error"],
  },
  {
    id: "subscription-12",
    title: "Subscription scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "subscription", "empty"],
  },
  {
    id: "subscription-13",
    title: "Subscription scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "subscription", "ready"],
  },
  {
    id: "subscription-14",
    title: "Subscription scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "subscription", "loading"],
  },
  {
    id: "subscription-15",
    title: "Subscription scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "subscription", "success"],
  },
  {
    id: "subscription-16",
    title: "Subscription scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for subscription; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "subscription", "warning"],
  }
];
export function getSubscription(id:string): SubscriptionFixture|undefined { return SUBSCRIPTION.find(item=>item.id===id); }
export function byStateSubscription(state:SubscriptionFixture['state']): SubscriptionFixture[] { return SUBSCRIPTION.filter(item=>item.state===state); }
export function featuredSubscription(): SubscriptionFixture { return SUBSCRIPTION[0]; }
export function countSubscription(): number { return SUBSCRIPTION.length; }
export function summarySubscription(): string { return `$<built-in function len> fixtures for subscription`; }
export const SUBSCRIPTION_README = "Use subscription fixtures for deterministic mock screenshots and scripted demo states.";
export const SUBSCRIPTION_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSubscription(): boolean { return SUBSCRIPTION.some(item=>item.state==='error'); }
export function hasLoadingSubscription(): boolean { return SUBSCRIPTION.some(item=>item.state==='loading'); }
export function hasEmptySubscription(): boolean { return SUBSCRIPTION.some(item=>item.state==='empty'); }
export function averageScoreSubscription(): number { return Math.round(SUBSCRIPTION.reduce((a,b)=>a+b.score,0)/Math.max(SUBSCRIPTION.length,1)); }
export function maxScoreSubscription(): number { return Math.max(...SUBSCRIPTION.map(item=>item.score)); }
export function minScoreSubscription(): number { return Math.min(...SUBSCRIPTION.map(item=>item.score)); }
export const SUBSCRIPTION_VERSION = 'v6';
export const SUBSCRIPTION_SOURCE = 'demo-only';
export function isDemoOnlySubscription(): true { return true; }
