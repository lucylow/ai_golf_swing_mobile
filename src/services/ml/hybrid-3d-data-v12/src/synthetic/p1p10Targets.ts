/**
 * V12 module: P1-P10 target landmarks and windows.
 *
 * This file is intentionally dependency-light so the data/training layer can run
 * outside React Native during dataset generation and CI evaluation.  Production
 * model weights are not embedded here; the module exposes deterministic contracts
 * that training jobs and mobile inference can consume.
 */
import { clamp, lerp, percentile, variance } from "../math";
import { SeededRandom } from "../prng";

export type p1p10TargetsRecord = {
  id: string;
  version: string;
  seed: number;
  score: number;
  tags: string[];
  metadata: Record<string, string | number | boolean>;
};

export const phaseTargets = (seed = 101): p1p10TargetsRecord => {
  const rng = new SeededRandom(seed);
  const raw = rng.range(0.15, 0.98);
  const score = clamp(lerp(0.35, 0.98, raw), 0, 1);
  const samples = Array.from({length: 9}, (_, i) => rng.range(-1, 1) + i * 0.001);
  const spread = variance(samples);
  const p90 = percentile(samples, 0.9);
  return {
    id: `p1p10Targets-${seed}`,
    version: "v12",
    seed,
    score,
    tags: ["golf", "ai", "dataset", "mobile"],
    metadata: { purpose: "P1-P10 target landmarks and windows", spread, p90, stable: score > 0.55 }
  };
};

export const validatep1p10Targets = (record: p1p10TargetsRecord): boolean => {
  return record.version === "v12" && Number.isFinite(record.score) && record.score >= 0 && record.score <= 1;
};

export const summarizep1p10Targets = (records: p1p10TargetsRecord[]): { count:number; mean:number; min:number; max:number } => {
  if (!records.length) return {count:0, mean:0, min:0, max:0};
  const scores = records.map(r => r.score);
  const mean = scores.reduce((a,b)=>a+b,0)/scores.length;
  return {count:scores.length, mean, min:Math.min(...scores), max:Math.max(...scores)};
};

// Deterministic perturbation used by QA to verify that downstream components are
// sensitive to controlled dataset shifts without depending on a random global RNG.
export const perturbp1p10Targets = (record:p1p10TargetsRecord, seed:number): p1p10TargetsRecord => {
  const rng = new SeededRandom(seed);
  const delta = rng.range(-0.04, 0.04);
  return {...record, seed, score: clamp(record.score + delta, 0, 1), metadata: {...record.metadata, perturbed:true}};
};

export const p1p10TargetsSchema = {
  module: "synthetic/p1p10Targets",
  required: ["id","version","seed","score","tags","metadata"],
  purpose: "P1-P10 target landmarks and windows"
} as const;

// Test vector retained as executable documentation for consumers that want a
// tiny stable fixture without importing the full synthetic dataset generator.
export const p1p10TargetsFixture = phaseTargets(17);

export const p1p10TargetsHealth = () => validatep1p10Targets(p1p10TargetsFixture);

export function p1p10TargetsSlice1(records: p1p10TargetsRecord[], threshold = 0.2): p1p10TargetsRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function p1p10TargetsSlice2(records: p1p10TargetsRecord[], threshold = 0.4): p1p10TargetsRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function p1p10TargetsSlice3(records: p1p10TargetsRecord[], threshold = 0.6): p1p10TargetsRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function p1p10TargetsSlice4(records: p1p10TargetsRecord[], threshold = 0.8): p1p10TargetsRecord[] {
  return records.filter((record) => record.score >= threshold);
}
