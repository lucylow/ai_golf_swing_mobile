import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeLeadElbowFlex(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['leadElbowFlex'];
  if (!Number.isFinite(value)) return null;
  return { key: 'leadElbowFlex', value, unit: 'deg', confidence: ctx.metricConfidence['leadElbowFlex'] ?? ctx.sequenceConfidence, source: 'pose' as any };
}
