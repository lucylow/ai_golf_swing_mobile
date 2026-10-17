import { clamp } from '../math/statistics';
export type SwingPlaneResult = { planeDeg: number; deviationDeg: number; label: 'neutral' | 'steep' | 'shallow'; confidence: number };
export function estimateSwingPlane(shoulderAngleDeg: number, clubAngleDeg: number): SwingPlaneResult {
  const planeDeg = (shoulderAngleDeg + clubAngleDeg) / 2;
  const deviationDeg = planeDeg - 45;
  const label = deviationDeg > 6 ? 'steep' : deviationDeg < -6 ? 'shallow' : 'neutral';
  const confidence = clamp(0.55 + Math.min(0.35, Math.abs(deviationDeg) / 40), 0, 0.9);
  return { planeDeg, deviationDeg, label, confidence };
}

