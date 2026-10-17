/** Mock domain fixture: course. */
export interface CourseFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const COURSE: CourseFixture[] = [
  {
    id: "course-1",
    title: "Course scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "course", "ready"],
  },
  {
    id: "course-2",
    title: "Course scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "course", "loading"],
  },
  {
    id: "course-3",
    title: "Course scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "course", "success"],
  },
  {
    id: "course-4",
    title: "Course scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "course", "warning"],
  },
  {
    id: "course-5",
    title: "Course scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "course", "error"],
  },
  {
    id: "course-6",
    title: "Course scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "course", "empty"],
  },
  {
    id: "course-7",
    title: "Course scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "course", "ready"],
  },
  {
    id: "course-8",
    title: "Course scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "course", "loading"],
  },
  {
    id: "course-9",
    title: "Course scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "course", "success"],
  },
  {
    id: "course-10",
    title: "Course scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "course", "warning"],
  },
  {
    id: "course-11",
    title: "Course scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "course", "error"],
  },
  {
    id: "course-12",
    title: "Course scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "course", "empty"],
  },
  {
    id: "course-13",
    title: "Course scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "course", "ready"],
  },
  {
    id: "course-14",
    title: "Course scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "course", "loading"],
  },
  {
    id: "course-15",
    title: "Course scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "course", "success"],
  },
  {
    id: "course-16",
    title: "Course scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for course; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "course", "warning"],
  }
];
export function getCourse(id:string): CourseFixture|undefined { return COURSE.find(item=>item.id===id); }
export function byStateCourse(state:CourseFixture['state']): CourseFixture[] { return COURSE.filter(item=>item.state===state); }
export function featuredCourse(): CourseFixture { return COURSE[0]; }
export function countCourse(): number { return COURSE.length; }
export function summaryCourse(): string { return `$<built-in function len> fixtures for course`; }
export const COURSE_README = "Use course fixtures for deterministic mock screenshots and scripted demo states.";
export const COURSE_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorCourse(): boolean { return COURSE.some(item=>item.state==='error'); }
export function hasLoadingCourse(): boolean { return COURSE.some(item=>item.state==='loading'); }
export function hasEmptyCourse(): boolean { return COURSE.some(item=>item.state==='empty'); }
export function averageScoreCourse(): number { return Math.round(COURSE.reduce((a,b)=>a+b.score,0)/Math.max(COURSE.length,1)); }
export function maxScoreCourse(): number { return Math.max(...COURSE.map(item=>item.score)); }
export function minScoreCourse(): number { return Math.min(...COURSE.map(item=>item.score)); }
export const COURSE_VERSION = 'v6';
export const COURSE_SOURCE = 'demo-only';
export function isDemoOnlyCourse(): true { return true; }
