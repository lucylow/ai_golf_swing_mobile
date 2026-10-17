/** Mock domain fixture: permissions. */
export interface PermissionsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PERMISSIONS: PermissionsFixture[] = [
  {
    id: "permissions-1",
    title: "Permissions scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "permissions", "ready"],
  },
  {
    id: "permissions-2",
    title: "Permissions scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "permissions", "loading"],
  },
  {
    id: "permissions-3",
    title: "Permissions scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "permissions", "success"],
  },
  {
    id: "permissions-4",
    title: "Permissions scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "permissions", "warning"],
  },
  {
    id: "permissions-5",
    title: "Permissions scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "permissions", "error"],
  },
  {
    id: "permissions-6",
    title: "Permissions scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "permissions", "empty"],
  },
  {
    id: "permissions-7",
    title: "Permissions scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "permissions", "ready"],
  },
  {
    id: "permissions-8",
    title: "Permissions scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "permissions", "loading"],
  },
  {
    id: "permissions-9",
    title: "Permissions scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "permissions", "success"],
  },
  {
    id: "permissions-10",
    title: "Permissions scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "permissions", "warning"],
  },
  {
    id: "permissions-11",
    title: "Permissions scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "permissions", "error"],
  },
  {
    id: "permissions-12",
    title: "Permissions scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "permissions", "empty"],
  },
  {
    id: "permissions-13",
    title: "Permissions scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "permissions", "ready"],
  },
  {
    id: "permissions-14",
    title: "Permissions scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "permissions", "loading"],
  },
  {
    id: "permissions-15",
    title: "Permissions scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "permissions", "success"],
  },
  {
    id: "permissions-16",
    title: "Permissions scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for permissions; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "permissions", "warning"],
  }
];
export function getPermissions(id:string): PermissionsFixture|undefined { return PERMISSIONS.find(item=>item.id===id); }
export function byStatePermissions(state:PermissionsFixture['state']): PermissionsFixture[] { return PERMISSIONS.filter(item=>item.state===state); }
export function featuredPermissions(): PermissionsFixture { return PERMISSIONS[0]; }
export function countPermissions(): number { return PERMISSIONS.length; }
export function summaryPermissions(): string { return `$<built-in function len> fixtures for permissions`; }
export const PERMISSIONS_README = "Use permissions fixtures for deterministic mock screenshots and scripted demo states.";
export const PERMISSIONS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPermissions(): boolean { return PERMISSIONS.some(item=>item.state==='error'); }
export function hasLoadingPermissions(): boolean { return PERMISSIONS.some(item=>item.state==='loading'); }
export function hasEmptyPermissions(): boolean { return PERMISSIONS.some(item=>item.state==='empty'); }
export function averageScorePermissions(): number { return Math.round(PERMISSIONS.reduce((a,b)=>a+b.score,0)/Math.max(PERMISSIONS.length,1)); }
export function maxScorePermissions(): number { return Math.max(...PERMISSIONS.map(item=>item.score)); }
export function minScorePermissions(): number { return Math.min(...PERMISSIONS.map(item=>item.score)); }
export const PERMISSIONS_VERSION = 'v6';
export const PERMISSIONS_SOURCE = 'demo-only';
export function isDemoOnlyPermissions(): true { return true; }
