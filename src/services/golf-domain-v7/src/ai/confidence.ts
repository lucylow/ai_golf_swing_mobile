import { clamp, weightedMean } from '../math/statistics';
export type ConfidenceInput = { poseConfidence: number; eventConfidence: number; metricConfidence: number; consistency: number; contextFit: number };
export function aggregateConfidence(input: ConfidenceInput): number {
  return clamp(weightedMean([input.poseConfidence, input.eventConfidence, input.metricConfidence, input.consistency, input.contextFit], [0.26, 0.18, 0.24, 0.16, 0.16]), 0, 1);
}
export function confidenceLabel(value: number): 'high' | 'moderate' | 'low' { return value >= 0.78 ? 'high' : value >= 0.55 ? 'moderate' : 'low'; }

