/** Mock domain fixture: tempo. */
export interface TempoFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const TEMPO: TempoFixture[] = [
  {
    id: "tempo-1",
    title: "Tempo scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "tempo", "ready"],
  },
  {
    id: "tempo-2",
    title: "Tempo scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "tempo", "loading"],
  },
  {
    id: "tempo-3",
    title: "Tempo scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "tempo", "success"],
  },
  {
    id: "tempo-4",
    title: "Tempo scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "tempo", "warning"],
  },
  {
    id: "tempo-5",
    title: "Tempo scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "tempo", "error"],
  },
  {
    id: "tempo-6",
    title: "Tempo scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "tempo", "empty"],
  },
  {
    id: "tempo-7",
    title: "Tempo scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "tempo", "ready"],
  },
  {
    id: "tempo-8",
    title: "Tempo scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "tempo", "loading"],
  },
  {
    id: "tempo-9",
    title: "Tempo scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "tempo", "success"],
  },
  {
    id: "tempo-10",
    title: "Tempo scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "tempo", "warning"],
  },
  {
    id: "tempo-11",
    title: "Tempo scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "tempo", "error"],
  },
  {
    id: "tempo-12",
    title: "Tempo scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "tempo", "empty"],
  },
  {
    id: "tempo-13",
    title: "Tempo scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "tempo", "ready"],
  },
  {
    id: "tempo-14",
    title: "Tempo scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "tempo", "loading"],
  },
  {
    id: "tempo-15",
    title: "Tempo scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "tempo", "success"],
  },
  {
    id: "tempo-16",
    title: "Tempo scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for tempo; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "tempo", "warning"],
  }
];
export function getTempo(id:string): TempoFixture|undefined { return TEMPO.find(item=>item.id===id); }
export function byStateTempo(state:TempoFixture['state']): TempoFixture[] { return TEMPO.filter(item=>item.state===state); }
export function featuredTempo(): TempoFixture { return TEMPO[0]; }
export function countTempo(): number { return TEMPO.length; }
export function summaryTempo(): string { return `$<built-in function len> fixtures for tempo`; }
export const TEMPO_README = "Use tempo fixtures for deterministic mock screenshots and scripted demo states.";
export const TEMPO_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorTempo(): boolean { return TEMPO.some(item=>item.state==='error'); }
export function hasLoadingTempo(): boolean { return TEMPO.some(item=>item.state==='loading'); }
export function hasEmptyTempo(): boolean { return TEMPO.some(item=>item.state==='empty'); }
export function averageScoreTempo(): number { return Math.round(TEMPO.reduce((a,b)=>a+b.score,0)/Math.max(TEMPO.length,1)); }
export function maxScoreTempo(): number { return Math.max(...TEMPO.map(item=>item.score)); }
export function minScoreTempo(): number { return Math.min(...TEMPO.map(item=>item.score)); }
export const TEMPO_VERSION = 'v6';
export const TEMPO_SOURCE = 'demo-only';
export function isDemoOnlyTempo(): true { return true; }
