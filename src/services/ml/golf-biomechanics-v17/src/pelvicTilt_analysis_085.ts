import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface PelvicTiltanalysis085Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P2';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const a=frame.landmarks[23],b=frame.landmarks[24]; return Math.atan2(Math.abs(a.y-b.y),Math.abs(a.x-b.x)+1e-6)*180/Math.PI;
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzePelvicTiltanalysis085(frames: PoseFrame[], h: Handedness): PelvicTiltanalysis085Report {
  const value = windowValue(frames, h, 0.1, 0.7);
  const variability = windowVariability(frames, h, 0.1, 0.7);
  const first = windowValue(frames, h, 0.05, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P2' };
}

export function metricPelvicTiltanalysis085(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzePelvicTiltanalysis085(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'pelvic_tilt_085', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describePelvicTiltanalysis085(): string {
  return 'Golf biomechanics feature: pelvic tilt. Phase-aware measurement with variability and trend reporting.';
}

export const pelvicTilt_analysis_085Spec = {
  id: 'pelvicTilt_analysis_085',
  label: 'pelvic tilt',
  phase: 'P2',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validatePelvicTiltanalysis085(report: PelvicTiltanalysis085Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
