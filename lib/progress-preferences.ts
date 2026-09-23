import type { ProgressMetric } from "@/lib/progress-metrics";

export const defaultProgressMetric: ProgressMetric = "speed";
export function isProgressMetric(value: unknown): value is ProgressMetric { return value === "speed" || value === "tempo" || value === "hipTurn"; }
export function normalizeProgressMetric(value: unknown, fallback: ProgressMetric = defaultProgressMetric): ProgressMetric { return isProgressMetric(value) ? value : fallback; }
export function clearProgressMetricPreference(): ProgressMetric { return defaultProgressMetric; }
export function formatProgressPreference(metric: ProgressMetric): string { return metric === "speed" ? "Club speed" : metric === "tempo" ? "Swing tempo" : "Hip rotation"; }
