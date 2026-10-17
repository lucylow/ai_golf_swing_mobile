/** Mock domain fixture: driver. */
export interface DriverFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const DRIVER: DriverFixture[] = [
  {
    id: "driver-1",
    title: "Driver scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "driver", "ready"],
  },
  {
    id: "driver-2",
    title: "Driver scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "driver", "loading"],
  },
  {
    id: "driver-3",
    title: "Driver scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "driver", "success"],
  },
  {
    id: "driver-4",
    title: "Driver scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "driver", "warning"],
  },
  {
    id: "driver-5",
    title: "Driver scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "driver", "error"],
  },
  {
    id: "driver-6",
    title: "Driver scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "driver", "empty"],
  },
  {
    id: "driver-7",
    title: "Driver scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "driver", "ready"],
  },
  {
    id: "driver-8",
    title: "Driver scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "driver", "loading"],
  },
  {
    id: "driver-9",
    title: "Driver scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "driver", "success"],
  },
  {
    id: "driver-10",
    title: "Driver scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "driver", "warning"],
  },
  {
    id: "driver-11",
    title: "Driver scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "driver", "error"],
  },
  {
    id: "driver-12",
    title: "Driver scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "driver", "empty"],
  },
  {
    id: "driver-13",
    title: "Driver scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "driver", "ready"],
  },
  {
    id: "driver-14",
    title: "Driver scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "driver", "loading"],
  },
  {
    id: "driver-15",
    title: "Driver scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "driver", "success"],
  },
  {
    id: "driver-16",
    title: "Driver scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for driver; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "driver", "warning"],
  }
];
export function getDriver(id:string): DriverFixture|undefined { return DRIVER.find(item=>item.id===id); }
export function byStateDriver(state:DriverFixture['state']): DriverFixture[] { return DRIVER.filter(item=>item.state===state); }
export function featuredDriver(): DriverFixture { return DRIVER[0]; }
export function countDriver(): number { return DRIVER.length; }
export function summaryDriver(): string { return `$<built-in function len> fixtures for driver`; }
export const DRIVER_README = "Use driver fixtures for deterministic mock screenshots and scripted demo states.";
export const DRIVER_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorDriver(): boolean { return DRIVER.some(item=>item.state==='error'); }
export function hasLoadingDriver(): boolean { return DRIVER.some(item=>item.state==='loading'); }
export function hasEmptyDriver(): boolean { return DRIVER.some(item=>item.state==='empty'); }
export function averageScoreDriver(): number { return Math.round(DRIVER.reduce((a,b)=>a+b.score,0)/Math.max(DRIVER.length,1)); }
export function maxScoreDriver(): number { return Math.max(...DRIVER.map(item=>item.score)); }
export function minScoreDriver(): number { return Math.min(...DRIVER.map(item=>item.score)); }
export const DRIVER_VERSION = 'v6';
export const DRIVER_SOURCE = 'demo-only';
export function isDemoOnlyDriver(): true { return true; }
