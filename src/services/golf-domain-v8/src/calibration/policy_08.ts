import { CalibrationMetricKey } from './types';
export type CalibrationPolicyV8_8 = { metric: CalibrationMetricKey; maxAbsBias: number; maxRmse: number; minR2: number; note: string };
export const CALIBRATION_POLICY_8: CalibrationPolicyV8_8[] = [
  { metric: 'ballSpeedMph', maxAbsBias: 3.0 + 8 * 0.01, maxRmse: 5.0, minR2: 0.92, note: 'Monitor reference alignment policy 8.' },
  { metric: 'launchAngleDeg', maxAbsBias: 0.8, maxRmse: 1.8, minR2: 0.88, note: 'Launch-angle quality gate 8.' },
  { metric: 'clubPathDeg', maxAbsBias: 0.7, maxRmse: 1.6, minR2: 0.86, note: 'Path repeatability gate 8.' },
];
