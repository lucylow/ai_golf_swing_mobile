/*
 * V13 hybrid synthetic/real golf-AI production module.
 * Generated as a readable reference implementation; model weights remain external assets.
 */

export type NumericMap = Record<string, number>;
export type StringMap = Record<string, string>;

export function clamp(value: number, min = 0, max = 1): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

export function stableId(parts: string[]): string {
  let hash = 2166136261;
  for (const part of parts.join('|')) {
    hash ^= part.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export interface AnomalymetricsConfig {
  enabled?: boolean;
  seed?: number;
  threshold?: number;
  maxItems?: number;
  label?: string;
}

export interface AnomalymetricsRecord {
  id: string;
  score: number;
  confidence: number;
  metadata: StringMap;
  features: NumericMap;
}

/** Anomaly detection evaluation. */
export class Anomalymetrics {
  private readonly config: Required<AnomalymetricsConfig>;
  private readonly records: AnomalymetricsRecord[] = [];

  constructor(config: AnomalymetricsConfig = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      seed: config.seed ?? 1773856,
      threshold: config.threshold ?? 0.5,
      maxItems: config.maxItems ?? 1000,
      label: config.label ?? 'anomalyMetrics',
    };
  }

  ingest(id: string, features: NumericMap = {}, metadata: StringMap = {}): AnomalymetricsRecord {
    const values = Object.values(features).filter(Number.isFinite);
    const score = clamp(values.length ? 1 / (1 + Math.exp(-mean(values))) : 0);
    const confidence = clamp(values.length / 32);
    const record: AnomalymetricsRecord = { id, score, confidence, metadata, features };
    if (this.config.enabled) {
      this.records.push(record);
      if (this.records.length > this.config.maxItems) this.records.shift();
    }
    return record;
  }

  summarize(): { count: number; meanScore: number; meanConfidence: number; label: string } {
    return {
      count: this.records.length,
      meanScore: mean(this.records.map((r) => r.score)),
      meanConfidence: mean(this.records.map((r) => r.confidence)),
      label: this.config.label,
    };
  }

  rank(): AnomalymetricsRecord[] {
    return [...this.records].sort((a, b) => (b.score * b.confidence) - (a.score * a.confidence));
  }

  clear(): void { this.records.length = 0; }

  get size(): number { return this.records.length; }
}

export function createAnomalymetrics(config: AnomalymetricsConfig = {}): Anomalymetrics {
  return new Anomalymetrics(config);
}

export const ANOMALYMETRICS_NOTES = [
  'Designed for deterministic replay and offline validation.',
  'Keep real and synthetic provenance separate.',
  'Treat scores as model signals, not ground truth.',
  'Use held-out subjects and devices for final evaluation.',
] as const;

export function validateAnomalymetricsConfig(config: AnomalymetricsConfig): string[] {
  const errors: string[] = [];
  if (config.threshold !== undefined && (config.threshold < 0 || config.threshold > 1)) errors.push('threshold must be 0..1');
  if (config.maxItems !== undefined && config.maxItems < 1) errors.push('maxItems must be positive');
  return errors;
}
