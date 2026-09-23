export function computeBackoff(attempt: number, baseMs = 450, maxMs = 8000, jitter = 0.2): number {
  const normalizedAttempt = Math.max(0, attempt);
  const exponential = Math.min(maxMs, baseMs * 2 ** normalizedAttempt);
  const randomFactor = 1 - jitter + Math.random() * jitter * 2;
  return Math.round(Math.min(maxMs, exponential * randomFactor));
}

export function isWithinRetryBudget(attempt: number, maxAttempts: number): boolean {
  return attempt < maxAttempts;
}

export async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise<void>((resolve) => setTimeout(resolve, ms));
}
