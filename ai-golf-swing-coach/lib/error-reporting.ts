import { describeError } from "./safe-diagnostics";

export type AppDiagnostic = {
  area: string;
  errorType: string;
  timestamp: string;
};

const MAX_DIAGNOSTICS = 20;
const MAX_AREA_LENGTH = 80;
let diagnostics: AppDiagnostic[] = [];

function sanitizeArea(area: string) {
  return area.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_AREA_LENGTH) || "unknown";
}

export function reportAppError(area: string, error: unknown): AppDiagnostic {
  const diagnostic: AppDiagnostic = {
    area: sanitizeArea(area),
    errorType: describeError(error),
    timestamp: new Date().toISOString(),
  };
  diagnostics = [...diagnostics, diagnostic].slice(-MAX_DIAGNOSTICS);
  return diagnostic;
}

export function getRecentDiagnostics(): AppDiagnostic[] {
  return diagnostics.map((diagnostic) => ({ ...diagnostic }));
}

export function clearRecentDiagnostics(): void {
  diagnostics = [];
}
