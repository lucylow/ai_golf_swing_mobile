/** Mock domain fixture: network. */
export interface NetworkFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const NETWORK: NetworkFixture[] = [
  {
    id: "network-1",
    title: "Network scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "network", "ready"],
  },
  {
    id: "network-2",
    title: "Network scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "network", "loading"],
  },
  {
    id: "network-3",
    title: "Network scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "network", "success"],
  },
  {
    id: "network-4",
    title: "Network scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "network", "warning"],
  },
  {
    id: "network-5",
    title: "Network scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "network", "error"],
  },
  {
    id: "network-6",
    title: "Network scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "network", "empty"],
  },
  {
    id: "network-7",
    title: "Network scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "network", "ready"],
  },
  {
    id: "network-8",
    title: "Network scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "network", "loading"],
  },
  {
    id: "network-9",
    title: "Network scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "network", "success"],
  },
  {
    id: "network-10",
    title: "Network scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "network", "warning"],
  },
  {
    id: "network-11",
    title: "Network scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "network", "error"],
  },
  {
    id: "network-12",
    title: "Network scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "network", "empty"],
  },
  {
    id: "network-13",
    title: "Network scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "network", "ready"],
  },
  {
    id: "network-14",
    title: "Network scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "network", "loading"],
  },
  {
    id: "network-15",
    title: "Network scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "network", "success"],
  },
  {
    id: "network-16",
    title: "Network scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for network; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "network", "warning"],
  }
];
export function getNetwork(id:string): NetworkFixture|undefined { return NETWORK.find(item=>item.id===id); }
export function byStateNetwork(state:NetworkFixture['state']): NetworkFixture[] { return NETWORK.filter(item=>item.state===state); }
export function featuredNetwork(): NetworkFixture { return NETWORK[0]; }
export function countNetwork(): number { return NETWORK.length; }
export function summaryNetwork(): string { return `$<built-in function len> fixtures for network`; }
export const NETWORK_README = "Use network fixtures for deterministic mock screenshots and scripted demo states.";
export const NETWORK_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorNetwork(): boolean { return NETWORK.some(item=>item.state==='error'); }
export function hasLoadingNetwork(): boolean { return NETWORK.some(item=>item.state==='loading'); }
export function hasEmptyNetwork(): boolean { return NETWORK.some(item=>item.state==='empty'); }
export function averageScoreNetwork(): number { return Math.round(NETWORK.reduce((a,b)=>a+b.score,0)/Math.max(NETWORK.length,1)); }
export function maxScoreNetwork(): number { return Math.max(...NETWORK.map(item=>item.score)); }
export function minScoreNetwork(): number { return Math.min(...NETWORK.map(item=>item.score)); }
export const NETWORK_VERSION = 'v6';
export const NETWORK_SOURCE = 'demo-only';
export function isDemoOnlyNetwork(): true { return true; }
