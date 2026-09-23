export type LibraryFilter = "all" | "attention" | "top";
export type LibraryDateRange = "recent" | "month" | "all";
export const defaultLibraryControls = { query: "", filter: "all" as LibraryFilter, dateRange: "all" as LibraryDateRange };

type FilterableSession = { score: number; date?: string; analysisStages?: { stage: string; tone: "good" | "neutral" | "attention" }[] };

export function filterSessions<T extends FilterableSession>(sessions: T[], filter: LibraryFilter) {
  if (filter === "attention") return sessions.filter((session) => session.analysisStages?.some((stage) => stage.stage === "faults" && stage.tone === "attention"));
  if (filter === "top") return [...sessions].sort((left, right) => right.score - left.score);
  return sessions;
}
export function filterSessionsByDate<T extends FilterableSession>(sessions: T[], range: LibraryDateRange, now = new Date()) { if (range === "all") return sessions; return sessions.filter((session) => { const raw = (session.date ?? "").trim(); const label = raw.toLowerCase(); const looksLikeIso = /^\d{4}-\d{2}-\d{2}/.test(raw); const parsed = looksLikeIso ? new Date(raw) : null; if (looksLikeIso && (!parsed || Number.isNaN(parsed.getTime()))) return false; if (parsed && !Number.isNaN(parsed.getTime())) { const current = new Date(now.getFullYear(), now.getMonth(), now.getDate()); const sessionDay = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()); const days = Math.round((current.getTime() - sessionDay.getTime()) / 86400000); if (range === "recent") return days >= 0 && days <= 1; return parsed.getFullYear() === now.getFullYear() && parsed.getMonth() === now.getMonth(); } if (range === "recent") return label === "today" || label === "yesterday"; return label.length > 0; }); }
export function isLibraryDateRange(value: unknown): value is LibraryDateRange { return value === "recent" || value === "month" || value === "all"; }
export function normalizeLibraryDateRange(value: unknown, fallback: LibraryDateRange = "all"): LibraryDateRange { return isLibraryDateRange(value) ? value : fallback; }
export function nextLibraryDateRange(range: LibraryDateRange): LibraryDateRange { return range === "recent" ? "month" : range === "month" ? "all" : "recent"; }
export function libraryDateRangeLabel(range: LibraryDateRange) { return range === "recent" ? "Recent" : range === "month" ? "This month" : "All time"; }
export function resetLibraryControls() { return { ...defaultLibraryControls }; }
export type LibraryControlKey = "query" | "filter" | "dateRange";
export function formatActiveLibraryFilters(input: { query: string; filter: LibraryFilter; dateRange: LibraryDateRange }) { const parts: string[] = []; if (input.query.trim()) parts.push(`Search: ${input.query.trim()}`); if (input.dateRange !== "all") parts.push(libraryDateRangeLabel(input.dateRange)); if (input.filter !== "all") parts.push(libraryFilterLabel(input.filter)); return parts.length ? parts.join(" · ") : "All swings"; }
export function clearLibraryControl(input: { query: string; filter: LibraryFilter; dateRange: LibraryDateRange }, key: LibraryControlKey) { return { ...input, [key]: defaultLibraryControls[key] }; }

export function isLibraryFilter(value: unknown): value is LibraryFilter { return value === "all" || value === "attention" || value === "top"; }
export function normalizeLibraryFilter(value: unknown, fallback: LibraryFilter = "all"): LibraryFilter { return isLibraryFilter(value) ? value : fallback; }
export function nextLibraryFilter(filter: LibraryFilter): LibraryFilter { return filter === "all" ? "attention" : filter === "attention" ? "top" : "all"; }
export function libraryFilterLabel(filter: LibraryFilter) { return filter === "all" ? "All swings" : filter === "attention" ? "Needs attention" : "Top scores"; }
