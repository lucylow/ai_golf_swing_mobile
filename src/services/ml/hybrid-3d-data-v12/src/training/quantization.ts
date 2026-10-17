/**
 * V12 module: mobile quantization plan.
 *
 * This file is intentionally dependency-light so the data/training layer can run
 * outside React Native during dataset generation and CI evaluation.  Production
 * model weights are not embedded here; the module exposes deterministic contracts
 * that training jobs and mobile inference can consume.
 */
import { clamp, lerp, percentile, variance } from "../math";
import { SeededRandom } from "../prng";

export type quantizationRecord = {
  id: string;
  version: string;
  seed: number;
  score: number;
  tags: string[];
  metadata: Record<string, string | number | boolean>;
};

export const quantizationPlan = (seed = 101): quantizationRecord => {
  const rng = new SeededRandom(seed);
  const raw = rng.range(0.15, 0.98);
  const score = clamp(lerp(0.35, 0.98, raw), 0, 1);
  const samples = Array.from({length: 9}, (_, i) => rng.range(-1, 1) + i * 0.001);
  const spread = variance(samples);
  const p90 = percentile(samples, 0.9);
  return {
    id: `quantization-${seed}`,
    version: "v12",
    seed,
    score,
    tags: ["golf", "ai", "dataset", "mobile"],
    metadata: { purpose: "mobile quantization plan", spread, p90, stable: score > 0.55 }
  };
};

export const validatequantization = (record: quantizationRecord): boolean => {
  return record.version === "v12" && Number.isFinite(record.score) && record.score >= 0 && record.score <= 1;
};

export const summarizequantization = (records: quantizationRecord[]): { count:number; mean:number; min:number; max:number } => {
  if (!records.length) return {count:0, mean:0, min:0, max:0};
  const scores = records.map(r => r.score);
  const mean = scores.reduce((a,b)=>a+b,0)/scores.length;
  return {count:scores.length, mean, min:Math.min(...scores), max:Math.max(...scores)};
};

// Deterministic perturbation used by QA to verify that downstream components are
// sensitive to controlled dataset shifts without depending on a random global RNG.
export const perturbquantization = (record:quantizationRecord, seed:number): quantizationRecord => {
  const rng = new SeededRandom(seed);
  const delta = rng.range(-0.04, 0.04);
  return {...record, seed, score: clamp(record.score + delta, 0, 1), metadata: {...record.metadata, perturbed:true}};
};

export const quantizationSchema = {
  module: "training/quantization",
  required: ["id","version","seed","score","tags","metadata"],
  purpose: "mobile quantization plan"
} as const;

// Test vector retained as executable documentation for consumers that want a
// tiny stable fixture without importing the full synthetic dataset generator.
export const quantizationFixture = quantizationPlan(17);

export const quantizationHealth = () => validatequantization(quantizationFixture);

export function quantizationSlice1(records: quantizationRecord[], threshold = 0.2): quantizationRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function quantizationSlice2(records: quantizationRecord[], threshold = 0.4): quantizationRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function quantizationSlice3(records: quantizationRecord[], threshold = 0.6): quantizationRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function quantizationSlice4(records: quantizationRecord[], threshold = 0.8): quantizationRecord[] {
  return records.filter((record) => record.score >= threshold);
}
