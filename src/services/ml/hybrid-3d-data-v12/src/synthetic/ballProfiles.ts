/**
 * V12 module: ball properties and contact priors.
 *
 * This file is intentionally dependency-light so the data/training layer can run
 * outside React Native during dataset generation and CI evaluation.  Production
 * model weights are not embedded here; the module exposes deterministic contracts
 * that training jobs and mobile inference can consume.
 */
import { clamp, lerp, percentile, variance } from "../math";
import { SeededRandom } from "../prng";

export type ballProfilesRecord = {
  id: string;
  version: string;
  seed: number;
  score: number;
  tags: string[];
  metadata: Record<string, string | number | boolean>;
};

export const sampleBallProfile = (seed = 101): ballProfilesRecord => {
  const rng = new SeededRandom(seed);
  const raw = rng.range(0.15, 0.98);
  const score = clamp(lerp(0.35, 0.98, raw), 0, 1);
  const samples = Array.from({length: 9}, (_, i) => rng.range(-1, 1) + i * 0.001);
  const spread = variance(samples);
  const p90 = percentile(samples, 0.9);
  return {
    id: `ballProfiles-${seed}`,
    version: "v12",
    seed,
    score,
    tags: ["golf", "ai", "dataset", "mobile"],
    metadata: { purpose: "ball properties and contact priors", spread, p90, stable: score > 0.55 }
  };
};

export const validateballProfiles = (record: ballProfilesRecord): boolean => {
  return record.version === "v12" && Number.isFinite(record.score) && record.score >= 0 && record.score <= 1;
};

export const summarizeballProfiles = (records: ballProfilesRecord[]): { count:number; mean:number; min:number; max:number } => {
  if (!records.length) return {count:0, mean:0, min:0, max:0};
  const scores = records.map(r => r.score);
  const mean = scores.reduce((a,b)=>a+b,0)/scores.length;
  return {count:scores.length, mean, min:Math.min(...scores), max:Math.max(...scores)};
};

// Deterministic perturbation used by QA to verify that downstream components are
// sensitive to controlled dataset shifts without depending on a random global RNG.
export const perturbballProfiles = (record:ballProfilesRecord, seed:number): ballProfilesRecord => {
  const rng = new SeededRandom(seed);
  const delta = rng.range(-0.04, 0.04);
  return {...record, seed, score: clamp(record.score + delta, 0, 1), metadata: {...record.metadata, perturbed:true}};
};

export const ballProfilesSchema = {
  module: "synthetic/ballProfiles",
  required: ["id","version","seed","score","tags","metadata"],
  purpose: "ball properties and contact priors"
} as const;

// Test vector retained as executable documentation for consumers that want a
// tiny stable fixture without importing the full synthetic dataset generator.
export const ballProfilesFixture = sampleBallProfile(17);

export const ballProfilesHealth = () => validateballProfiles(ballProfilesFixture);

export function ballProfilesSlice1(records: ballProfilesRecord[], threshold = 0.2): ballProfilesRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function ballProfilesSlice2(records: ballProfilesRecord[], threshold = 0.4): ballProfilesRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function ballProfilesSlice3(records: ballProfilesRecord[], threshold = 0.6): ballProfilesRecord[] {
  return records.filter((record) => record.score >= threshold);
}

export function ballProfilesSlice4(records: ballProfilesRecord[], threshold = 0.8): ballProfilesRecord[] {
  return records.filter((record) => record.score >= threshold);
}
