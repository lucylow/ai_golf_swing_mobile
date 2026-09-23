export function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function formatScoreAccessibilityLabel(score: number): string {
  return `Swing score, ${clampScore(score)} out of 100`;
}

export function scoreAccessibilityValue(score: number) {
  return { min: 0, max: 100, now: clampScore(score) };
}
