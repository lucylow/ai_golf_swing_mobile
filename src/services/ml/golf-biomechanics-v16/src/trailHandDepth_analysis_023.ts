import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface TrailHandDepthanalysis023Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P10';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?15:16; return frame.landmarks[i].z;
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

export function analyzeTrailHandDepthanalysis023(frames: PoseFrame[], h: Handedness): TrailHandDepthanalysis023Report {
  const value = windowValue(frames, h, 0.2, 0.9);
  const variability = windowVariability(frames, h, 0.2, 0.9);
  const first = windowValue(frames, h, 0.15, 0.55);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P10' };
}

export function metricTrailHandDepthanalysis023(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeTrailHandDepthanalysis023(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'trail_hand_depth_023', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeTrailHandDepthanalysis023(): string {
  return 'Golf biomechanics feature: trail hand depth. Phase-aware measurement with variability and trend reporting.';
}

export const trailHandDepth_analysis_023Spec = {
  id: 'trailHandDepth_analysis_023',
  label: 'trail hand depth',
  phase: 'P10',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateTrailHandDepthanalysis023(report: TrailHandDepthanalysis023Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
