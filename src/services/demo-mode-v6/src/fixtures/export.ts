/** Mock domain fixture: export. */
export interface ExportFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const EXPORT: ExportFixture[] = [
  {
    id: "export-1",
    title: "Export scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "export", "ready"],
  },
  {
    id: "export-2",
    title: "Export scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "export", "loading"],
  },
  {
    id: "export-3",
    title: "Export scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "export", "success"],
  },
  {
    id: "export-4",
    title: "Export scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "export", "warning"],
  },
  {
    id: "export-5",
    title: "Export scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "export", "error"],
  },
  {
    id: "export-6",
    title: "Export scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "export", "empty"],
  },
  {
    id: "export-7",
    title: "Export scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "export", "ready"],
  },
  {
    id: "export-8",
    title: "Export scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "export", "loading"],
  },
  {
    id: "export-9",
    title: "Export scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "export", "success"],
  },
  {
    id: "export-10",
    title: "Export scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "export", "warning"],
  },
  {
    id: "export-11",
    title: "Export scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "export", "error"],
  },
  {
    id: "export-12",
    title: "Export scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "export", "empty"],
  },
  {
    id: "export-13",
    title: "Export scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "export", "ready"],
  },
  {
    id: "export-14",
    title: "Export scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "export", "loading"],
  },
  {
    id: "export-15",
    title: "Export scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "export", "success"],
  },
  {
    id: "export-16",
    title: "Export scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for export; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "export", "warning"],
  }
];
export function getExport(id:string): ExportFixture|undefined { return EXPORT.find(item=>item.id===id); }
export function byStateExport(state:ExportFixture['state']): ExportFixture[] { return EXPORT.filter(item=>item.state===state); }
export function featuredExport(): ExportFixture { return EXPORT[0]; }
export function countExport(): number { return EXPORT.length; }
export function summaryExport(): string { return `$<built-in function len> fixtures for export`; }
export const EXPORT_README = "Use export fixtures for deterministic mock screenshots and scripted demo states.";
export const EXPORT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorExport(): boolean { return EXPORT.some(item=>item.state==='error'); }
export function hasLoadingExport(): boolean { return EXPORT.some(item=>item.state==='loading'); }
export function hasEmptyExport(): boolean { return EXPORT.some(item=>item.state==='empty'); }
export function averageScoreExport(): number { return Math.round(EXPORT.reduce((a,b)=>a+b.score,0)/Math.max(EXPORT.length,1)); }
export function maxScoreExport(): number { return Math.max(...EXPORT.map(item=>item.score)); }
export function minScoreExport(): number { return Math.min(...EXPORT.map(item=>item.score)); }
export const EXPORT_VERSION = 'v6';
export const EXPORT_SOURCE = 'demo-only';
export function isDemoOnlyExport(): true { return true; }
