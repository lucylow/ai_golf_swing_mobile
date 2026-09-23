export type CaptureFacing = "back" | "front";
export const captureDurations = [8, 12, 20] as const;
export type CaptureDuration = (typeof captureDurations)[number];
export type CapturePreferences = { club: string; facing: CaptureFacing; slowMotion: boolean; duration: CaptureDuration };
export const defaultCapturePreferences: CapturePreferences = { club: "7 iron", facing: "back", slowMotion: false, duration: 12 };
export type CapturePreferenceKey = keyof CapturePreferences;

export function normalizeCapturePreferences(value: unknown, fallback: CapturePreferences): CapturePreferences {
  if (!value || typeof value !== "object") return fallback;
  const saved = value as Partial<CapturePreferences>;
  return {
    club: typeof saved.club === "string" && saved.club.trim().length > 0 ? saved.club : fallback.club,
    facing: saved.facing === "front" || saved.facing === "back" ? saved.facing : fallback.facing,
    slowMotion: typeof saved.slowMotion === "boolean" ? saved.slowMotion : fallback.slowMotion,
    duration: saved.duration === 8 || saved.duration === 12 || saved.duration === 20 ? saved.duration : fallback.duration,
  };
}

export function clearCapturePreference(input: CapturePreferences, key: CapturePreferenceKey): CapturePreferences {
  return { ...input, [key]: defaultCapturePreferences[key] };
}

export function formatCapturePreference(key: CapturePreferenceKey, value: CapturePreferences[CapturePreferenceKey]): string {
  if (key === "club") return `Club: ${String(value)}`;
  if (key === "facing") return `Camera: ${value === "front" ? "Front" : "Back"}`;
  if (key === "slowMotion") return "Slow-mo";
  return `Length: ${String(value)}s`;
}
