/** Mock domain fixture: devices. */
export interface DevicesFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const DEVICES: DevicesFixture[] = [
  {
    id: "devices-1",
    title: "Devices scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "devices", "ready"],
  },
  {
    id: "devices-2",
    title: "Devices scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "devices", "loading"],
  },
  {
    id: "devices-3",
    title: "Devices scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "devices", "success"],
  },
  {
    id: "devices-4",
    title: "Devices scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "devices", "warning"],
  },
  {
    id: "devices-5",
    title: "Devices scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "devices", "error"],
  },
  {
    id: "devices-6",
    title: "Devices scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "devices", "empty"],
  },
  {
    id: "devices-7",
    title: "Devices scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "devices", "ready"],
  },
  {
    id: "devices-8",
    title: "Devices scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "devices", "loading"],
  },
  {
    id: "devices-9",
    title: "Devices scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "devices", "success"],
  },
  {
    id: "devices-10",
    title: "Devices scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "devices", "warning"],
  },
  {
    id: "devices-11",
    title: "Devices scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "devices", "error"],
  },
  {
    id: "devices-12",
    title: "Devices scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "devices", "empty"],
  },
  {
    id: "devices-13",
    title: "Devices scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "devices", "ready"],
  },
  {
    id: "devices-14",
    title: "Devices scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "devices", "loading"],
  },
  {
    id: "devices-15",
    title: "Devices scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "devices", "success"],
  },
  {
    id: "devices-16",
    title: "Devices scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for devices; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "devices", "warning"],
  }
];
export function getDevices(id:string): DevicesFixture|undefined { return DEVICES.find(item=>item.id===id); }
export function byStateDevices(state:DevicesFixture['state']): DevicesFixture[] { return DEVICES.filter(item=>item.state===state); }
export function featuredDevices(): DevicesFixture { return DEVICES[0]; }
export function countDevices(): number { return DEVICES.length; }
export function summaryDevices(): string { return `$<built-in function len> fixtures for devices`; }
export const DEVICES_README = "Use devices fixtures for deterministic mock screenshots and scripted demo states.";
export const DEVICES_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorDevices(): boolean { return DEVICES.some(item=>item.state==='error'); }
export function hasLoadingDevices(): boolean { return DEVICES.some(item=>item.state==='loading'); }
export function hasEmptyDevices(): boolean { return DEVICES.some(item=>item.state==='empty'); }
export function averageScoreDevices(): number { return Math.round(DEVICES.reduce((a,b)=>a+b.score,0)/Math.max(DEVICES.length,1)); }
export function maxScoreDevices(): number { return Math.max(...DEVICES.map(item=>item.score)); }
export function minScoreDevices(): number { return Math.min(...DEVICES.map(item=>item.score)); }
export const DEVICES_VERSION = 'v6';
export const DEVICES_SOURCE = 'demo-only';
export function isDemoOnlyDevices(): true { return true; }
