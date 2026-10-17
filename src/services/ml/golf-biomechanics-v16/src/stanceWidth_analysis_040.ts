import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface StanceWidthanalysis040Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P7';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return dist(frame.landmarks[31],frame.landmarks[32]);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.6): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.6): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeStanceWidthanalysis040(frames: PoseFrame[], h: Handedness): StanceWidthanalysis040Report {
  const value = windowValue(frames, h, 0.1, 0.6);
  const variability = windowVariability(frames, h, 0.1, 0.6);
  const first = windowValue(frames, h, 0.05, 0.25);
  const last = windowValue(frames, h, 0.60, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P7' };
}

export function metricStanceWidthanalysis040(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeStanceWidthanalysis040(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'stance_width_040', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeStanceWidthanalysis040(): string {
  return 'Golf biomechanics feature: stance width. Phase-aware measurement with variability and trend reporting.';
}

export const stanceWidth_analysis_040Spec = {
  id: 'stanceWidth_analysis_040',
  label: 'stance width',
  phase: 'P7',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateStanceWidthanalysis040(report: StanceWidthanalysis040Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
