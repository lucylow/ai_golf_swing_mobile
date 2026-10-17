import { PoseFrame, Handedness, BioMetric } from './types';
import { dist, midpoint } from './vector3';
import { angleDeg, mean, std, clamp } from './math';

export interface LeadAnkleStabilityanalysis046Report {
  value: number;
  variability: number;
  trend: number;
  confidence: number;
  phase: 'P7';
}

function valueAt(frame: PoseFrame, h: Handedness): number {
  const i=h==='right'?28:27; return 1/(1+Math.abs(frame.landmarks[i].x));
}

function windowValue(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length ? mean(values) : 0;
}

function windowVariability(frames: PoseFrame[], h: Handedness, start = 0.1, end = 0.8): number {
  const lo = Math.max(0, Math.floor(frames.length * start));
  const hi = Math.max(lo + 1, Math.min(frames.length, Math.ceil(frames.length * end)));
  const values = frames.slice(lo, hi).map(f => valueAt(f, h)).filter(Number.isFinite);
  return values.length > 1 ? std(values) : 0;
}

export function analyzeLeadAnkleStabilityanalysis046(frames: PoseFrame[], h: Handedness): LeadAnkleStabilityanalysis046Report {
  const value = windowValue(frames, h, 0.1, 0.8);
  const variability = windowVariability(frames, h, 0.1, 0.8);
  const first = windowValue(frames, h, 0.05, 0.45);
  const last = windowValue(frames, h, 0.75, 1);
  const trend = last - first;
  const confidence = clamp(1 - variability * 0.6);
  return { value, variability, trend, confidence, phase: 'P7' };
}

export function metricLeadAnkleStabilityanalysis046(frames: PoseFrame[], h: Handedness, reliability: number): BioMetric {
  const r = analyzeLeadAnkleStabilityanalysis046(frames, h);
  const confidence = reliability * r.confidence;
  return { name: 'lead_ankle_stability_046', value: r.value, unit: 'normalized', evidence: { confidence, quality: confidence > 0.85 ? 'excellent' : confidence > 0.70 ? 'good' : confidence > 0.45 ? 'degraded' : 'insufficient', sources: ['pose', 'golf biomechanics'], reasons: [`phase=${r.phase} variability=${r.variability.toFixed(3)}`] } };
}

export function describeLeadAnkleStabilityanalysis046(): string {
  return 'Golf biomechanics feature: lead ankle stability. Phase-aware measurement with variability and trend reporting.';
}

export const leadAnkleStability_analysis_046Spec = {
  id: 'leadAnkleStability_analysis_046',
  label: 'lead ankle stability',
  phase: 'P7',
  unit: 'normalized',
  confidenceAware: true,
  personalBaselineCompatible: true,
};

export function validateLeadAnkleStabilityanalysis046(report: LeadAnkleStabilityanalysis046Report): boolean {
  return Number.isFinite(report.value) && Number.isFinite(report.variability) && Number.isFinite(report.trend) && report.confidence >= 0 && report.confidence <= 1;
}
