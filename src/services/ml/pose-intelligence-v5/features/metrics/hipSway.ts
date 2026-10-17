import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeHipSway(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['hipSway'];
  if (!Number.isFinite(value)) return null;
  return { key: 'hipSway', value, unit: 'norm', confidence: ctx.metricConfidence['hipSway'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
