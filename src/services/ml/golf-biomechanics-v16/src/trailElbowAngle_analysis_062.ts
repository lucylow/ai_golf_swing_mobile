import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface TrailElbowAngleanalysis062Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P4';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const s=h==='right'?frame.landmarks[11]:frame.landmarks[12],e=h==='right'?frame.landmarks[13]:frame.landmarks[14],w=h==='right'?frame.landmarks[15]:frame.landmarks[16]; return angleDeg([s.x-e.x,s.y-e.y,s.z-e.z],[w.x-e.x,w.y-e.y,w.z-e.z]);
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

export function analyzeTrailElbowAngleanalysis062(frames: PoseFrame[], h: Handedness): TrailElbowAngleanalysis062Report {
  const value = windowValue(frames, h, 0.2, 0.8);
  const variability = windowVariability(frames, h, 0.2, 0.8);
  const first = windowValue(frames, h, 0.15, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P4' };
}

export function metricTrailElbowAngleanalysis062(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeTrailElbowAngleanalysis062(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'trail_elbow_angle_062', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeTrailElbowAngleanalysis062(): string {
  return 'Golf biomechanics feature: trail elbow angle. Phase-aware measurement with variability and trend reporting.';
}

export const trailElbowAngle_analysis_062Spec = {
  id: 'trailElbowAngle_analysis_062',
  label: 'trail elbow angle',
  phase: 'P4',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateTrailElbowAngleanalysis062(report: TrailElbowAngleanalysis062Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
