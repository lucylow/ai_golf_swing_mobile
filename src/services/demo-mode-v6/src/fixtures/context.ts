/** Mock domain fixture: context. */
export interface ContextFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const CONTEXT: ContextFixture[] = [
  {
    id: "context-1",
    title: "Context scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "context", "ready"],
  },
  {
    id: "context-2",
    title: "Context scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "context", "loading"],
  },
  {
    id: "context-3",
    title: "Context scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "context", "success"],
  },
  {
    id: "context-4",
    title: "Context scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "context", "warning"],
  },
  {
    id: "context-5",
    title: "Context scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "context", "error"],
  },
  {
    id: "context-6",
    title: "Context scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "context", "empty"],
  },
  {
    id: "context-7",
    title: "Context scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "context", "ready"],
  },
  {
    id: "context-8",
    title: "Context scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "context", "loading"],
  },
  {
    id: "context-9",
    title: "Context scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "context", "success"],
  },
  {
    id: "context-10",
    title: "Context scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "context", "warning"],
  },
  {
    id: "context-11",
    title: "Context scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "context", "error"],
  },
  {
    id: "context-12",
    title: "Context scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "context", "empty"],
  },
  {
    id: "context-13",
    title: "Context scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "context", "ready"],
  },
  {
    id: "context-14",
    title: "Context scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "context", "loading"],
  },
  {
    id: "context-15",
    title: "Context scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "context", "success"],
  },
  {
    id: "context-16",
    title: "Context scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for context; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "context", "warning"],
  }
];
export function getContext(id:string): ContextFixture|undefined { return CONTEXT.find(item=>item.id===id); }
export function byStateContext(state:ContextFixture['state']): ContextFixture[] { return CONTEXT.filter(item=>item.state===state); }
export function featuredContext(): ContextFixture { return CONTEXT[0]; }
export function countContext(): number { return CONTEXT.length; }
export function summaryContext(): string { return `$<built-in function len> fixtures for context`; }
export const CONTEXT_README = "Use context fixtures for deterministic mock screenshots and scripted demo states.";
export const CONTEXT_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorContext(): boolean { return CONTEXT.some(item=>item.state==='error'); }
export function hasLoadingContext(): boolean { return CONTEXT.some(item=>item.state==='loading'); }
export function hasEmptyContext(): boolean { return CONTEXT.some(item=>item.state==='empty'); }
export function averageScoreContext(): number { return Math.round(CONTEXT.reduce((a,b)=>a+b.score,0)/Math.max(CONTEXT.length,1)); }
export function maxScoreContext(): number { return Math.max(...CONTEXT.map(item=>item.score)); }
export function minScoreContext(): number { return Math.min(...CONTEXT.map(item=>item.score)); }
export const CONTEXT_VERSION = 'v6';
export const CONTEXT_SOURCE = 'demo-only';
export function isDemoOnlyContext(): true { return true; }
