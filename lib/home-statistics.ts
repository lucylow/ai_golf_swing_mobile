import type { SwingSession } from "./golf-data";

export type HomeStatistics = {
  latest: SwingSession | null;
  recent: SwingSession[];
  weeklyChangeLabel: string;
  streakLabel: string;
};

export type HomeDrill = { id: string; title: string; description: string; time: string; steps?: unknown[] };

export function homeDrillProgressLabel(drill: HomeDrill | null, completedIndexes: unknown): string {
  const total = Array.isArray(drill?.steps)
    ? drill.steps.filter((step) => typeof step === "string" && step.trim().length > 0).length
    : 0;
  if (total === 0) return "Practice steps unavailable";

  const completed = Array.isArray(completedIndexes)
    ? new Set(completedIndexes.filter((index): index is number => Number.isInteger(index) && index >= 0 && index < total)).size
    : 0;
  return `${completed}/${total} steps`;
}

export type WeeklyPracticeDay = { key: string; label: string; count: number; practiced: boolean };
export type PracticeHistoryItem = { drillId: string; title: string; timestamp: string };

export type PracticeHistoryRange = "all" | "week" | "month";

export function normalizePracticeHistoryRange(value: unknown): PracticeHistoryRange {
  return value === "week" || value === "month" ? value : "all";
}

export function normalizePracticeHistoryQuery(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 80) : "";
}

export function resetPracticeHistoryFilters(): { range: PracticeHistoryRange; query: string } {
  return { range: "all", query: "" };
}

export function practiceHistoryRangeLabel(range: PracticeHistoryRange): string {
  return range === "week" ? "Last 7 days" : range === "month" ? "Last 30 days" : "All time";
}

export function filterPracticeHistory(items: PracticeHistoryItem[], range: PracticeHistoryRange, query: string, now: Date = new Date()): PracticeHistoryItem[] {
  const nowTime = now.getTime();
  const cutoff = range === "week" ? nowTime - 7 * 24 * 60 * 60 * 1000 : range === "month" ? nowTime - 30 * 24 * 60 * 60 * 1000 : Number.NEGATIVE_INFINITY;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const timestamp = new Date(item.timestamp).getTime();
    if (!Number.isFinite(timestamp) || timestamp > nowTime || timestamp < cutoff) return false;
    return !normalizedQuery || item.title.toLocaleLowerCase().includes(normalizedQuery);
  });
}

export function serializePracticeHistory(items: PracticeHistoryItem[]): string {
  const safeItems = items.filter((item) => item && typeof item.drillId === "string" && typeof item.title === "string" && !Number.isNaN(new Date(item.timestamp).getTime())).slice(0, 10);
  if (!safeItems.length) return "AI Golf Swing Coach\nPractice history: empty";
  return ["AI Golf Swing Coach", "Practice history", ...safeItems.map((item) => `- ${item.title.replace(/[\r\n]+/g, " ").slice(0, 80)} (${new Date(item.timestamp).toISOString()})`)].join("\n");
}

export function practiceHistoryClearCopy(): { title: string; message: string; confirm: string; cancel: string } {
  return { title: "Clear practice history?", message: "This removes last-practiced dates from this device. Drill completion progress stays saved.", confirm: "Clear history", cancel: "Keep history" };
}

export function practiceHistoryStateCopy(hasHistory: boolean): { title: string; body: string } {
  return hasHistory
    ? { title: "Recent practice", body: "Open a drill to review its steps." }
    : { title: "No practice history yet", body: "Complete a drill step and it will appear here on this device." };
}

export function derivePracticeHistory(timestamps: Record<string, string>, drillMetadata: Array<{ id: string; title?: string }>, now = new Date(), limit = 3): PracticeHistoryItem[] {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 10) : 3;
  const titles = new Map(drillMetadata.map((drill) => [drill.id, typeof drill.title === "string" && drill.title.trim() ? drill.title.trim() : "Practice drill"]));
  return Object.entries(timestamps)
    .map(([drillId, timestamp]) => ({ drillId, timestamp, parsed: new Date(timestamp) }))
    .filter((item) => item.drillId.trim().length > 0 && !Number.isNaN(item.parsed.getTime()) && item.parsed.getTime() <= now.getTime())
    .sort((a, b) => b.parsed.getTime() - a.parsed.getTime())
    .slice(0, safeLimit)
    .map(({ drillId, timestamp }) => ({ drillId, timestamp, title: titles.get(drillId) ?? "Practice drill" }));
}

