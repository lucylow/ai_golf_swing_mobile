const DEFAULT_SEED = 73194;
const MAX_RANGE_SIZE = 10000;

export function seeded(seed: number, min = 0, max = 1): number {
  const safeSeed = Number.isFinite(seed) ? seed : DEFAULT_SEED;
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : safeMin;
  const x = Math.sin(safeSeed * 12.9898 + 78.233) * 43758.5453;
  const unit = x - Math.floor(x);
  return safeMin + unit * (safeMax - safeMin);
}

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return Number.isFinite(min) ? min : 0;
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? Math.max(safeMin, max) : safeMin;
  return Math.min(safeMax, Math.max(safeMin, value));
}

export function round(value: number, digits = 1): number {
  if (!Number.isFinite(value)) return 0;
  const safeDigits = Number.isFinite(digits) ? Math.max(0, Math.min(8, Math.floor(digits))) : 1;
  const factor = 10 ** safeDigits;
  return Math.round(value * factor) / factor;
}

export function range(count: number): number[] {
  if (!Number.isFinite(count) || count <= 0) return [];
  const safeCount = Math.min(MAX_RANGE_SIZE, Math.floor(count));
  return Array.from({ length: safeCount }, (_, index) => index);
}

export function pick<T>(seed: number, values: readonly T[]): T {
  if (!values.length) throw new Error('Cannot pick from an empty list');
  const index = Math.abs(Math.floor(seeded(seed, 0, values.length))) % values.length;
  return values[index];
}

export function isoDay(offset: number): string {
  const safeOffset = Number.isFinite(offset)
    ? Math.max(-1_000_000, Math.min(1_000_000, Math.trunc(offset)))
    : 0;
  const date = new Date(Date.UTC(2026, 8, 29, 18, 30));
  date.setUTCDate(date.getUTCDate() + safeOffset);
  return date.toISOString();
}
