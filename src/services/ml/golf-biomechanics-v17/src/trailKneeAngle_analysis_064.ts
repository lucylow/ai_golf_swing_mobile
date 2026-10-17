import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface TrailKneeAngleanalysis064Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P7';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const hip=h==='right'?frame.landmarks[23]:frame.landmarks[24],k=h==='right'?frame.landmarks[25]:frame.landmarks[26],a=h==='right'?frame.landmarks[27]:frame.landmarks[28]; return angleDeg([hip.x-k.x,hip.y-k.y,hip.z-k.z],[a.x-k.x,a.y-k.y,a.z-k.z]);
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

export function analyzeTrailKneeAngleanalysis064(frames: PoseFrame[], h: Handedness): TrailKneeAngleanalysis064Report {
  const value = windowValue(frames, h, 0.1, 0.6);
  const variability = windowVariability(frames, h, 0.1, 0.6);
  const first = windowValue(frames, h, 0.05, 0.25);
  const last = windowValue(frames, h, 0.60, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P7' };
}

export function metricTrailKneeAngleanalysis064(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeTrailKneeAngleanalysis064(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'trail_knee_angle_064', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeTrailKneeAngleanalysis064(): string {
  return 'Golf biomechanics feature: trail knee angle. Phase-aware measurement with variability and trend reporting.';
}

export const trailKneeAngle_analysis_064Spec = {
  id: 'trailKneeAngle_analysis_064',
  label: 'trail knee angle',
  phase: 'P7',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateTrailKneeAngleanalysis064(report: TrailKneeAngleanalysis064Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
