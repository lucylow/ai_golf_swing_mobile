export function clamp(value: number, low: number, high: number): number {
  return Math.max(low, Math.min(high, value));
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function weightedMean(values: number[], weights: number[]): number {
  if (!values.length || values.length !== weights.length) return 0;
  const totalWeight = weights.reduce((sum, weight) => sum + Math.max(0, weight), 0);
  if (!totalWeight) return mean(values);
  return values.reduce((sum, value, index) => sum + value * Math.max(0, weights[index]), 0) / totalWeight;
}

export function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return mean(values.map((value) => (value - m) ** 2));
}

export function standardDeviation(values: number[]): number {
  return Math.sqrt(variance(values));
}

export function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function quantile(values: number[], q: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const position = clamp01(q) * (sorted.length - 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  const ratio = position - lower;
  return sorted[lower] + (sorted[upper] - sorted[lower]) * ratio;
}

export function percentileRank(value: number, reference: number[]): number {
  if (!reference.length) return 50;
  const below = reference.filter((candidate) => candidate <= value).length;
  return (below / reference.length) * 100;
}

export function zScore(value: number, values: number[]): number {
  const sd = standardDeviation(values);
  if (!sd) return 0;
  return (value - mean(values)) / sd;
}

export function linearInterpolate(x: number, x0: number, x1: number, y0: number, y1: number): number {
  if (x1 === x0) return y0;
  const t = (x - x0) / (x1 - x0);
  return y0 + (y1 - y0) * t;
}

export function movingAverage(values: number[], windowSize: number): number[] {
  if (!values.length) return [];
  const width = Math.max(1, Math.floor(windowSize));
  return values.map((_, index) => {
    const start = Math.max(0, index - width + 1);
    return mean(values.slice(start, index + 1));
  });
}

export function robustRange(values: number[]): number {
  return quantile(values, 0.9) - quantile(values, 0.1);
}

