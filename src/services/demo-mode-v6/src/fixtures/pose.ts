/** Mock domain fixture: pose. */
export interface PoseFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const POSE: PoseFixture[] = [
  {
    id: "pose-1",
    title: "Pose scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "pose", "ready"],
  },
  {
    id: "pose-2",
    title: "Pose scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "pose", "loading"],
  },
  {
    id: "pose-3",
    title: "Pose scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "pose", "success"],
  },
  {
    id: "pose-4",
    title: "Pose scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "pose", "warning"],
  },
  {
    id: "pose-5",
    title: "Pose scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "pose", "error"],
  },
  {
    id: "pose-6",
    title: "Pose scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "pose", "empty"],
  },
  {
    id: "pose-7",
    title: "Pose scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "pose", "ready"],
  },
  {
    id: "pose-8",
    title: "Pose scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "pose", "loading"],
  },
  {
    id: "pose-9",
    title: "Pose scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "pose", "success"],
  },
  {
    id: "pose-10",
    title: "Pose scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "pose", "warning"],
  },
  {
    id: "pose-11",
    title: "Pose scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "pose", "error"],
  },
  {
    id: "pose-12",
    title: "Pose scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "pose", "empty"],
  },
  {
    id: "pose-13",
    title: "Pose scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "pose", "ready"],
  },
  {
    id: "pose-14",
    title: "Pose scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "pose", "loading"],
  },
  {
    id: "pose-15",
    title: "Pose scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "pose", "success"],
  },
  {
    id: "pose-16",
    title: "Pose scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for pose; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "pose", "warning"],
  }
];
export function getPose(id:string): PoseFixture|undefined { return POSE.find(item=>item.id===id); }
export function byStatePose(state:PoseFixture['state']): PoseFixture[] { return POSE.filter(item=>item.state===state); }
export function featuredPose(): PoseFixture { return POSE[0]; }
export function countPose(): number { return POSE.length; }
export function summaryPose(): string { return `$<built-in function len> fixtures for pose`; }
export const POSE_README = "Use pose fixtures for deterministic mock screenshots and scripted demo states.";
export const POSE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorPose(): boolean { return POSE.some(item=>item.state==='error'); }
export function hasLoadingPose(): boolean { return POSE.some(item=>item.state==='loading'); }
export function hasEmptyPose(): boolean { return POSE.some(item=>item.state==='empty'); }
export function averageScorePose(): number { return Math.round(POSE.reduce((a,b)=>a+b.score,0)/Math.max(POSE.length,1)); }
export function maxScorePose(): number { return Math.max(...POSE.map(item=>item.score)); }
export function minScorePose(): number { return Math.min(...POSE.map(item=>item.score)); }
export const POSE_VERSION = 'v6';
export const POSE_SOURCE = 'demo-only';
export function isDemoOnlyPose(): true { return true; }
