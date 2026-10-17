import { clamp } from '../math/statistics';
export type BunkerPlan = { entryBehindBallIn: number; targetFaceOpenDeg: number; launchDeg: number; confidence: number; cue: string };
export function bunkerPlan(lipHeightIn: number, targetDistanceYards: number, sandDepthIn: number): BunkerPlan {
  const entry = clamp(1.5 + sandDepthIn * 0.25 + lipHeightIn * 0.15, 1, 4.5);
  const face = clamp(14 + targetDistanceYards * 0.04, 12, 24);
  const launch = clamp(35 + lipHeightIn * 2, 28, 55);
  const confidence = clamp(0.75 - Math.max(0, 0.3 - sandDepthIn * 0.05), 0.45, 0.9);
  const cue = lipHeightIn > 6 ? 'Add launch height and commit to carry the lip.' : 'Enter the sand consistently behind the ball.';
  return { entryBehindBallIn: entry, targetFaceOpenDeg: face, launchDeg: launch, confidence, cue };
}

