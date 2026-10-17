import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeHipRotation(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['hipRotation'];
  if (!Number.isFinite(value)) return null;
  return { key: 'hipRotation', value, unit: 'deg', confidence: ctx.metricConfidence['hipRotation'] ?? ctx.sequenceConfidence, source: 'derived' as any };
}
