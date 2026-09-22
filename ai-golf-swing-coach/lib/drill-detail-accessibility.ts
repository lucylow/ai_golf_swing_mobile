import { equipmentIconFor, type DrillEquipmentIcon } from "./drill-metadata";

export function drillEquipmentAccessibilityLabel(equipment: string): string {
  const normalized = equipment.trim();
  return `Equipment: ${normalized || "No equipment listed"}`;
}

export function drillEquipmentIcon(equipment: string): DrillEquipmentIcon {
  return equipmentIconFor(equipment);
}

export function drillStepAccessibilityLabel(step: string, index: number, total: number): string {
  const safeIndex = Math.max(0, Math.min(index, Math.max(total - 1, 0)));
  const safeTotal = Math.max(total, 1);
  const normalizedStep = step.trim() || "Practice step";
  return `Step ${safeIndex + 1} of ${safeTotal}: ${normalizedStep}`;
}

export type DrillProgressSummary = { completed: number; total: number; percent: number; label: string };

export function drillProgressSummary(completedCount: number, totalCount: number): DrillProgressSummary {
  const total = Math.max(0, Math.floor(totalCount));
  const completed = Math.max(0, Math.min(Math.floor(completedCount), total));
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent, label: total === 0 ? "No practice steps" : `${completed} of ${total} steps complete` };
}

export const drillResetConfirmation = {
  title: "Reset practice steps?",
  message: "This clears the completed steps for this drill. Your drill completion record will stay unchanged.",
  confirmLabel: "Reset steps",
  cancelLabel: "Cancel",
} as const;

export function drillCompletionCelebration(completedCount: number, totalCount: number) {
  const progress = drillProgressSummary(completedCount, totalCount);
  return {
    isComplete: progress.total > 0 && progress.completed === progress.total,
    title: "Practice complete",
    message: "You finished every step in this drill. Nice work.",
  };
}
