import { clamp } from '../math/statistics';
export type BreakModelInput = { puttLengthFt: number; slopePct: number; stimp: number; grainDeg?: number };
export type BreakModelResult = { aimInches: number; highSide: 'left' | 'right' | 'center'; confidence: number; notes: string[] };
export function estimateBreak(input: BreakModelInput): BreakModelResult {
  const sign = input.slopePct === 0 ? 0 : input.slopePct > 0 ? 1 : -1;
  const aim = Math.abs(input.slopePct) * input.puttLengthFt * (0.65 + (11 - clamp(input.stimp, 7, 13)) * 0.03);
  const grainFactor = input.grainDeg ? 1 + Math.abs(input.grainDeg) * 0.01 : 1;
  const aimInches = aim * grainFactor;
  const highSide = sign > 0 ? 'right' : sign < 0 ? 'left' : 'center';
  const confidence = clamp(0.62 + Math.min(0.2, Math.abs(input.slopePct) * 0.08), 0, 0.9);
  const notes: string[] = ['Conceptual break model for product demos.'];
  if (Math.abs(input.slopePct) < 0.5) notes.push('Small slopes are sensitive to read and green-speed variation.');
  return { aimInches, highSide, confidence, notes };
}

