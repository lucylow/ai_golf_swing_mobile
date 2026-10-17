import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeHandHeight(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['handHeight'];
  if (!Number.isFinite(value)) return null;
  return { key: 'handHeight', value, unit: 'norm', confidence: ctx.metricConfidence['handHeight'] ?? ctx.sequenceConfidence, source: 'pose' as any };
}
