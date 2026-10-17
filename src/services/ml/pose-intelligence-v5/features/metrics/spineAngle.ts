import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeSpineAngle(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['spineAngle'];
  if (!Number.isFinite(value)) return null;
  return { key: 'spineAngle', value, unit: 'deg', confidence: ctx.metricConfidence['spineAngle'] ?? ctx.sequenceConfidence, source: 'derived' as any };
}
