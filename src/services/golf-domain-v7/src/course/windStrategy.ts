import { HolePlan } from '../types';
import { clamp } from '../math/statistics';
export type WindStrategy = { adjustedYards: number; aimOffsetYards: number; clubChangeSuggestion: 'more-club' | 'less-club' | 'same'; rationale: string };
export function strategyForWind(hole: HolePlan, baselineYards: number): WindStrategy {
  const relative = ((hole.windDirectionDeg + 540) % 360) - 180;
  const headTail = Math.cos(relative * Math.PI / 180) * hole.windMph;
  const cross = Math.sin(relative * Math.PI / 180) * hole.windMph;
  const adjustedYards = baselineYards + baselineYards * clamp(headTail * 0.004, -0.18, 0.18);
  const aimOffsetYards = cross * 0.55;
  const clubChangeSuggestion = adjustedYards > baselineYards + 8 ? 'less-club' : adjustedYards < baselineYards - 8 ? 'more-club' : 'same';
  const rationale = `Wind vector ${hole.windMph.toFixed(0)} mph; adjust target by ${Math.round(adjustedYards - baselineYards)} yd and aim approximately ${aimOffsetYards.toFixed(1)} yd.`;
  return { adjustedYards, aimOffsetYards, clubChangeSuggestion, rationale };
}

