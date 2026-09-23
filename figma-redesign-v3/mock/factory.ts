export const pad2 = (n: number) => String(n).padStart(2, '0');
export const seeded = (seed: number, min: number, max: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const r = x - Math.floor(x);
  return Math.round((min + r * (max - min)) * 100) / 100;
};
export const pick = <T>(seed: number, items: readonly T[]) => items[Math.abs(Math.floor(seeded(seed, 0, items.length - 1))) % items.length];
export const isoDaysAgo = (days: number, hour = 18, minute = 10) => {
  const d = new Date(Date.UTC(2026, 8, 23, hour, minute));
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
};
export const dateLabel = (daysAgo: number) => {
  const d = new Date(isoDaysAgo(daysAgo));
  return d.toLocaleDateString('en-CA', { month: 'short', day: '2-digit', timeZone: 'UTC' });
};
export const timeLabel = (seed: number) => `${pad2(7 + (seed % 11))}:${pad2((seed * 7) % 60)}`;
export const chooseTone = (score: number): 'positive' | 'warning' | 'danger' | 'info' | 'neutral' => score >= 88 ? 'positive' : score >= 76 ? 'warning' : score >= 64 ? 'info' : 'danger';
export const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function range(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

export function jitter(base: number, index: number, spread: number) {
  return Math.round((base + seeded(index + 1, -spread, spread)) * 10) / 10;
}

export function sequence(base: number, count: number, trend: number, spread: number) {
  return range(count).map((i) => Math.round((base + i * trend + seeded(i + 33, -spread, spread)) * 10) / 10);
}
