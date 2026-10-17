/** Mock domain fixture: help. */
export interface HelpFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const HELP: HelpFixture[] = [
  {
    id: "help-1",
    title: "Help scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "help", "ready"],
  },
  {
    id: "help-2",
    title: "Help scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "help", "loading"],
  },
  {
    id: "help-3",
    title: "Help scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "help", "success"],
  },
  {
    id: "help-4",
    title: "Help scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "help", "warning"],
  },
  {
    id: "help-5",
    title: "Help scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "help", "error"],
  },
  {
    id: "help-6",
    title: "Help scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "help", "empty"],
  },
  {
    id: "help-7",
    title: "Help scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "help", "ready"],
  },
  {
    id: "help-8",
    title: "Help scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "help", "loading"],
  },
  {
    id: "help-9",
    title: "Help scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "help", "success"],
  },
  {
    id: "help-10",
    title: "Help scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "help", "warning"],
  },
  {
    id: "help-11",
    title: "Help scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "help", "error"],
  },
  {
    id: "help-12",
    title: "Help scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "help", "empty"],
  },
  {
    id: "help-13",
    title: "Help scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "help", "ready"],
  },
  {
    id: "help-14",
    title: "Help scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "help", "loading"],
  },
  {
    id: "help-15",
    title: "Help scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "help", "success"],
  },
  {
    id: "help-16",
    title: "Help scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for help; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "help", "warning"],
  }
];
export function getHelp(id:string): HelpFixture|undefined { return HELP.find(item=>item.id===id); }
export function byStateHelp(state:HelpFixture['state']): HelpFixture[] { return HELP.filter(item=>item.state===state); }
export function featuredHelp(): HelpFixture { return HELP[0]; }
export function countHelp(): number { return HELP.length; }
export function summaryHelp(): string { return `$<built-in function len> fixtures for help`; }
export const HELP_README = "Use help fixtures for deterministic mock screenshots and scripted demo states.";
export const HELP_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorHelp(): boolean { return HELP.some(item=>item.state==='error'); }
export function hasLoadingHelp(): boolean { return HELP.some(item=>item.state==='loading'); }
export function hasEmptyHelp(): boolean { return HELP.some(item=>item.state==='empty'); }
export function averageScoreHelp(): number { return Math.round(HELP.reduce((a,b)=>a+b.score,0)/Math.max(HELP.length,1)); }
export function maxScoreHelp(): number { return Math.max(...HELP.map(item=>item.score)); }
export function minScoreHelp(): number { return Math.min(...HELP.map(item=>item.score)); }
export const HELP_VERSION = 'v6';
export const HELP_SOURCE = 'demo-only';
export function isDemoOnlyHelp(): true { return true; }
