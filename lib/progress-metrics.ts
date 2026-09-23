import type { SwingSession } from "@/lib/golf-data";

export type ProgressMetric = "speed" | "tempo" | "hipTurn";
export const progressMetrics: ProgressMetric[] = ["speed", "tempo", "hipTurn"];

export function nextProgressMetric(metric: ProgressMetric): ProgressMetric { return metric === "speed" ? "tempo" : metric === "tempo" ? "hipTurn" : "speed"; }
export function progressMetricLabel(metric: ProgressMetric) { return metric === "speed" ? "Club head speed" : metric === "tempo" ? "Swing tempo" : "Hip rotation"; }
export function progressMetricUnit(metric: ProgressMetric) { return metric === "speed" ? "mph" : metric === "tempo" ? ":1" : "°"; }

function numericValue(session: SwingSession, metric: ProgressMetric) {
  const label = metric === "speed" ? "Club speed" : metric === "tempo" ? "Tempo" : "Hip turn";
  const value = session.metrics.find((item) => item.label === label)?.value ?? "";
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

export function deriveProgressMetric(sessions: SwingSession[], metric: ProgressMetric) {
  const values = sessions.map((session) => numericValue(session, metric)).filter((value): value is number => value !== null);
  const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  const first = values[0];
  const last = values[values.length - 1];
  const changePercent = first && first !== 0 && last !== undefined ? ((last - first) / first) * 100 : null;
  return { values, average, changePercent };
}
