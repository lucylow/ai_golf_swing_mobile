/** Mock domain fixture: purchase. */
export interface PurchaseFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PURCHASE: PurchaseFixture[] = [
  {
    id: "purchase-1",
    title: "Purchase scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "purchase", "ready"],
  },
  {
    id: "purchase-2",
    title: "Purchase scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "purchase", "loading"],
  },
  {
    id: "purchase-3",
    title: "Purchase scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "purchase", "success"],
  },
  {
    id: "purchase-4",
    title: "Purchase scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "purchase", "warning"],
  },
  {
    id: "purchase-5",
    title: "Purchase scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "purchase", "error"],
  },
  {
    id: "purchase-6",
    title: "Purchase scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "purchase", "empty"],
  },
  {
    id: "purchase-7",
    title: "Purchase scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "purchase", "ready"],
  },
  {
    id: "purchase-8",
    title: "Purchase scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "purchase", "loading"],
  },
  {
    id: "purchase-9",
    title: "Purchase scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "purchase", "success"],
  },
  {
    id: "purchase-10",
    title: "Purchase scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "purchase", "warning"],
  },
  {
    id: "purchase-11",
    title: "Purchase scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "purchase", "error"],
  },
  {
    id: "purchase-12",
    title: "Purchase scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "purchase", "empty"],
  },
  {
    id: "purchase-13",
    title: "Purchase scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "purchase", "ready"],
  },
  {
    id: "purchase-14",
    title: "Purchase scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "purchase", "loading"],
  },
  {
    id: "purchase-15",
    title: "Purchase scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "purchase", "success"],
  },
  {
    id: "purchase-16",
    title: "Purchase scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for purchase; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "purchase", "warning"],
  }
];
export function getPurchase(id:string): PurchaseFixture|undefined { return PURCHASE.find(item=>item.id===id); }
export function byStatePurchase(state:PurchaseFixture['state']): PurchaseFixture[] { return PURCHASE.filter(item=>item.state===state); }
export function featuredPurchase(): PurchaseFixture { return PURCHASE[0]; }
export function countPurchase(): number { return PURCHASE.length; }
export function summaryPurchase(): string { return `$<built-in function len> fixtures for purchase`; }
export const PURCHASE_README = "Use purchase fixtures for deterministic mock screenshots and scripted demo states.";
export const PURCHASE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPurchase(): boolean { return PURCHASE.some(item=>item.state==='error'); }
export function hasLoadingPurchase(): boolean { return PURCHASE.some(item=>item.state==='loading'); }
export function hasEmptyPurchase(): boolean { return PURCHASE.some(item=>item.state==='empty'); }
export function averageScorePurchase(): number { return Math.round(PURCHASE.reduce((a,b)=>a+b.score,0)/Math.max(PURCHASE.length,1)); }
export function maxScorePurchase(): number { return Math.max(...PURCHASE.map(item=>item.score)); }
export function minScorePurchase(): number { return Math.min(...PURCHASE.map(item=>item.score)); }
export const PURCHASE_VERSION = 'v6';
export const PURCHASE_SOURCE = 'demo-only';
export function isDemoOnlyPurchase(): true { return true; }
