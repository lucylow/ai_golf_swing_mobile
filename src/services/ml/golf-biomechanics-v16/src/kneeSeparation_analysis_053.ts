import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface KneeSeparationanalysis053Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P10';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return dist(frame.landmarks[25],frame.landmarks[26]);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeKneeSeparationanalysis053(frames: PoseFrame[], h: Handedness): KneeSeparationanalysis053Report {
  const value = windowValue(frames, h, 0.2, 0.7);
  const variability = windowVariability(frames, h, 0.2, 0.7);
  const first = windowValue(frames, h, 0.15, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P10' };
}

export function metricKneeSeparationanalysis053(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeKneeSeparationanalysis053(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'knee_separation_053', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeKneeSeparationanalysis053(): string {
  return 'Golf biomechanics feature: knee separation. Phase-aware measurement with variability and trend reporting.';
}

export const kneeSeparation_analysis_053Spec = {
  id: 'kneeSeparation_analysis_053',
  label: 'knee separation',
  phase: 'P10',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateKneeSeparationanalysis053(report: KneeSeparationanalysis053Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
