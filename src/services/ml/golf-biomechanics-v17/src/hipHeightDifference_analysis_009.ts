import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface HipHeightDifferenceanalysis009Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P5';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return Math.abs(frame.landmarks[23].y-frame.landmarks[24].y);
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

export function analyzeHipHeightDifferenceanalysis009(frames: PoseFrame[], h: Handedness): HipHeightDifferenceanalysis009Report {
  const value = windowValue(frames, h, 0.0, 0.7);
  const variability = windowVariability(frames, h, 0.0, 0.7);
  const first = windowValue(frames, h, 0.00, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P5' };
}

export function metricHipHeightDifferenceanalysis009(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeHipHeightDifferenceanalysis009(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'hip_height_difference_009', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeHipHeightDifferenceanalysis009(): string {
  return 'Golf biomechanics feature: hip height difference. Phase-aware measurement with variability and trend reporting.';
}

export const hipHeightDifference_analysis_009Spec = {
  id: 'hipHeightDifference_analysis_009',
  label: 'hip height difference',
  phase: 'P5',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateHipHeightDifferenceanalysis009(report: HipHeightDifferenceanalysis009Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
