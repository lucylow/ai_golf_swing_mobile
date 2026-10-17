import { clamp } from '../math/statistics';
export type TempoResult = { ratio: number; label: 'slow' | 'balanced' | 'fast'; confidence: number; cue: string };
export function analyzeTempo(backswingMs: number, downswingMs: number): TempoResult {
  if (backswingMs <= 0 || downswingMs <= 0) return { ratio: 0, label: 'balanced', confidence: 0, cue: 'Record more frames.' };
  const ratio = backswingMs / downswingMs;
  const label = ratio < 2.3 ? 'fast' : ratio > 3.5 ? 'slow' : 'balanced';
  const confidence = clamp(0.5 + Math.min(0.5, Math.min(backswingMs, downswingMs) / 700), 0, 1);
  const cue = label === 'fast' ? 'Create a smoother takeaway before the transition.' : label === 'slow' ? 'Avoid stretching the backswing; preserve athletic rhythm.' : 'Keep the current rhythm while improving sequence.';
  return { ratio, label, confidence, cue };
}

