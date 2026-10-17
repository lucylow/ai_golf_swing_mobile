import { ShotInputsV8 } from './calibratedShot';
export type ReconciledFlight = { carryYards: number; totalYards: number; apexYards: number; descentDeg: number; sideYards: number; confidence: number; notes: string[] };
export function reconcileFlight(shot: ShotInputsV8): ReconciledFlight {
  const speedFactor = Math.max(0.45, Math.min(1.15, shot.ballSpeedMph / 170));
  const launchFactor = 1 - Math.abs(shot.launchAngleDeg - 16) * 0.012;
  const spinFactor = 1 - Math.abs(shot.spinRpm - 2800) / 14000;
  const strikeFactor = Math.max(0.72, Math.min(1.03, speedFactor * 0.55 + launchFactor * 0.25 + spinFactor * 0.2));
  const carry = shot.ballSpeedMph * 1.48 * strikeFactor;
  const curvature = Math.sin(shot.spinAxisDeg * Math.PI / 180) * (carry * 0.045);
  const total = carry * (1.04 + Math.max(0, 2800 - shot.spinRpm) / 90000);
  const apex = carry * Math.max(0.12, Math.sin(shot.launchAngleDeg * Math.PI / 180) * 0.8);
  const descent = Math.max(22, 50 - shot.launchAngleDeg * 0.45 + shot.spinRpm / 1800);
  return { carryYards: carry, totalYards: total, apexYards: apex, descentDeg: descent, sideYards: curvature + shot.azimuthDeg * 0.9, confidence: 0.55 + Math.min(0.4, Math.max(0, shot.ballSpeedMph - 70) / 250), notes: ['Approximate reconciled flight model.', 'Calibrated values are preferred when a reference profile is available.'] };
}