export function selectPracticeDrillForDay(dayKey: string, timestamps: Record<string, string>, now = new Date()): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) return null;
  for (const [drillId, timestamp] of Object.entries(timestamps)) {
    const parsed = new Date(timestamp);
    if (!Number.isNaN(parsed.getTime()) && parsed.getTime() <= now.getTime() && parsed.toISOString().slice(0, 10) === dayKey) return drillId;
  }
  return null;
}

export function deriveWeeklyPracticeCalendar(timestamps: Record<string, string>, now = new Date()): WeeklyPracticeDay[] {
  const counts = new Map<string, number>();
  for (const timestamp of Object.values(timestamps)) {
    const parsed = new Date(timestamp);
    if (Number.isNaN(parsed.getTime()) || parsed.getTime() > now.getTime()) continue;
    const key = parsed.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const days: WeeklyPracticeDay[] = [];
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - 6);
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);
    days.push({ key, label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date).slice(0, 2).toUpperCase(), count: counts.get(key) ?? 0, practiced: counts.has(key) });
  }
  return days;
}

export function weeklyPracticeAccessibilityLabel(days: WeeklyPracticeDay[]): string {
  const practiced = days.filter((day) => day.practiced).length;
  return `${practiced} of ${days.length} days practiced in the last week`;
}

export function derivePracticeStreak(timestamps: Record<string, string>, now = new Date()): number {
  const practicedDays = new Set<string>();
  for (const timestamp of Object.values(timestamps)) {
    const parsed = new Date(timestamp);
    if (Number.isNaN(parsed.getTime()) || parsed.getTime() > now.getTime()) continue;
    practicedDays.add(parsed.toISOString().slice(0, 10));
  }
  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const anchor = practicedDays.has(today.toISOString().slice(0, 10)) ? today : practicedDays.has(yesterday.toISOString().slice(0, 10)) ? yesterday : null;
  if (!anchor) return 0;
  let streak = 0;
  const cursor = new Date(anchor);
  while (practicedDays.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export function isPracticeLoggedToday(timestamps: Record<string, string>, now = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  return Object.values(timestamps).some((timestamp) => {
    const parsed = new Date(timestamp);
    return !Number.isNaN(parsed.getTime()) && parsed.getTime() <= now.getTime() && parsed.toISOString().slice(0, 10) === today;
  });
}

export function todayPracticeLabel(isComplete: boolean): string {
  return isComplete ? "Complete" : "Not yet";
}

export function homePracticeActionLabel(isComplete: boolean, hasRecommendation: boolean): string {
  if (!hasRecommendation) return "Practice unavailable";
  return isComplete ? "Review today’s drill" : "Practice now";
}

export function practicePrompt(timestamps: Record<string, string>, now = new Date()): string {
  const calendar = deriveWeeklyPracticeCalendar(timestamps, now);
  const today = calendar[calendar.length - 1];
  if (today?.practiced) return "Today's practice is logged. Keep the rhythm going.";
  const streak = derivePracticeStreak(timestamps, now);
  return streak > 0 ? `Practice today to keep your ${streak}-day streak going.` : "Start your practice streak with one short session today.";
}

export function practiceStreakLabel(streak: number): string {
  const safeStreak = Number.isFinite(streak) && streak > 0 ? Math.floor(streak) : 0;
  return `${safeStreak} day${safeStreak === 1 ? "" : "s"} streak`;
}

export function getTimeOfDayGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function formatHomeDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date).toLocaleUpperCase();
}

export function getHomeInitials(displayName: string): string {
  const names = displayName.trim().split(/\s+/).filter(Boolean);
  if (names.length === 0) return "?";
  return names.slice(0, 2).map((name) => name[0]).join("").toLocaleUpperCase();
}

export function getHomeFirstName(displayName: string): string {
  return displayName.trim().split(/\s+/)[0] || "there";
}

export function selectHomeDrill(session: SwingSession | null, drills: HomeDrill[]): HomeDrill | null {
  if (!drills.length) return null;
  const fault = session?.analysisStages?.find((stage) => stage.stage === "faults")?.value?.toLocaleLowerCase();
  if (fault) {
    const matching = drills.find((drill) => drill.title.toLocaleLowerCase().includes(fault.split(" ")[0]));
    if (matching) return matching;
  }
  return drills[0];
}

export function deriveHomeStatistics(sessions: SwingSession[]): HomeStatistics {
  const recent = sessions.slice(0, 3);
  const latest = recent[0] ?? null;
  const previous = recent[1] ?? null;
  const weeklyChange = latest && previous ? latest.score - previous.score : 0;
  const sign = weeklyChange > 0 ? "+" : "";

  return {
    latest,
    recent,
    weeklyChangeLabel: `${sign}${weeklyChange} pts`,
    streakLabel: `${Math.min(sessions.length, 7)} session${sessions.length === 1 ? "" : "s"}`,
  };
}
