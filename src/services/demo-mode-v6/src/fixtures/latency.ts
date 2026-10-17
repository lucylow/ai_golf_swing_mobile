/** Mock domain fixture: latency. */
export interface LatencyFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const LATENCY: LatencyFixture[] = [
  {
    id: "latency-1",
    title: "Latency scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "latency", "ready"],
  },
  {
    id: "latency-2",
    title: "Latency scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "latency", "loading"],
  },
  {
    id: "latency-3",
    title: "Latency scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "latency", "success"],
  },
  {
    id: "latency-4",
    title: "Latency scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "latency", "warning"],
  },
  {
    id: "latency-5",
    title: "Latency scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "latency", "error"],
  },
  {
    id: "latency-6",
    title: "Latency scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "latency", "empty"],
  },
  {
    id: "latency-7",
    title: "Latency scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "latency", "ready"],
  },
  {
    id: "latency-8",
    title: "Latency scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "latency", "loading"],
  },
  {
    id: "latency-9",
    title: "Latency scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "latency", "success"],
  },
  {
    id: "latency-10",
    title: "Latency scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "latency", "warning"],
  },
  {
    id: "latency-11",
    title: "Latency scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "latency", "error"],
  },
  {
    id: "latency-12",
    title: "Latency scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "latency", "empty"],
  },
  {
    id: "latency-13",
    title: "Latency scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "latency", "ready"],
  },
  {
    id: "latency-14",
    title: "Latency scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "latency", "loading"],
  },
  {
    id: "latency-15",
    title: "Latency scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "latency", "success"],
  },
  {
    id: "latency-16",
    title: "Latency scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for latency; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "latency", "warning"],
  }
];
export function getLatency(id:string): LatencyFixture|undefined { return LATENCY.find(item=>item.id===id); }
export function byStateLatency(state:LatencyFixture['state']): LatencyFixture[] { return LATENCY.filter(item=>item.state===state); }
export function featuredLatency(): LatencyFixture { return LATENCY[0]; }
export function countLatency(): number { return LATENCY.length; }
export function summaryLatency(): string { return `$<built-in function len> fixtures for latency`; }
export const LATENCY_README = "Use latency fixtures for deterministic mock screenshots and scripted demo states.";
export const LATENCY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorLatency(): boolean { return LATENCY.some(item=>item.state==='error'); }
export function hasLoadingLatency(): boolean { return LATENCY.some(item=>item.state==='loading'); }
export function hasEmptyLatency(): boolean { return LATENCY.some(item=>item.state==='empty'); }
export function averageScoreLatency(): number { return Math.round(LATENCY.reduce((a,b)=>a+b.score,0)/Math.max(LATENCY.length,1)); }
export function maxScoreLatency(): number { return Math.max(...LATENCY.map(item=>item.score)); }
export function minScoreLatency(): number { return Math.min(...LATENCY.map(item=>item.score)); }
export const LATENCY_VERSION = 'v6';
export const LATENCY_SOURCE = 'demo-only';
export function isDemoOnlyLatency(): true { return true; }
