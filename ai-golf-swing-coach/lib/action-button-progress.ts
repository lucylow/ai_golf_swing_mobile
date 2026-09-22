export function normalizeActionProgress(progress: number | undefined): number | undefined {
  if (typeof progress !== "number" || !Number.isFinite(progress)) return undefined;
  return Math.max(0, Math.min(1, progress));
}

export function actionButtonProgressLabel(title: string, progress: number | undefined): string {
  if (progress === undefined) return title;
  return `${title}, ${Math.round(progress * 100)}% complete`;
}
