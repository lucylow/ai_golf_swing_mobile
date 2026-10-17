import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface ShoulderRotationanalysis059Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P10';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const a=frame.landmarks[11],b=frame.landmarks[12]; return Math.atan2(b.z-a.z,b.x-a.x)*180/Math.PI;
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeShoulderRotationanalysis059(frames: PoseFrame[], h: Handedness): ShoulderRotationanalysis059Report {
  const value = windowValue(frames, h, 0.2, 0.9);
  const variability = windowVariability(frames, h, 0.2, 0.9);
  const first = windowValue(frames, h, 0.15, 0.55);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P10' };
}

export function metricShoulderRotationanalysis059(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeShoulderRotationanalysis059(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'shoulder_rotation_059', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeShoulderRotationanalysis059(): string {
  return 'Golf biomechanics feature: shoulder rotation. Phase-aware measurement with variability and trend reporting.';
}

export const shoulderRotation_analysis_059Spec = {
  id: 'shoulderRotation_analysis_059',
  label: 'shoulder rotation',
  phase: 'P10',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateShoulderRotationanalysis059(report: ShoulderRotationanalysis059Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
