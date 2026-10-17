import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeHandSpeed(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['handSpeed'];
  if (!Number.isFinite(value)) return null;
  return { key: 'handSpeed', value, unit: 'norm/s', confidence: ctx.metricConfidence['handSpeed'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
