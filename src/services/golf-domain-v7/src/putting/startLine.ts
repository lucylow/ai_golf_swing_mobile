import { clamp } from '../math/statistics';
export type StartLineResult = { faceErrorDeg: number; startErrorPct: number; cue: string };
export function analyzeStartLine(faceAngleDeg: number, puttLengthFt: number, breakInches: number): StartLineResult {
  const targetFace = breakInches === 0 ? 0 : clamp(breakInches / Math.max(1, puttLengthFt * 3), -2.5, 2.5);
  const faceErrorDeg = faceAngleDeg - targetFace;
  const startErrorPct = clamp(Math.abs(faceErrorDeg) / 2.5, 0, 1);
  const cue = Math.abs(faceErrorDeg) < 0.25 ? 'Start line is well matched to the read.' : faceErrorDeg > 0 ? 'Face is starting too far right of the intended start line.' : 'Face is starting too far left of the intended start line.';
  return { faceErrorDeg, startErrorPct, cue };
}

