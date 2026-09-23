import { describe, expect, it } from "vitest";
import { filterSessions, filterSessionsByDate, isLibraryDateRange, isLibraryFilter, clearLibraryControl, formatActiveLibraryFilters, libraryDateRangeLabel, libraryFilterLabel, nextLibraryDateRange, nextLibraryFilter, normalizeLibraryDateRange, normalizeLibraryFilter, resetLibraryControls } from "../lib/library-filters";

const sessions = [
  { score: 78, analysisStages: [{ stage: "faults", tone: "attention" as const }] },
  { score: 91, analysisStages: [{ stage: "faults", tone: "good" as const }] },
];

describe("library filters", () => {
  it("cycles through clear filter labels", () => { expect(nextLibraryFilter("all")).toBe("attention"); expect(nextLibraryFilter("attention")).toBe("top"); expect(libraryFilterLabel("top")).toBe("Top scores"); });
  it("filters attention sessions and sorts top scores", () => { expect(filterSessions(sessions, "attention")).toHaveLength(1); expect(filterSessions(sessions, "top")[0].score).toBe(91); });
  it("validates persisted filter values and falls back safely", () => { expect(isLibraryFilter("top")).toBe(true); expect(isLibraryFilter("legacy")).toBe(false); expect(normalizeLibraryFilter(undefined)).toBe("all"); expect(normalizeLibraryFilter("legacy", "attention")).toBe("attention"); });
  it("resets all Library controls to their safe defaults", () => { expect(resetLibraryControls()).toEqual({ query: "", filter: "all", dateRange: "all" }); });
  it("formats active search and filter context clearly", () => { expect(formatActiveLibraryFilters({ query: "driver", filter: "top", dateRange: "recent" })).toBe("Search: driver · Recent · Top scores"); expect(formatActiveLibraryFilters({ query: "", filter: "all", dateRange: "all" })).toBe("All swings"); });
  it("removes one Library control without changing the others", () => { const current = { query: "driver", filter: "top" as const, dateRange: "recent" as const }; expect(clearLibraryControl(current, "query")).toEqual({ query: "", filter: "top", dateRange: "recent" }); expect(clearLibraryControl(current, "filter")).toEqual({ query: "driver", filter: "all", dateRange: "recent" }); });
  it("cycles and matches date ranges without breaking legacy records", () => { const dated = [{ score: 80, date: "Today" }, { score: 82, date: "Yesterday" }, { score: 77, date: "Mon" }, { score: 70 }]; expect(nextLibraryDateRange("recent")).toBe("month"); expect(nextLibraryDateRange("month")).toBe("all"); expect(libraryDateRangeLabel("all")).toBe("All time"); expect(isLibraryDateRange("recent")).toBe(true); expect(normalizeLibraryDateRange("month")).toBe("month"); expect(normalizeLibraryDateRange("legacy")).toBe("all"); expect(filterSessionsByDate(dated, "recent")).toHaveLength(2); expect(filterSessionsByDate(dated, "month")).toHaveLength(3); expect(filterSessionsByDate(dated, "all")).toHaveLength(4); const now = new Date("2026-08-21T12:00:00Z"); const iso = [{ score: 90, date: "2026-08-21T09:00:00Z" }, { score: 88, date: "2026-08-20T09:00:00Z" }, { score: 86, date: "2026-07-31T09:00:00Z" }, { score: 70, date: "2026-99-99" }]; expect(filterSessionsByDate(iso, "recent", now)).toHaveLength(2); expect(filterSessionsByDate(iso, "month", now)).toHaveLength(2); });
});
