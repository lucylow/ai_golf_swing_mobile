const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export type LastPracticedByDrill = Record<string, string>;

export function normalizeLastPracticed(value: unknown): LastPracticedByDrill {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const normalized: LastPracticedByDrill = {};
  for (const [drillId, timestamp] of Object.entries(value)) {
    if (typeof drillId !== "string" || drillId.trim().length === 0 || typeof timestamp !== "string") continue;
    const parsed = Date.parse(timestamp);
    if (Number.isFinite(parsed)) normalized[drillId] = new Date(parsed).toISOString();
  }
  return normalized;
}

export function formatLastPracticedLabel(value: unknown, nowMs = Date.now()): string {
  if (typeof value !== "string") return "Not practiced yet";
  const timestampMs = Date.parse(value);
  if (!Number.isFinite(timestampMs) || timestampMs > nowMs) return "Not practiced yet";
  const elapsed = nowMs - timestampMs;
  if (elapsed < MINUTE_MS) return "Practiced just now";
  if (elapsed < HOUR_MS) return `Practiced ${Math.floor(elapsed / MINUTE_MS)} min ago`;
  if (elapsed < DAY_MS) return `Practiced ${Math.floor(elapsed / HOUR_MS)} hr ago`;
  if (elapsed < 2 * DAY_MS) return "Practiced yesterday";
  return `Last practiced ${new Date(timestampMs).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export function markDrillPracticed(current: LastPracticedByDrill, drillId: string, timestamp = new Date().toISOString()): LastPracticedByDrill {
  if (!drillId.trim()) return current;
  const parsed = Date.parse(timestamp);
  if (!Number.isFinite(parsed)) return current;
  return { ...current, [drillId]: new Date(parsed).toISOString() };
}
