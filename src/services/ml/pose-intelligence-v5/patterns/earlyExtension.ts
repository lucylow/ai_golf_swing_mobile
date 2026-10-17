import { PatternContext } from './types';
import { SwingPattern } from '../types/model';
import { PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { mean } from '../math/scalar';

function hipDepth(ctx: PatternContext, frameIndex: number): number {
  const frame = ctx.frames[frameIndex];
  if (!frame) return 0;
  const l = point3(frame, PoseLandmarkId.LeftHip);
  const r = point3(frame, PoseLandmarkId.RightHip);
  if (!l || !r) return 0;
  return (l.z + r.z) / 2;
}

export function detectEarlyExtension(ctx: PatternContext): SwingPattern | null {
  const impact = ctx.phases.find((p) => p.phase === 'impact');
  const setup = ctx.phases.find((p) => p.phase === 'setup');
  if (!impact || !setup) return null;
  const setupDepth = hipDepth(ctx, Math.floor((setup.startFrame + setup.endFrame) / 2));
  const impactDepth = hipDepth(ctx, Math.floor((impact.startFrame + impact.endFrame) / 2));
  const delta = Math.abs(impactDepth - setupDepth);
  const score = Math.max(0, Math.min(1, delta * 1.8));
  if (score < 0.35) return null;
  return {
    id: 'earlyExtension',
    label: 'Early extension tendency',
    score,
    confidence: Math.max(0.35, ctx.confidence * 0.9),
    severity: score > 0.75 ? 'high' : score > 0.55 ? 'medium' : 'low',
    evidence: [
      `Hip-depth change near impact: ${delta.toFixed(3)} normalized units`,
      `Setup-to-impact comparison uses the same body-centered coordinate representation`,
    ],
    recommendedFocus: 'Practice maintaining hip depth through the transition and recheck with three swings.',
  };
}
