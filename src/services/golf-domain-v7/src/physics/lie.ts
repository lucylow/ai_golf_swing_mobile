import { LieType } from '../types';
import { clamp } from '../math/statistics';

export type LieEffect = { speedFactor: number; launchDeltaDeg: number; spinFactor: number; confidence: number; note: string };

const EFFECTS: Record<LieType, LieEffect> = {
  tee: { speedFactor: 1.0, launchDeltaDeg: 0, spinFactor: 1.0, confidence: 0.98, note: 'Tee lie.' },
  fairway: { speedFactor: 1.0, launchDeltaDeg: 0, spinFactor: 1.0, confidence: 0.96, note: 'Clean fairway lie.' },
  rough: { speedFactor: 0.93, launchDeltaDeg: -1.2, spinFactor: 0.92, confidence: 0.86, note: 'Light rough can reduce friction and speed.' },
  'deep-rough': { speedFactor: 0.82, launchDeltaDeg: -2.5, spinFactor: 0.84, confidence: 0.76, note: 'Deep rough increases uncertainty and can close the face.' },
  sand: { speedFactor: 0.74, launchDeltaDeg: 3.5, spinFactor: 0.72, confidence: 0.79, note: 'Sand changes strike and energy transfer.' },
  'fairway-bunker': { speedFactor: 0.86, launchDeltaDeg: 1.0, spinFactor: 0.82, confidence: 0.8, note: 'Fairway bunker requires controlled strike height.' },
  hardpan: { speedFactor: 0.92, launchDeltaDeg: -1.0, spinFactor: 0.9, confidence: 0.82, note: 'Hardpan can raise low-point sensitivity.' },
  'cart-path': { speedFactor: 1, launchDeltaDeg: 0, spinFactor: 1, confidence: 0.1, note: 'Not a normal playable lie.' },
  green: { speedFactor: 1, launchDeltaDeg: 0, spinFactor: 1, confidence: 0.95, note: 'Putting/short-game surface.' },
};

export function getLieEffect(lie: LieType): LieEffect { return EFFECTS[lie]; }
export function adjustCarryForLie(carryYards: number, lie: LieType): number {
  return carryYards * clamp(getLieEffect(lie).speedFactor, 0.55, 1.05);
}

