import { describe, expect, it } from "vitest";
import { deriveHomeStatistics, derivePracticeStreak, deriveWeeklyPracticeCalendar, formatHomeDate, getHomeFirstName, getHomeInitials, getTimeOfDayGreeting, homeDrillProgressLabel, filterPracticeHistory, normalizePracticeHistoryQuery, normalizePracticeHistoryRange, practiceHistoryClearCopy, resetPracticeHistoryFilters, practiceHistoryRangeLabel, practiceHistoryStateCopy, selectPracticeDrillForDay, serializePracticeHistory, homePracticeActionLabel, isPracticeLoggedToday, practicePrompt, practiceStreakLabel, selectHomeDrill, todayPracticeLabel, weeklyPracticeAccessibilityLabel } from "../lib/home-statistics";
import { drills, swings } from "../lib/golf-data";

describe("home statistics", () => {
  it("derives the latest session, recent cards, and score change", () => {
    expect(deriveHomeStatistics(swings)).toMatchObject({ latest: swings[0], recent: swings.slice(0, 3), weeklyChangeLabel: "+6 pts", streakLabel: "3 sessions" });
  });

  it("returns a safe empty state for a new local history", () => {
    expect(deriveHomeStatistics([])).toEqual({ latest: null, recent: [], weeklyChangeLabel: "0 pts", streakLabel: "0 sessions" });
  });

  it("derives a stable seven-day calendar with safe counts and labels", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    const calendar = deriveWeeklyPracticeCalendar({ a: "2026-08-23T08:00:00.000Z", b: "2026-08-23T09:00:00.000Z", c: "2026-08-21T08:00:00.000Z", d: "bad", e: "2026-08-24T08:00:00.000Z" }, now);
    expect(calendar).toHaveLength(7);
    expect(calendar[0].key).toBe("2026-08-17");
    expect(calendar[4]).toMatchObject({ key: "2026-08-21", count: 1, practiced: true });
    expect(calendar[6]).toMatchObject({ key: "2026-08-23", count: 2, practiced: true });
    expect(weeklyPracticeAccessibilityLabel(calendar)).toBe("2 of 7 days practiced in the last week");
  });

  it("derives a current practice streak from valid consecutive dates", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    expect(derivePracticeStreak({ a: "2026-08-23T08:00:00.000Z", b: "2026-08-22T08:00:00.000Z", c: "2026-08-21T08:00:00.000Z" }, now)).toBe(3);
    expect(derivePracticeStreak({ a: "2026-08-22T08:00:00.000Z" }, now)).toBe(1);
    expect(derivePracticeStreak({ a: "2026-08-23T08:00:00.000Z", b: "2026-08-21T08:00:00.000Z", c: "bad", d: "2026-08-24T08:00:00.000Z" }, now)).toBe(1);
    expect(practiceStreakLabel(1)).toBe("1 day streak");
    expect(practiceStreakLabel(0)).toBe("0 days streak");
    expect(homePracticeActionLabel(false, true)).toBe("Practice now");
    expect(homePracticeActionLabel(true, true)).toBe("Review today’s drill");
    expect(homePracticeActionLabel(false, false)).toBe("Practice unavailable");
  });

  it("returns the safe default Practice History filter reset", () => {
    expect(resetPracticeHistoryFilters()).toEqual({ range: "all", query: "" });
  });

  it("normalizes persisted practice-history preferences safely", () => {
    expect(normalizePracticeHistoryRange("week")).toBe("week");
    expect(normalizePracticeHistoryRange("unsafe")).toBe("all");
    expect(normalizePracticeHistoryQuery("  wall turn  ")).toBe("wall turn");
    expect(normalizePracticeHistoryQuery(42)).toBe("");
    expect(normalizePracticeHistoryQuery("x".repeat(100))).toHaveLength(80);
  });

  it("filters practice history by safe date range and drill query", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    const items = [
      { drillId: "today", title: "Step Through", timestamp: "2026-08-23T10:00:00.000Z" },
      { drillId: "week", title: "Wall Turn", timestamp: "2026-08-18T10:00:00.000Z" },
      { drillId: "old", title: "Old Drill", timestamp: "2026-07-01T10:00:00.000Z" },
      { drillId: "future", title: "Future Drill", timestamp: "2026-08-24T10:00:00.000Z" },
    ];
    expect(practiceHistoryRangeLabel("all")).toBe("All time");
    expect(practiceHistoryRangeLabel("week")).toBe("Last 7 days");
    expect(filterPracticeHistory(items, "week", "wall", now).map((item) => item.drillId)).toEqual(["week"]);
    expect(filterPracticeHistory(items, "month", "", now).map((item) => item.drillId)).toEqual(["today", "week"]);
  });

  it("serializes only bounded, sanitized practice-history fields", () => {
    expect(serializePracticeHistory([{ drillId: "step-through", title: "Step\nthrough drill", timestamp: "2026-08-23T10:00:00.000Z" }])).toBe("AI Golf Swing Coach\nPractice history\n- Step through drill (2026-08-23T10:00:00.000Z)");
    expect(serializePracticeHistory([{ drillId: "unknown", title: "", timestamp: "invalid" }])).toBe("AI Golf Swing Coach\nPractice history: empty");
  });

  it("returns explicit clear-history copy that preserves completion progress", () => {
    expect(practiceHistoryClearCopy()).toEqual({ title: "Clear practice history?", message: "This removes last-practiced dates from this device. Drill completion progress stays saved.", confirm: "Clear history", cancel: "Keep history" });
  });

  it("returns clear copy for empty and populated practice history", () => {
    expect(practiceHistoryStateCopy(false)).toEqual({ title: "No practice history yet", body: "Complete a drill step and it will appear here on this device." });
    expect(practiceHistoryStateCopy(true)).toEqual({ title: "Recent practice", body: "Open a drill to review its steps." });
  });

  it("selects a practiced drill for a valid day and ignores unsafe matches", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    expect(selectPracticeDrillForDay("2026-08-22", { "step-through": "2026-08-22T08:00:00.000Z" }, now)).toBe("step-through");
    expect(selectPracticeDrillForDay("2026-08-21", { "step-through": "2026-08-22T08:00:00.000Z" }, now)).toBeNull();
    expect(selectPracticeDrillForDay("2026-08-22", { "step-through": "not-a-date" }, now)).toBeNull();
    expect(selectPracticeDrillForDay("invalid", { "step-through": "2026-08-22T08:00:00.000Z" }, now)).toBeNull();
  });

  it("derives a time-aware greeting across boundary hours", () => {
    expect(getTimeOfDayGreeting(new Date("2026-08-23T11:59:00"))).toBe("Good morning");
    expect(getTimeOfDayGreeting(new Date("2026-08-23T12:00:00"))).toBe("Good afternoon");
    expect(getTimeOfDayGreeting(new Date("2026-08-23T17:59:00"))).toBe("Good afternoon");
    expect(getTimeOfDayGreeting(new Date("2026-08-23T18:00:00"))).toBe("Good evening");
  });

  it("detects only valid practice logged on the current day", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    expect(isPracticeLoggedToday({ today: "2026-08-23T08:00:00.000Z" }, now)).toBe(true);
    expect(isPracticeLoggedToday({ prior: "2026-08-22T23:59:00.000Z" }, now)).toBe(false);
    expect(isPracticeLoggedToday({ future: "2026-08-23T13:00:00.000Z" }, now)).toBe(false);
    expect(isPracticeLoggedToday({ invalid: "not-a-date" }, now)).toBe(false);
    expect(todayPracticeLabel(true)).toBe("Complete");
    expect(todayPracticeLabel(false)).toBe("Not yet");
  });

  it("creates a safe prompt for today, yesterday, and empty practice history", () => {
    const now = new Date("2026-08-23T12:00:00.000Z");
    expect(practicePrompt({ today: "2026-08-23T08:00:00.000Z" }, now)).toBe("Today's practice is logged. Keep the rhythm going.");
    expect(practicePrompt({ yesterday: "2026-08-22T08:00:00.000Z" }, now)).toBe("Practice today to keep your 1-day streak going.");
    expect(practicePrompt({}, now)).toBe("Start your practice streak with one short session today.");
  });

  it("formats the Home date deterministically and derives safe initials", () => {
    expect(formatHomeDate(new Date("2026-08-23T12:00:00.000Z"))).toBe("SUNDAY, AUGUST 23");
    expect(getHomeInitials("Alex Johnson")).toBe("AJ");
    expect(getHomeInitials("  maria  ")).toBe("M");
    expect(getHomeInitials("   ")).toBe("?");
  });

  it("personalizes the greeting safely", () => {
    expect(getHomeFirstName("Alex Johnson")).toBe("Alex");
    expect(getHomeFirstName("   ")).toBe("there");
  });

  it("falls back to the first drill when there is no matching persisted fault", () => {
    expect(selectHomeDrill(swings[0], drills)).toEqual(drills[0]);
  });

  it("formats safe persisted drill-step progress for the Home card", () => {
    expect(homeDrillProgressLabel(drills[0], [0, 0, 2, 99, -1, "1"])).toBe("2/3 steps");
    expect(homeDrillProgressLabel(drills[0], undefined)).toBe("0/3 steps");
    expect(homeDrillProgressLabel(null, [0])).toBe("Practice steps unavailable");
  });

  it("does not expose more than seven sessions in the history label", () => {
    expect(deriveHomeStatistics([...swings, ...swings, ...swings]).streakLabel).toBe("7 sessions");
  });
});
