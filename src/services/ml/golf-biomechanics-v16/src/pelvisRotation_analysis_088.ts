import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface PelvisRotationanalysis088Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P7';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const a=frame.landmarks[23],b=frame.landmarks[24]; return Math.atan2(b.z-a.z,b.x-a.x)*180/Math.PI;
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

export function analyzePelvisRotationanalysis088(frames: PoseFrame[], h: Handedness): PelvisRotationanalysis088Report {
  const value = windowValue(frames, h, 0.1, 0.6);
  const variability = windowVariability(frames, h, 0.1, 0.6);
  const first = windowValue(frames, h, 0.05, 0.25);
  const last = windowValue(frames, h, 0.60, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P7' };
}

export function metricPelvisRotationanalysis088(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzePelvisRotationanalysis088(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'pelvis_rotation_088', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describePelvisRotationanalysis088(): string {
  return 'Golf biomechanics feature: pelvis rotation. Phase-aware measurement with variability and trend reporting.';
}

export const pelvisRotation_analysis_088Spec = {
  id: 'pelvisRotation_analysis_088',
  label: 'pelvis rotation',
  phase: 'P7',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validatePelvisRotationanalysis088(report: PelvisRotationanalysis088Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
