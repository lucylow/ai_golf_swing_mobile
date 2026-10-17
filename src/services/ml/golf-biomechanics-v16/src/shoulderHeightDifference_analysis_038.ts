import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface ShoulderHeightDifferenceanalysis038Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P4';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return Math.abs(frame.landmarks[11].y-frame.landmarks[12].y);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeShoulderHeightDifferenceanalysis038(frames: PoseFrame[], h: Handedness): ShoulderHeightDifferenceanalysis038Report {
  const value = windowValue(frames, h, 0.2, 0.8);
  const variability = windowVariability(frames, h, 0.2, 0.8);
  const first = windowValue(frames, h, 0.15, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P4' };
}

export function metricShoulderHeightDifferenceanalysis038(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeShoulderHeightDifferenceanalysis038(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'shoulder_height_difference_038', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeShoulderHeightDifferenceanalysis038(): string {
  return 'Golf biomechanics feature: shoulder height difference. Phase-aware measurement with variability and trend reporting.';
}

export const shoulderHeightDifference_analysis_038Spec = {
  id: 'shoulderHeightDifference_analysis_038',
  label: 'shoulder height difference',
  phase: 'P4',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateShoulderHeightDifferenceanalysis038(report: ShoulderHeightDifferenceanalysis038Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
