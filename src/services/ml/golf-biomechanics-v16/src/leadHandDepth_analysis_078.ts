import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface LeadHandDepthanalysis078Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P1';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?16:15; return frame.landmarks[i].z;
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

export function analyzeLeadHandDepthanalysis078(frames: PoseFrame[], h: Handedness): LeadHandDepthanalysis078Report {
  const value = windowValue(frames, h, 0.0, 0.8);
  const variability = windowVariability(frames, h, 0.0, 0.8);
  const first = windowValue(frames, h, 0.00, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P1' };
}

export function metricLeadHandDepthanalysis078(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeLeadHandDepthanalysis078(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'lead_hand_depth_078', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeLeadHandDepthanalysis078(): string {
  return 'Golf biomechanics feature: lead hand depth. Phase-aware measurement with variability and trend reporting.';
}

export const leadHandDepth_analysis_078Spec = {
  id: 'leadHandDepth_analysis_078',
  label: 'lead hand depth',
  phase: 'P1',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateLeadHandDepthanalysis078(report: LeadHandDepthanalysis078Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
