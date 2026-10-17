import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface TrailAnkleStabilityanalysis075Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P5';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?27:28; return 1/(1+Math.abs(frame.landmarks[i].x));
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeTrailAnkleStabilityanalysis075(frames: PoseFrame[], h: Handedness): TrailAnkleStabilityanalysis075Report {
  const value = windowValue(frames, h, 0.0, 0.9);
  const variability = windowVariability(frames, h, 0.0, 0.9);
  const first = windowValue(frames, h, 0.00, 0.55);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P5' };
}

export function metricTrailAnkleStabilityanalysis075(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeTrailAnkleStabilityanalysis075(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'trail_ankle_stability_075', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeTrailAnkleStabilityanalysis075(): string {
  return 'Golf biomechanics feature: trail ankle stability. Phase-aware measurement with variability and trend reporting.';
}

export const trailAnkleStability_analysis_075Spec = {
  id: 'trailAnkleStability_analysis_075',
  label: 'trail ankle stability',
  phase: 'P5',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateTrailAnkleStabilityanalysis075(report: TrailAnkleStabilityanalysis075Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
