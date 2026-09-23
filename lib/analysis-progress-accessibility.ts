export function analysisProgressAccessibilityLabel(label: string, progress: number, step: number, total: number): string {
  const percent = Math.round(Math.max(0, Math.min(1, progress)) * 100);
  return `${label}, ${percent}% complete, step ${step} of ${total}`;
}
