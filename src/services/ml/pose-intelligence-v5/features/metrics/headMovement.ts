import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeHeadMovement(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['headMovement'];
  if (!Number.isFinite(value)) return null;
  return { key: 'headMovement', value, unit: 'norm', confidence: ctx.metricConfidence['headMovement'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
