import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeArmSpeed(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['armSpeed'];
  if (!Number.isFinite(value)) return null;
  return { key: 'armSpeed', value, unit: 'norm/s', confidence: ctx.metricConfidence['armSpeed'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
