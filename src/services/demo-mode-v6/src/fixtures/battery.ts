/** Mock domain fixture: battery. */
export interface BatteryFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const BATTERY: BatteryFixture[] = [
  {
    id: "battery-1",
    title: "Battery scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "battery", "ready"],
  },
  {
    id: "battery-2",
    title: "Battery scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "battery", "loading"],
  },
  {
    id: "battery-3",
    title: "Battery scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "battery", "success"],
  },
  {
    id: "battery-4",
    title: "Battery scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "battery", "warning"],
  },
  {
    id: "battery-5",
    title: "Battery scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "battery", "error"],
  },
  {
    id: "battery-6",
    title: "Battery scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "battery", "empty"],
  },
  {
    id: "battery-7",
    title: "Battery scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "battery", "ready"],
  },
  {
    id: "battery-8",
    title: "Battery scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "battery", "loading"],
  },
  {
    id: "battery-9",
    title: "Battery scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "battery", "success"],
  },
  {
    id: "battery-10",
    title: "Battery scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "battery", "warning"],
  },
  {
    id: "battery-11",
    title: "Battery scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "battery", "error"],
  },
  {
    id: "battery-12",
    title: "Battery scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "battery", "empty"],
  },
  {
    id: "battery-13",
    title: "Battery scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "battery", "ready"],
  },
  {
    id: "battery-14",
    title: "Battery scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "battery", "loading"],
  },
  {
    id: "battery-15",
    title: "Battery scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "battery", "success"],
  },
  {
    id: "battery-16",
    title: "Battery scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for battery; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "battery", "warning"],
  }
];
export function getBattery(id:string): BatteryFixture|undefined { return BATTERY.find(item=>item.id===id); }
export function byStateBattery(state:BatteryFixture['state']): BatteryFixture[] { return BATTERY.filter(item=>item.state===state); }
export function featuredBattery(): BatteryFixture { return BATTERY[0]; }
export function countBattery(): number { return BATTERY.length; }
export function summaryBattery(): string { return `$<built-in function len> fixtures for battery`; }
export const BATTERY_README = "Use battery fixtures for deterministic mock screenshots and scripted demo states.";
export const BATTERY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorBattery(): boolean { return BATTERY.some(item=>item.state==='error'); }
export function hasLoadingBattery(): boolean { return BATTERY.some(item=>item.state==='loading'); }
export function hasEmptyBattery(): boolean { return BATTERY.some(item=>item.state==='empty'); }
export function averageScoreBattery(): number { return Math.round(BATTERY.reduce((a,b)=>a+b.score,0)/Math.max(BATTERY.length,1)); }
export function maxScoreBattery(): number { return Math.max(...BATTERY.map(item=>item.score)); }
export function minScoreBattery(): number { return Math.min(...BATTERY.map(item=>item.score)); }
export const BATTERY_VERSION = 'v6';
export const BATTERY_SOURCE = 'demo-only';
export function isDemoOnlyBattery(): true { return true; }
