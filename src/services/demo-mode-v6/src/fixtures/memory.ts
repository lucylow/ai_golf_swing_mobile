/** Mock domain fixture: memory. */
export interface MemoryFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const MEMORY: MemoryFixture[] = [
  {
    id: "memory-1",
    title: "Memory scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "memory", "ready"],
  },
  {
    id: "memory-2",
    title: "Memory scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "memory", "loading"],
  },
  {
    id: "memory-3",
    title: "Memory scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "memory", "success"],
  },
  {
    id: "memory-4",
    title: "Memory scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "memory", "warning"],
  },
  {
    id: "memory-5",
    title: "Memory scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "memory", "error"],
  },
  {
    id: "memory-6",
    title: "Memory scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "memory", "empty"],
  },
  {
    id: "memory-7",
    title: "Memory scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "memory", "ready"],
  },
  {
    id: "memory-8",
    title: "Memory scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "memory", "loading"],
  },
  {
    id: "memory-9",
    title: "Memory scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "memory", "success"],
  },
  {
    id: "memory-10",
    title: "Memory scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "memory", "warning"],
  },
  {
    id: "memory-11",
    title: "Memory scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "memory", "error"],
  },
  {
    id: "memory-12",
    title: "Memory scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "memory", "empty"],
  },
  {
    id: "memory-13",
    title: "Memory scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "memory", "ready"],
  },
  {
    id: "memory-14",
    title: "Memory scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "memory", "loading"],
  },
  {
    id: "memory-15",
    title: "Memory scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "memory", "success"],
  },
  {
    id: "memory-16",
    title: "Memory scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for memory; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "memory", "warning"],
  }
];
export function getMemory(id:string): MemoryFixture|undefined { return MEMORY.find(item=>item.id===id); }
export function byStateMemory(state:MemoryFixture['state']): MemoryFixture[] { return MEMORY.filter(item=>item.state===state); }
export function featuredMemory(): MemoryFixture { return MEMORY[0]; }
export function countMemory(): number { return MEMORY.length; }
export function summaryMemory(): string { return `$<built-in function len> fixtures for memory`; }
export const MEMORY_README = "Use memory fixtures for deterministic mock screenshots and scripted demo states.";
export const MEMORY_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorMemory(): boolean { return MEMORY.some(item=>item.state==='error'); }
export function hasLoadingMemory(): boolean { return MEMORY.some(item=>item.state==='loading'); }
export function hasEmptyMemory(): boolean { return MEMORY.some(item=>item.state==='empty'); }
export function averageScoreMemory(): number { return Math.round(MEMORY.reduce((a,b)=>a+b.score,0)/Math.max(MEMORY.length,1)); }
export function maxScoreMemory(): number { return Math.max(...MEMORY.map(item=>item.score)); }
export function minScoreMemory(): number { return Math.min(...MEMORY.map(item=>item.score)); }
export const MEMORY_VERSION = 'v6';
export const MEMORY_SOURCE = 'demo-only';
export function isDemoOnlyMemory(): true { return true; }
