import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface LeadElbowAngleanalysis089Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P10';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const s=h==='right'?frame.landmarks[12]:frame.landmarks[11],e=h==='right'?frame.landmarks[14]:frame.landmarks[13],w=h==='right'?frame.landmarks[16]:frame.landmarks[15]; return angleDeg([s.x-e.x,s.y-e.y,s.z-e.z],[w.x-e.x,w.y-e.y,w.z-e.z]);
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

export function analyzeLeadElbowAngleanalysis089(frames: PoseFrame[], h: Handedness): LeadElbowAngleanalysis089Report {
  const value = windowValue(frames, h, 0.2, 0.7);
  const variability = windowVariability(frames, h, 0.2, 0.7);
  const first = windowValue(frames, h, 0.15, 0.35);
  const last = windowValue(frames, h, 0.70, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P10' };
}

export function metricLeadElbowAngleanalysis089(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeLeadElbowAngleanalysis089(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'lead_elbow_angle_089', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeLeadElbowAngleanalysis089(): string {
  return 'Golf biomechanics feature: lead elbow angle. Phase-aware measurement with variability and trend reporting.';
}

export const leadElbowAngle_analysis_089Spec = {
  id: 'leadElbowAngle_analysis_089',
  label: 'lead elbow angle',
  phase: 'P10',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateLeadElbowAngleanalysis089(report: LeadElbowAngleanalysis089Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
