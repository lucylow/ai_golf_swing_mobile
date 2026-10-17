import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeTrailElbowFlex(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['trailElbowFlex'];
  if (!Number.isFinite(value)) return null;
  return { key: 'trailElbowFlex', value, unit: 'deg', confidence: ctx.metricConfidence['trailElbowFlex'] ?? ctx.sequenceConfidence, source: 'pose' as any };
}
