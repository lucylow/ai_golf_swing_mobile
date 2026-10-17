import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface WristHeightTrailanalysis077Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P10';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?15:16; return frame.landmarks[i].y;
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.7): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeWristHeightTrailanalysis077(frames: PoseFrame[], h: Handedness): WristHeightTrailanalysis077Report {
  const value = windowValue(frames, h, 0.2, 0.7);
  const variability = windowVariability(frames, h, 0.2, 0.7);
  const first = windowValue(frames, h, 0.15, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P10' };
}

export function metricWristHeightTrailanalysis077(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeWristHeightTrailanalysis077(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'trail_wrist_height_077', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeWristHeightTrailanalysis077(): string {
  return 'Golf biomechanics feature: trail wrist height. Phase-aware measurement with variability and trend reporting.';
}

export const wristHeightTrail_analysis_077Spec = {
  id: 'wristHeightTrail_analysis_077',
  label: 'trail wrist height',
  phase: 'P10',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateWristHeightTrailanalysis077(report: WristHeightTrailanalysis077Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
