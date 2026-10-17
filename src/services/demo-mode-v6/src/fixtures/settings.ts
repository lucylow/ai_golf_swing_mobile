/** Mock domain fixture: settings. */
export interface SettingsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const SETTINGS: SettingsFixture[] = [
  {
    id: "settings-1",
    title: "Settings scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "settings", "ready"],
  },
  {
    id: "settings-2",
    title: "Settings scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "settings", "loading"],
  },
  {
    id: "settings-3",
    title: "Settings scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "settings", "success"],
  },
  {
    id: "settings-4",
    title: "Settings scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "settings", "warning"],
  },
  {
    id: "settings-5",
    title: "Settings scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "settings", "error"],
  },
  {
    id: "settings-6",
    title: "Settings scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "settings", "empty"],
  },
  {
    id: "settings-7",
    title: "Settings scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "settings", "ready"],
  },
  {
    id: "settings-8",
    title: "Settings scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "settings", "loading"],
  },
  {
    id: "settings-9",
    title: "Settings scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "settings", "success"],
  },
  {
    id: "settings-10",
    title: "Settings scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "settings", "warning"],
  },
  {
    id: "settings-11",
    title: "Settings scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "settings", "error"],
  },
  {
    id: "settings-12",
    title: "Settings scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "settings", "empty"],
  },
  {
    id: "settings-13",
    title: "Settings scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "settings", "ready"],
  },
  {
    id: "settings-14",
    title: "Settings scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "settings", "loading"],
  },
  {
    id: "settings-15",
    title: "Settings scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "settings", "success"],
  },
  {
    id: "settings-16",
    title: "Settings scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for settings; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "settings", "warning"],
  }
];
export function getSettings(id:string): SettingsFixture|undefined { return SETTINGS.find(item=>item.id===id); }
export function byStateSettings(state:SettingsFixture['state']): SettingsFixture[] { return SETTINGS.filter(item=>item.state===state); }
export function featuredSettings(): SettingsFixture { return SETTINGS[0]; }
export function countSettings(): number { return SETTINGS.length; }
export function summarySettings(): string { return `$<built-in function len> fixtures for settings`; }
export const SETTINGS_README = "Use settings fixtures for deterministic mock screenshots and scripted demo states.";
export const SETTINGS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorSettings(): boolean { return SETTINGS.some(item=>item.state==='error'); }
export function hasLoadingSettings(): boolean { return SETTINGS.some(item=>item.state==='loading'); }
export function hasEmptySettings(): boolean { return SETTINGS.some(item=>item.state==='empty'); }
export function averageScoreSettings(): number { return Math.round(SETTINGS.reduce((a,b)=>a+b.score,0)/Math.max(SETTINGS.length,1)); }
export function maxScoreSettings(): number { return Math.max(...SETTINGS.map(item=>item.score)); }
export function minScoreSettings(): number { return Math.min(...SETTINGS.map(item=>item.score)); }
export const SETTINGS_VERSION = 'v6';
export const SETTINGS_SOURCE = 'demo-only';
export function isDemoOnlySettings(): true { return true; }
