import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeLeadKneeFlex(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['leadKneeFlex'];
  if (!Number.isFinite(value)) return null;
  return { key: 'leadKneeFlex', value, unit: 'deg', confidence: ctx.metricConfidence['leadKneeFlex'] ?? ctx.sequenceConfidence, source: 'pose' as any };
}
