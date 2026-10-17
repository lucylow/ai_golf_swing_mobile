import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface LeadHipDepthanalysis044Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P4';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?24:23; return frame.landmarks[i].z;
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.6): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.2, end = 0.6): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeLeadHipDepthanalysis044(frames: PoseFrame[], h: Handedness): LeadHipDepthanalysis044Report {
  const value = windowValue(frames, h, 0.2, 0.6);
  const variability = windowVariability(frames, h, 0.2, 0.6);
  const first = windowValue(frames, h, 0.15, 0.25);
  const last = windowValue(frames, h, 0.60, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P4' };
}

export function metricLeadHipDepthanalysis044(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeLeadHipDepthanalysis044(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'lead_hip_depth_044', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeLeadHipDepthanalysis044(): string {
  return 'Golf biomechanics feature: lead hip depth. Phase-aware measurement with variability and trend reporting.';
}

export const leadHipDepth_analysis_044Spec = {
  id: 'leadHipDepth_analysis_044',
  label: 'lead hip depth',
  phase: 'P4',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateLeadHipDepthanalysis044(report: LeadHipDepthanalysis044Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
