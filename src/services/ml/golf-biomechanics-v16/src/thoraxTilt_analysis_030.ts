import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface ThoraxTiltanalysis030Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P1';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const a=frame.landmarks[11],b=frame.landmarks[12]; return Math.atan2(Math.abs(a.y-b.y),Math.abs(a.x-b.x)+1e-6)*180/Math.PI;
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeThoraxTiltanalysis030(frames: PoseFrame[], h: Handedness): ThoraxTiltanalysis030Report {
  const value = windowValue(frames, h, 0.0, 0.8);
  const variability = windowVariability(frames, h, 0.0, 0.8);
  const first = windowValue(frames, h, 0.00, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P1' };
}

export function metricThoraxTiltanalysis030(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeThoraxTiltanalysis030(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'thorax_tilt_030', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeThoraxTiltanalysis030(): string {
  return 'Golf biomechanics feature: thorax tilt. Phase-aware measurement with variability and trend reporting.';
}

export const thoraxTilt_analysis_030Spec = {
  id: 'thoraxTilt_analysis_030',
  label: 'thorax tilt',
  phase: 'P1',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateThoraxTiltanalysis030(report: ThoraxTiltanalysis030Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
