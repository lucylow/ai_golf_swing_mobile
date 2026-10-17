import { Vec2 } from './types';
export function windVector(mph: number, directionDeg: number): Vec2 {
  const r = directionDeg * Math.PI / 180;
  return { x: Math.cos(r) * mph, y: Math.sin(r) * mph };
}
export function windCarryAdjustment(carryYards: number, shotDirectionDeg: number, windMph: number, windDirectionDeg: number): number {
  const delta = (windDirectionDeg - shotDirectionDeg) * Math.PI / 180;
  const headwind = Math.cos(delta) * windMph;
  return carryYards * (1 - headwind * 0.006);
}
export function windLateralAdjustment(windMph: number, shotDirectionDeg: number, windDirectionDeg: number, flightSeconds: number): number {
  const delta = (windDirectionDeg - shotDirectionDeg) * Math.PI / 180;
  return Math.sin(delta) * windMph * flightSeconds * 0.45;
}
