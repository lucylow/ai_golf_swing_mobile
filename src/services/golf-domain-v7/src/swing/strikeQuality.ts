import { ShotInput } from '../types';
import { clamp, clamp01 } from '../math/statistics';

export type StrikeQuality = {
  score: number;
  label: 'pure' | 'solid' | 'missed-center' | 'poor-contact';
  likelyLoss: number;
  evidence: string[];
};

export function scoreStrike(input: ShotInput): StrikeQuality {
  const efficiency = clamp01(input.strikeEfficiency);
  const launchConsistency = 1 - clamp(Math.abs(input.launchDeg - expectedLaunch(input.clubCategory)) / 12, 0, 1);
  const pathPenalty = clamp(Math.abs(input.clubPathDeg) / 14, 0, 1);
  const score = clamp(efficiency * 0.72 + launchConsistency * 0.18 + (1 - pathPenalty) * 0.1, 0, 1);
  const label = score > 0.88 ? 'pure' : score > 0.74 ? 'solid' : score > 0.55 ? 'missed-center' : 'poor-contact';
  const evidence: string[] = [`Strike efficiency ${Math.round(efficiency * 100)}%`, `Launch ${input.launchDeg.toFixed(1)}°`, `Path ${input.clubPathDeg.toFixed(1)}°`];
  const likelyLoss = clamp((1 - efficiency) * 35 + Math.abs(input.clubPathDeg) * 0.7, 0, 40);
  return { score, label, likelyLoss, evidence };
}

function expectedLaunch(category: ShotInput['clubCategory']): number {
  switch (category) {
    case 'driver': return 13;
    case 'wood': return 14;
    case 'hybrid': return 16;
    case 'iron': return 19;
    case 'wedge': return 28;
    default: return 20;
  }
}

