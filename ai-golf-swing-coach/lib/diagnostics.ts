import type { AppDiagnostic } from "@/lib/error-reporting";

export type RuntimeLogSummary = { kind: "premature-close" | "deprecation" | "unknown"; owner: "development-server" | "framework" | "unknown"; title: string; guidance: string };

export function serializeDiagnosticsForClipboard(items: AppDiagnostic[]): string {
  const records = items.map(({ area, errorType, timestamp }) => ({ area, errorType, timestamp }));
  return JSON.stringify({ source: "AI Golf Swing Coach diagnostics", records }, null, 2);
}

export function summarizeRuntimeLog(message: unknown): RuntimeLogSummary {
  const normalized = typeof message === "string" ? message.toLocaleLowerCase() : "";
  if (normalized.includes("premature close")) {
    return { kind: "premature-close", owner: "development-server", title: "Premature request close", guidance: "The development server ended a request early. Retry the request or restart the development server if it repeats." };
  }
  if (normalized.includes("pointerevents is deprecated")) {
    return { kind: "deprecation", owner: "framework", title: "Dependency deprecation warning", guidance: "React Native Web emitted this framework-level warning. The app can continue running; keep the Expo SDK and React Native Web versions aligned before upgrading." };
  }
  return { kind: "unknown", owner: "unknown", title: "Unclassified runtime message", guidance: "Review the original development log and reproduce the issue before taking action." };
}

export function getRuntimeIssueSummary(items: AppDiagnostic[]): RuntimeLogSummary | null {
  const match = items.find((item) => /premature close|pointerevents is deprecated/i.test(`${item.area} ${item.errorType}`));
  return match ? summarizeRuntimeLog(match.errorType) : null;
}

export function formatDiagnosticTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "Unknown time" : date.toLocaleString();
}

export function getDiagnosticAreas(items: AppDiagnostic[]): string[] {
  return ["all", ...Array.from(new Set(items.map((item) => item.area).filter(Boolean))).sort()];
}

export function filterDiagnostics(items: AppDiagnostic[], area: string, query = ""): AppDiagnostic[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (area === "all" && !normalizedQuery) return items;
  return items.filter((item) => {
    const matchesArea = area === "all" || item.area === area;
    const matchesQuery = !normalizedQuery || `${item.area} ${item.errorType}`.toLocaleLowerCase().includes(normalizedQuery);
    return matchesArea && matchesQuery;
  });
}

export function resolveDiagnosticArea(previousArea: string, items: AppDiagnostic[]): string {
  return getDiagnosticAreas(items).includes(previousArea) ? previousArea : "all";
}
