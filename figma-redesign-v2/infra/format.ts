export const pct = (value: number) => `${Math.round(value)}%`;
export const signed = (value: number) => `${value >= 0 ? '+' : ''}${value}`;
export const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));
export const mmss = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
export const scoreTone = (score: number) => score >= 88 ? 'positive' : score >= 78 ? 'warning' : 'danger';
export const avg = (values: number[]) => values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
