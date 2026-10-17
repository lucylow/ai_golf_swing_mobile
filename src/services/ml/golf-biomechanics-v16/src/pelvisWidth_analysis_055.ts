import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface PelvisWidthanalysis055Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P2';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  return dist(frame.landmarks[23],frame.landmarks[24]);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzePelvisWidthanalysis055(frames: PoseFrame[], h: Handedness): PelvisWidthanalysis055Report {
  const value = windowValue(frames, h, 0.1, 0.9);
  const variability = windowVariability(frames, h, 0.1, 0.9);
  const first = windowValue(frames, h, 0.05, 0.55);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P2' };
}

export function metricPelvisWidthanalysis055(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzePelvisWidthanalysis055(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'pelvis_width_055', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describePelvisWidthanalysis055(): string {
  return 'Golf biomechanics feature: pelvis width. Phase-aware measurement with variability and trend reporting.';
}

export const pelvisWidth_analysis_055Spec = {
  id: 'pelvisWidth_analysis_055',
  label: 'pelvis width',
  phase: 'P2',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validatePelvisWidthanalysis055(report: PelvisWidthanalysis055Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
