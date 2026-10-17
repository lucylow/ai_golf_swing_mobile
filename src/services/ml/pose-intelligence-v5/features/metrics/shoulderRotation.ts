import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeShoulderRotation(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['shoulderRotation'];
  if (!Number.isFinite(value)) return null;
  return { key: 'shoulderRotation', value, unit: 'deg', confidence: ctx.metricConfidence['shoulderRotation'] ?? ctx.sequenceConfidence, source: 'derived' as any };
}
