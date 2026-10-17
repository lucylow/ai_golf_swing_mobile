/** Mock domain fixture: camera. */
export interface CameraFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const CAMERA: CameraFixture[] = [
  {
    id: "camera-1",
    title: "Camera scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "camera", "ready"],
  },
  {
    id: "camera-2",
    title: "Camera scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "camera", "loading"],
  },
  {
    id: "camera-3",
    title: "Camera scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "camera", "success"],
  },
  {
    id: "camera-4",
    title: "Camera scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "camera", "warning"],
  },
  {
    id: "camera-5",
    title: "Camera scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "camera", "error"],
  },
  {
    id: "camera-6",
    title: "Camera scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "camera", "empty"],
  },
  {
    id: "camera-7",
    title: "Camera scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "camera", "ready"],
  },
  {
    id: "camera-8",
    title: "Camera scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "camera", "loading"],
  },
  {
    id: "camera-9",
    title: "Camera scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "camera", "success"],
  },
  {
    id: "camera-10",
    title: "Camera scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "camera", "warning"],
  },
  {
    id: "camera-11",
    title: "Camera scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "camera", "error"],
  },
  {
    id: "camera-12",
    title: "Camera scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "camera", "empty"],
  },
  {
    id: "camera-13",
    title: "Camera scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "camera", "ready"],
  },
  {
    id: "camera-14",
    title: "Camera scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "camera", "loading"],
  },
  {
    id: "camera-15",
    title: "Camera scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "camera", "success"],
  },
  {
    id: "camera-16",
    title: "Camera scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for camera; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "camera", "warning"],
  }
];
export function getCamera(id:string): CameraFixture|undefined { return CAMERA.find(item=>item.id===id); }
export function byStateCamera(state:CameraFixture['state']): CameraFixture[] { return CAMERA.filter(item=>item.state===state); }
export function featuredCamera(): CameraFixture { return CAMERA[0]; }
export function countCamera(): number { return CAMERA.length; }
export function summaryCamera(): string { return `$<built-in function len> fixtures for camera`; }
export const CAMERA_README = "Use camera fixtures for deterministic mock screenshots and scripted demo states.";
export const CAMERA_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorCamera(): boolean { return CAMERA.some(item=>item.state==='error'); }
export function hasLoadingCamera(): boolean { return CAMERA.some(item=>item.state==='loading'); }
export function hasEmptyCamera(): boolean { return CAMERA.some(item=>item.state==='empty'); }
export function averageScoreCamera(): number { return Math.round(CAMERA.reduce((a,b)=>a+b.score,0)/Math.max(CAMERA.length,1)); }
export function maxScoreCamera(): number { return Math.max(...CAMERA.map(item=>item.score)); }
export function minScoreCamera(): number { return Math.min(...CAMERA.map(item=>item.score)); }
export const CAMERA_VERSION = 'v6';
export const CAMERA_SOURCE = 'demo-only';
export function isDemoOnlyCamera(): true { return true; }
