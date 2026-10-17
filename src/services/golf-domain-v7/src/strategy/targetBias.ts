import { clamp } from '../math/statistics';
export type TargetBias = { aimDegrees: number; startWindowYards: [number, number]; safeMiss: 'left' | 'right' | 'long' | 'short'; confidence: number };
export function computeTargetBias(typicalMiss: 'left'|'right'|'center', hazardSide: 'left'|'right'|'none', confidence: number): TargetBias {
  const aimDegrees = typicalMiss === 'right' ? -1.2 : typicalMiss === 'left' ? 1.2 : 0;
  const safeMiss = hazardSide === 'left' ? 'right' : hazardSide === 'right' ? 'left' : typicalMiss === 'right' ? 'left' : typicalMiss === 'left' ? 'right' : 'long';
  const modifier = hazardSide === 'none' ? 1 : 0.8;
  return { aimDegrees: aimDegrees * modifier, startWindowYards: [-12,12], safeMiss, confidence: clamp(confidence * modifier,0,1) };
}

