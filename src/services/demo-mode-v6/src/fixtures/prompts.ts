/** Mock domain fixture: prompts. */
export interface PromptsFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const PROMPTS: PromptsFixture[] = [
  {
    id: "prompts-1",
    title: "Prompts scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "prompts", "ready"],
  },
  {
    id: "prompts-2",
    title: "Prompts scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "prompts", "loading"],
  },
  {
    id: "prompts-3",
    title: "Prompts scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "prompts", "success"],
  },
  {
    id: "prompts-4",
    title: "Prompts scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "prompts", "warning"],
  },
  {
    id: "prompts-5",
    title: "Prompts scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "prompts", "error"],
  },
  {
    id: "prompts-6",
    title: "Prompts scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "prompts", "empty"],
  },
  {
    id: "prompts-7",
    title: "Prompts scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "prompts", "ready"],
  },
  {
    id: "prompts-8",
    title: "Prompts scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "prompts", "loading"],
  },
  {
    id: "prompts-9",
    title: "Prompts scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "prompts", "success"],
  },
  {
    id: "prompts-10",
    title: "Prompts scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "prompts", "warning"],
  },
  {
    id: "prompts-11",
    title: "Prompts scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "prompts", "error"],
  },
  {
    id: "prompts-12",
    title: "Prompts scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "prompts", "empty"],
  },
  {
    id: "prompts-13",
    title: "Prompts scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "prompts", "ready"],
  },
  {
    id: "prompts-14",
    title: "Prompts scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "prompts", "loading"],
  },
  {
    id: "prompts-15",
    title: "Prompts scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "prompts", "success"],
  },
  {
    id: "prompts-16",
    title: "Prompts scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for prompts; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "prompts", "warning"],
  }
];
export function getPrompts(id:string): PromptsFixture|undefined { return PROMPTS.find(item=>item.id===id); }
export function byStatePrompts(state:PromptsFixture['state']): PromptsFixture[] { return PROMPTS.filter(item=>item.state===state); }
export function featuredPrompts(): PromptsFixture { return PROMPTS[0]; }
export function countPrompts(): number { return PROMPTS.length; }
export function summaryPrompts(): string { return `$<built-in function len> fixtures for prompts`; }
export const PROMPTS_README = "Use prompts fixtures for deterministic mock screenshots and scripted demo states.";
export const PROMPTS_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPrompts(): boolean { return PROMPTS.some(item=>item.state==='error'); }
export function hasLoadingPrompts(): boolean { return PROMPTS.some(item=>item.state==='loading'); }
export function hasEmptyPrompts(): boolean { return PROMPTS.some(item=>item.state==='empty'); }
export function averageScorePrompts(): number { return Math.round(PROMPTS.reduce((a,b)=>a+b.score,0)/Math.max(PROMPTS.length,1)); }
export function maxScorePrompts(): number { return Math.max(...PROMPTS.map(item=>item.score)); }
export function minScorePrompts(): number { return Math.min(...PROMPTS.map(item=>item.score)); }
export const PROMPTS_VERSION = 'v6';
export const PROMPTS_SOURCE = 'demo-only';
export function isDemoOnlyPrompts(): true { return true; }
