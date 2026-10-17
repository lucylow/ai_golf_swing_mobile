import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeShoulderSway(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['shoulderSway'];
  if (!Number.isFinite(value)) return null;
  return { key: 'shoulderSway', value, unit: 'norm', confidence: ctx.metricConfidence['shoulderSway'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
