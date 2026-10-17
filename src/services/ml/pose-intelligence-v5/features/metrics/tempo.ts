import { PoseFrame } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { SwingFeatureContext } from './types';

export function computeTempo(ctx: SwingFeatureContext): Metric | null {
  if (ctx.frames.length === 0) return null;
  const value = ctx.metricValues['tempo'];
  if (!Number.isFinite(value)) return null;
  return { key: 'tempo', value, unit: 'ratio', confidence: ctx.metricConfidence['tempo'] ?? ctx.sequenceConfidence, source: 'temporal' as any };
}
