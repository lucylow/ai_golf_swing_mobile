/** Mock domain fixture: weather. */
export interface WeatherFixture { id:string; title:string; state:'ready'|'loading'|'success'|'warning'|'error'|'empty'; score:number; detail:string; action:string; timestamp:string; tags:string[]; }
export const WEATHER: WeatherFixture[] = [
  {
    id: "weather-1",
    title: "Weather scenario 1",
    state: "ready",
    score: 62,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-01T08:00:00Z",
    tags: ["demo", "weather", "ready"],
  },
  {
    id: "weather-2",
    title: "Weather scenario 2",
    state: "loading",
    score: 69,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-02T09:07:00Z",
    tags: ["demo", "weather", "loading"],
  },
  {
    id: "weather-3",
    title: "Weather scenario 3",
    state: "success",
    score: 76,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-03T10:14:00Z",
    tags: ["demo", "weather", "success"],
  },
  {
    id: "weather-4",
    title: "Weather scenario 4",
    state: "warning",
    score: 83,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-04T11:21:00Z",
    tags: ["demo", "weather", "warning"],
  },
  {
    id: "weather-5",
    title: "Weather scenario 5",
    state: "error",
    score: 90,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-05T12:28:00Z",
    tags: ["demo", "weather", "error"],
  },
  {
    id: "weather-6",
    title: "Weather scenario 6",
    state: "empty",
    score: 97,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-06T13:35:00Z",
    tags: ["demo", "weather", "empty"],
  },
  {
    id: "weather-7",
    title: "Weather scenario 7",
    state: "ready",
    score: 67,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-07T14:42:00Z",
    tags: ["demo", "weather", "ready"],
  },
  {
    id: "weather-8",
    title: "Weather scenario 8",
    state: "loading",
    score: 74,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-08T15:49:00Z",
    tags: ["demo", "weather", "loading"],
  },
  {
    id: "weather-9",
    title: "Weather scenario 9",
    state: "success",
    score: 81,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-09T16:56:00Z",
    tags: ["demo", "weather", "success"],
  },
  {
    id: "weather-10",
    title: "Weather scenario 10",
    state: "warning",
    score: 88,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-10T17:03:00Z",
    tags: ["demo", "weather", "warning"],
  },
  {
    id: "weather-11",
    title: "Weather scenario 11",
    state: "error",
    score: 95,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Upgrade",
    timestamp: "2026-09-11T08:10:00Z",
    tags: ["demo", "weather", "error"],
  },
  {
    id: "weather-12",
    title: "Weather scenario 12",
    state: "empty",
    score: 65,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Reset",
    timestamp: "2026-09-12T09:17:00Z",
    tags: ["demo", "weather", "empty"],
  },
  {
    id: "weather-13",
    title: "Weather scenario 13",
    state: "ready",
    score: 72,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Review",
    timestamp: "2026-09-13T10:24:00Z",
    tags: ["demo", "weather", "ready"],
  },
  {
    id: "weather-14",
    title: "Weather scenario 14",
    state: "loading",
    score: 79,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Retry",
    timestamp: "2026-09-14T11:31:00Z",
    tags: ["demo", "weather", "loading"],
  },
  {
    id: "weather-15",
    title: "Weather scenario 15",
    state: "success",
    score: 86,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Continue",
    timestamp: "2026-09-15T12:38:00Z",
    tags: ["demo", "weather", "success"],
  },
  {
    id: "weather-16",
    title: "Weather scenario 16",
    state: "warning",
    score: 93,
    detail: "Deterministic mock state for weather; safe for demos and visual QA.",
    action: "Recheck",
    timestamp: "2026-09-16T13:45:00Z",
    tags: ["demo", "weather", "warning"],
  }
];
export function getWeather(id:string): WeatherFixture|undefined { return WEATHER.find(item=>item.id===id); }
export function byStateWeather(state:WeatherFixture['state']): WeatherFixture[] { return WEATHER.filter(item=>item.state===state); }
export function featuredWeather(): WeatherFixture { return WEATHER[0]; }
export function countWeather(): number { return WEATHER.length; }
export function summaryWeather(): string { return `$<built-in function len> fixtures for weather`; }
export const WEATHER_README = "Use weather fixtures for deterministic mock screenshots and scripted demo states.";
export const WEATHER_STATES = ['ready','loading','success','warning','error','empty'] as const;
export function hasErrorWeather(): boolean { return WEATHER.some(item=>item.state==='error'); }
export function hasLoadingWeather(): boolean { return WEATHER.some(item=>item.state==='loading'); }
export function hasEmptyWeather(): boolean { return WEATHER.some(item=>item.state==='empty'); }
export function averageScoreWeather(): number { return Math.round(WEATHER.reduce((a,b)=>a+b.score,0)/Math.max(WEATHER.length,1)); }
export function maxScoreWeather(): number { return Math.max(...WEATHER.map(item=>item.score)); }
export function minScoreWeather(): number { return Math.min(...WEATHER.map(item=>item.score)); }
export const WEATHER_VERSION = 'v6';
export const WEATHER_SOURCE = 'demo-only';
export function isDemoOnlyWeather(): true { return true; }
