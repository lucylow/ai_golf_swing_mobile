/** Mock domain fixture: notifications. */
export interface NotificationsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const NOTIFICATIONS: NotificationsFixture[] = [
  {
    id: "notifications-1",
    title: "Notifications scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "notifications", "ready"],
  },
  {
    id: "notifications-2",
    title: "Notifications scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "notifications", "loading"],
  },
  {
    id: "notifications-3",
    title: "Notifications scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "notifications", "success"],
  },
  {
    id: "notifications-4",
    title: "Notifications scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "notifications", "warning"],
  },
  {
    id: "notifications-5",
    title: "Notifications scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "notifications", "error"],
  },
  {
    id: "notifications-6",
    title: "Notifications scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "notifications", "empty"],
  },
  {
    id: "notifications-7",
    title: "Notifications scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "notifications", "ready"],
  },
  {
    id: "notifications-8",
    title: "Notifications scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "notifications", "loading"],
  },
  {
    id: "notifications-9",
    title: "Notifications scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "notifications", "success"],
  },
  {
    id: "notifications-10",
    title: "Notifications scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "notifications", "warning"],
  },
  {
    id: "notifications-11",
    title: "Notifications scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "notifications", "error"],
  },
  {
    id: "notifications-12",
    title: "Notifications scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "notifications", "empty"],
  },
  {
    id: "notifications-13",
    title: "Notifications scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "notifications", "ready"],
  },
  {
    id: "notifications-14",
    title: "Notifications scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "notifications", "loading"],
  },
  {
    id: "notifications-15",
    title: "Notifications scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "notifications", "success"],
  },
  {
    id: "notifications-16",
    title: "Notifications scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for notifications; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "notifications", "warning"],
  }
];
export function getNotifications(id:string): NotificationsFixture|undefined { return NOTIFICATIONS.find(item=>item.id===id); }
export function byStateNotifications(state:NotificationsFixture['state']): NotificationsFixture[] { return NOTIFICATIONS.filter(item=>item.state===state); }
export function featuredNotifications(): NotificationsFixture { return NOTIFICATIONS[0]; }
export function countNotifications(): number { return NOTIFICATIONS.length; }
export function summaryNotifications(): string { return `$<built-in function len> fixtures for notifications`; }
export const NOTIFICATIONS_README = "Use notifications fixtures for deterministic mock screenshots and scripted demo states.";
export const NOTIFICATIONS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorNotifications(): boolean { return NOTIFICATIONS.some(item=>item.state==='error'); }
export function hasLoadingNotifications(): boolean { return NOTIFICATIONS.some(item=>item.state==='loading'); }
export function hasEmptyNotifications(): boolean { return NOTIFICATIONS.some(item=>item.state==='empty'); }
export function averageScoreNotifications(): number { return Math.round(NOTIFICATIONS.reduce((a,b)=>a+b.score,0)/Math.max(NOTIFICATIONS.length,1)); }
export function maxScoreNotifications(): number { return Math.max(...NOTIFICATIONS.map(item=>item.score)); }
export function minScoreNotifications(): number { return Math.min(...NOTIFICATIONS.map(item=>item.score)); }
export const NOTIFICATIONS_VERSION = 'v6';
export const NOTIFICATIONS_SOURCE = 'demo-only';
export function isDemoOnlyNotifications(): true { return true; }
