/**
 * V12 module: P1-P10 phase loss.
 *
 * This file is intentionally dependency-light so the data/training layer can run
 * outside React Native during dataset generation and CI evaluation.  Production
 * model weights are not embedded here; the module exposes deterministic contracts
 * that training jobs and mobile inference can consume.
 */
import { clamp, lerp, percentile, variance } from "../math";
import { SeededRandom } from "../prng";

export type phaseLossRecord = {
  id: string;
  version: string;
  seed: number;
  score: number;
  tags: string[];
  metadata: Record<string, string | number | boolean>;
};

export const phaseCrossEntropy = (seed = 101): phaseLossRecord => {
  const rng = new SeededRandom(seed);
  const raw = rng.range(0.15, 0.98);
  const score = clamp(lerp(0.35, 0.98, raw), 0, 1);
  const samples = Array.from({length: 9}, (_, i) => rng.range(-1, 1) + i * 0.001);
  const spread = variance(samples);
  const p90 = percentile(samples, 0.9);
  return {
    id: `phaseLoss-${seed}`,
    version: "v12",
    seed,
    score,
    tags: ["golf", "ai", "dataset", "mobile"],
    metadata: { purpose: "P1-P10 phase loss", spread, p90, stable: score > 0.55 }
  };
};

export const validatephaseLoss = (record: phaseLossRecord): boolean => {
  return record.version === "v12" && Number.isFinite(record.score) && record.score >= 0 && record.score <= 1;
};

export const summarizephaseLoss = (records: phaseLossRecord[]): { count:number; mean:number; min:number; max:number } => {
  if (!records.length) return {count:0, mean:0, min:0, max:0};
  const scores = records.map(r => r.score);
  const mean = scores.reduce((a,b)=>a+b,0)/scores.length;
  return {count:scores.length, mean, min:Math.min(...scores), max:Math.max(...scores)};
};

// Deterministic perturbation used by QA to verify that downstream components are
// sensitive to controlled dataset shifts without depending on a random global RNG.
export const perturbphaseLoss = (record:phaseLossRecord, seed:number): phaseLossRecord => {
  const rng = new SeededRandom(seed);
  const delta = rng.range(-0.04, 0.04);
  return {...record, seed, score: clamp(record.score + delta, 0, 1), metadata: {...record.metadata, perturbed:true}};
};

export const phaseLossSchema = {
  module: "training/phaseLoss",
  required: ["id","version","seed","score","tags","metadata"],
  purpose: "P1-P10 phase loss"
} as const;

// Test vector retained as executable documentation for consumers that want a
// tiny stable fixture without importing the full synthetic dataset generator.
export const phaseLossFixture = phaseCrossEntropy(17);

export const phaseLossHealth = () => validatephaseLoss(phaseLossFixture);

export function phaseLossSlice1(records: phaseLossRecord[], threshold = 0.2): phaseLossRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function phaseLossSlice2(records: phaseLossRecord[], threshold = 0.4): phaseLossRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function phaseLossSlice3(records: phaseLossRecord[], threshold = 0.6): phaseLossRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function phaseLossSlice4(records: phaseLossRecord[], threshold = 0.8): phaseLossRecord[] {
  return records.filter((record) => record.score >= threshold);
}
