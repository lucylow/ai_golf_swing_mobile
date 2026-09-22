import { drills } from "./golf-data";

export const drillLibraryRoute = "/(tabs)/library" as const;
export const drillFallbackMessage = "That drill link was unavailable, so we opened the default practice drill.";

export function isKnownDrillId(drillId: string | undefined): boolean {
  return Boolean(drillId && drills.some((drill) => drill.id === drillId));
}

export function resolveDrillId(drillId: string | undefined): string {
  return isKnownDrillId(drillId) ? drillId! : drills[0]?.id ?? "step-through";
}

export function recommendedDrillRoute(drillId = "step-through") {
  return `/drill-detail?drillId=${encodeURIComponent(drillId)}` as const;
}

