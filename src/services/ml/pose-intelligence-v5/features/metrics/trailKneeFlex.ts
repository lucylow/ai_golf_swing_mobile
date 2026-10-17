import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeTrailKneeFlex(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['trailKneeFlex'];
  if (!Number.isFinite(value)) return null;
  return { key: 'trailKneeFlex', value, unit: 'deg', confidence: ctx.metricConfidence['trailKneeFlex'] ?? ctx.sequenceConfidence, source: 'pose' as any };
}
