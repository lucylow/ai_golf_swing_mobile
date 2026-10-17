/** Mock domain fixture: responses. */
export interface ResponsesFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const RESPONSES: ResponsesFixture[] = [
  {
    id: "responses-1",
    title: "Responses scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "responses", "ready"],
  },
  {
    id: "responses-2",
    title: "Responses scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "responses", "loading"],
  },
  {
    id: "responses-3",
    title: "Responses scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "responses", "success"],
  },
  {
    id: "responses-4",
    title: "Responses scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "responses", "warning"],
  },
  {
    id: "responses-5",
    title: "Responses scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "responses", "error"],
  },
  {
    id: "responses-6",
    title: "Responses scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "responses", "empty"],
  },
  {
    id: "responses-7",
    title: "Responses scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "responses", "ready"],
  },
  {
    id: "responses-8",
    title: "Responses scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "responses", "loading"],
  },
  {
    id: "responses-9",
    title: "Responses scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "responses", "success"],
  },
  {
    id: "responses-10",
    title: "Responses scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "responses", "warning"],
  },
  {
    id: "responses-11",
    title: "Responses scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "responses", "error"],
  },
  {
    id: "responses-12",
    title: "Responses scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "responses", "empty"],
  },
  {
    id: "responses-13",
    title: "Responses scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "responses", "ready"],
  },
  {
    id: "responses-14",
    title: "Responses scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "responses", "loading"],
  },
  {
    id: "responses-15",
    title: "Responses scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "responses", "success"],
  },
  {
    id: "responses-16",
    title: "Responses scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for responses; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "responses", "warning"],
  }
];
export function getResponses(id:string): ResponsesFixture|undefined { return RESPONSES.find(item=>item.id===id); }
export function byStateResponses(state:ResponsesFixture['state']): ResponsesFixture[] { return RESPONSES.filter(item=>item.state===state); }
export function featuredResponses(): ResponsesFixture { return RESPONSES[0]; }
export function countResponses(): number { return RESPONSES.length; }
export function summaryResponses(): string { return `$<built-in function len> fixtures for responses`; }
export const RESPONSES_README = "Use responses fixtures for deterministic mock screenshots and scripted demo states.";
export const RESPONSES_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorResponses(): boolean { return RESPONSES.some(item=>item.state==='error'); }
export function hasLoadingResponses(): boolean { return RESPONSES.some(item=>item.state==='loading'); }
export function hasEmptyResponses(): boolean { return RESPONSES.some(item=>item.state==='empty'); }
export function averageScoreResponses(): number { return Math.round(RESPONSES.reduce((a,b)=>a+b.score,0)/Math.max(RESPONSES.length,1)); }
export function maxScoreResponses(): number { return Math.max(...RESPONSES.map(item=>item.score)); }
export function minScoreResponses(): number { return Math.min(...RESPONSES.map(item=>item.score)); }
export const RESPONSES_VERSION = 'v6';
export const RESPONSES_SOURCE = 'demo-only';
export function isDemoOnlyResponses(): true { return true; }
