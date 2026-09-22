export type DrillMetadata = {
  id: string;
  title: string;
  description: string;
  time: string;
  equipment: string;
  heroColor: string;
  accentColor: string;
  steps: string[];
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function channel(value: number): number {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(color: string): number | null {
  if (!HEX_COLOR.test(color)) return null;
  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

export function colorContrastRatio(first: string, second: string): number | null {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  if (firstLuminance === null || secondLuminance === null) return null;
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function hasAccessibleAccent(heroColor: string, accentColor: string): boolean {
  const ratio = colorContrastRatio(heroColor, accentColor);
  return ratio !== null && ratio >= 3;
}

export function normalizeDrillMetadata(value: unknown, fallback: DrillMetadata): DrillMetadata {
  if (!value || typeof value !== "object") return fallback;
  const candidate = value as Record<string, unknown>;
  const steps = Array.isArray(candidate.steps) ? candidate.steps.filter((step): step is string => typeof step === "string" && step.trim().length > 0) : [];
  const hasRequiredFields = typeof candidate.id === "string" && typeof candidate.title === "string" && typeof candidate.description === "string" && typeof candidate.time === "string" && typeof candidate.equipment === "string" && typeof candidate.heroColor === "string" && typeof candidate.accentColor === "string" && !(!steps.length);
  if (!hasRequiredFields || !HEX_COLOR.test(candidate.heroColor as string)) return fallback;
  const accentColor = HEX_COLOR.test(candidate.accentColor as string) && hasAccessibleAccent(candidate.heroColor as string, candidate.accentColor as string) ? candidate.accentColor as string : fallback.accentColor;
  return { id: candidate.id as string, title: candidate.title as string, description: candidate.description as string, time: candidate.time as string, equipment: candidate.equipment as string, heroColor: candidate.heroColor as string, accentColor, steps };
}

export type DrillEquipmentIcon = "target" | "gearshape.fill";

export function equipmentIconFor(equipment: string): DrillEquipmentIcon {
  return equipment.trim().toLowerCase() === "no equipment" ? "target" : "gearshape.fill";
}

export function isValidDrillColor(color: string): boolean {
  return HEX_COLOR.test(color);
}
