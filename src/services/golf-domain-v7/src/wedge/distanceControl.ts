import { clamp, mean, standardDeviation } from '../math/statistics';
export type WedgeSample = { carryYards: number; swingLength: 'quarter' | 'half' | 'three-quarter' | 'full' };
export type WedgeMatrixRow = { swingLength: WedgeSample['swingLength']; meanCarry: number; variability: number; count: number };
export function buildWedgeMatrix(samples: WedgeSample[]): WedgeMatrixRow[] {
  return (['quarter', 'half', 'three-quarter', 'full'] as const).map((length) => {
    const values = samples.filter((sample) => sample.swingLength === length).map((sample) => sample.carryYards);
    return { swingLength: length, meanCarry: mean(values), variability: standardDeviation(values), count: values.length };
  });
}
export function recommendWedgeSwing(targetYards: number, rows: WedgeMatrixRow[]): { swingLength: WedgeSample['swingLength']; targetCarry: number; errorYards: number; cue: string } {
  const viable = rows.filter((row) => row.count > 0);
  const chosen = viable.sort((a, b) => Math.abs(a.meanCarry - targetYards) - Math.abs(b.meanCarry - targetYards))[0] ?? { swingLength: 'half', meanCarry: targetYards, variability: 0, count: 0 };
  const errorYards = chosen.meanCarry - targetYards;
  const cue = Math.abs(errorYards) < 4 ? 'Use the familiar swing length and commit to the target.' : errorYards > 0 ? 'Throttle length slightly or choose a higher-loft option.' : 'Add length or choose a lower-loft option.';
  return { swingLength: chosen.swingLength, targetCarry: clamp(chosen.meanCarry, 10, 160), errorYards, cue };
}

