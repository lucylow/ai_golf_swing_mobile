import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface HandSeparationanalysis069Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P5';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return dist(frame.landmarks[15],frame.landmarks[16]);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeHandSeparationanalysis069(frames: PoseFrame[], h: Handedness): HandSeparationanalysis069Report {
  const value = windowValue(frames, h, 0.0, 0.7);
  const variability = windowVariability(frames, h, 0.0, 0.7);
  const first = windowValue(frames, h, 0.00, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P5' };
}

export function metricHandSeparationanalysis069(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeHandSeparationanalysis069(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'hand_separation_069', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeHandSeparationanalysis069(): string {
  return 'Golf biomechanics feature: hand separation. Phase-aware measurement with variability and trend reporting.';
}

export const handSeparation_analysis_069Spec = {
  id: 'handSeparation_analysis_069',
  label: 'hand separation',
  phase: 'P5',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateHandSeparationanalysis069(report: HandSeparationanalysis069Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
