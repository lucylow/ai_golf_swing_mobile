import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface HeadToPelvisanalysis042Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P1';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const n=frame.landmarks[0],a=frame.landmarks[23],b=frame.landmarks[24]; return dist(n,midpoint(a,b));
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

export function analyzeHeadToPelvisanalysis042(frames: PoseFrame[], h: Handedness): HeadToPelvisanalysis042Report {
  const value = windowValue(frames, h, 0.0, 0.8);
  const variability = windowVariability(frames, h, 0.0, 0.8);
  const first = windowValue(frames, h, 0.00, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P1' };
}

export function metricHeadToPelvisanalysis042(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeHeadToPelvisanalysis042(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'head_to_pelvis_042', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeHeadToPelvisanalysis042(): string {
  return 'Golf biomechanics feature: head to pelvis. Phase-aware measurement with variability and trend reporting.';
}

export const headToPelvis_analysis_042Spec = {
  id: 'headToPelvis_analysis_042',
  label: 'head to pelvis',
  phase: 'P1',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateHeadToPelvisanalysis042(report: HeadToPelvisanalysis042Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
