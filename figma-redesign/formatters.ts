export function formatScore(score: number) { return `${Math.round(score)}/100`; }
export function formatDelta(delta: number) { return `${delta > 0 ? "+" : ""}${delta}`; }
export function formatMinutes(totalSeconds: number) { const minutes=Math.floor(totalSeconds/60); const seconds=Math.floor(totalSeconds%60); return `${minutes}:${String(seconds).padStart(2,"0")}`; }
export function formatDateLabel(value: string) { const date=new Date(value); if(Number.isNaN(date.getTime())) return value; return date.toLocaleDateString(undefined,{month:"short",day:"numeric"}); }
export function compactCount(value: number) { if(value<1000) return String(value); return `${(value/1000).toFixed(value<10000?1:0)}k`; }
export function metricStatus(score: number) { if(score>=85) return "GOOD" as const; if(score>=75) return "WATCH" as const; return "FOCUS" as const; }
export function scoreTone(score: number) { if(score>=85) return "good" as const; if(score>=75) return "medium" as const; return "high" as const; }
export function clampPercent(value: number) { return Math.max(0, Math.min(100, value)); }
