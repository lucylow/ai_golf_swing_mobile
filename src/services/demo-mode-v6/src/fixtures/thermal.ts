/** Mock domain fixture: thermal. */
export interface ThermalFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const THERMAL: ThermalFixture[] = [
  {
    id: "thermal-1",
    title: "Thermal scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "thermal", "ready"],
  },
  {
    id: "thermal-2",
    title: "Thermal scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "thermal", "loading"],
  },
  {
    id: "thermal-3",
    title: "Thermal scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "thermal", "success"],
  },
  {
    id: "thermal-4",
    title: "Thermal scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "thermal", "warning"],
  },
  {
    id: "thermal-5",
    title: "Thermal scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "thermal", "error"],
  },
  {
    id: "thermal-6",
    title: "Thermal scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "thermal", "empty"],
  },
  {
    id: "thermal-7",
    title: "Thermal scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "thermal", "ready"],
  },
  {
    id: "thermal-8",
    title: "Thermal scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "thermal", "loading"],
  },
  {
    id: "thermal-9",
    title: "Thermal scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "thermal", "success"],
  },
  {
    id: "thermal-10",
    title: "Thermal scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "thermal", "warning"],
  },
  {
    id: "thermal-11",
    title: "Thermal scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "thermal", "error"],
  },
  {
    id: "thermal-12",
    title: "Thermal scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "thermal", "empty"],
  },
  {
    id: "thermal-13",
    title: "Thermal scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "thermal", "ready"],
  },
  {
    id: "thermal-14",
    title: "Thermal scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "thermal", "loading"],
  },
  {
    id: "thermal-15",
    title: "Thermal scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "thermal", "success"],
  },
  {
    id: "thermal-16",
    title: "Thermal scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for thermal; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "thermal", "warning"],
  }
];
export function getThermal(id:string): ThermalFixture|undefined { return THERMAL.find(item=>item.id===id); }
export function byStateThermal(state:ThermalFixture['state']): ThermalFixture[] { return THERMAL.filter(item=>item.state===state); }
export function featuredThermal(): ThermalFixture { return THERMAL[0]; }
export function countThermal(): number { return THERMAL.length; }
export function summaryThermal(): string { return `$<built-in function len> fixtures for thermal`; }
export const THERMAL_README = "Use thermal fixtures for deterministic mock screenshots and scripted demo states.";
export const THERMAL_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorThermal(): boolean { return THERMAL.some(item=>item.state==='error'); }
export function hasLoadingThermal(): boolean { return THERMAL.some(item=>item.state==='loading'); }
export function hasEmptyThermal(): boolean { return THERMAL.some(item=>item.state==='empty'); }
export function averageScoreThermal(): number { return Math.round(THERMAL.reduce((a,b)=>a+b.score,0)/Math.max(THERMAL.length,1)); }
export function maxScoreThermal(): number { return Math.max(...THERMAL.map(item=>item.score)); }
export function minScoreThermal(): number { return Math.min(...THERMAL.map(item=>item.score)); }
export const THERMAL_VERSION = 'v6';
export const THERMAL_SOURCE = 'demo-only';
export function isDemoOnlyThermal(): true { return true; }
