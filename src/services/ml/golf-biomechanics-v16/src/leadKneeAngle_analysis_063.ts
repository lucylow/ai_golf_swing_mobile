import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface LeadKneeAngleanalysis063Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P5';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const hip=h==='right'?frame.landmarks[24]:frame.landmarks[23],k=h==='right'?frame.landmarks[26]:frame.landmarks[25],a=h==='right'?frame.landmarks[28]:frame.landmarks[27]; return angleDeg([hip.x-k.x,hip.y-k.y,hip.z-k.z],[a.x-k.x,a.y-k.y,a.z-k.z]);
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.0, end = 0.9): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeLeadKneeAngleanalysis063(frames: PoseFrame[], h: Handedness): LeadKneeAngleanalysis063Report {
  const value = windowValue(frames, h, 0.0, 0.9);
  const variability = windowVariability(frames, h, 0.0, 0.9);
  const first = windowValue(frames, h, 0.00, 0.55);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P5' };
}

export function metricLeadKneeAngleanalysis063(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeLeadKneeAngleanalysis063(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'lead_knee_angle_063', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeLeadKneeAngleanalysis063(): string {
  return 'Golf biomechanics feature: lead knee angle. Phase-aware measurement with variability and trend reporting.';
}

export const leadKneeAngle_analysis_063Spec = {
  id: 'leadKneeAngle_analysis_063',
  label: 'lead knee angle',
  phase: 'P5',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateLeadKneeAngleanalysis063(report: LeadKneeAngleanalysis063Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
