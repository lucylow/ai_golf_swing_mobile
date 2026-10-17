import { CalibrationMetricKey } from './types';
export type CalibrationPolicyV8_6 = { metric: CalibrationMetricKey; maxAbsBias: number; maxRmse: number; minR2: number; note: string };
export const CALIBRATION_POLICY_6: CalibrationPolicyV8_6[] = [
  { metric: 'ballSpeedMph', maxAbsBias: 3.0 + 6 * 0.01, maxRmse: 5.0, minR2: 0.92, note: 'Monitor reference alignment policy 6.' },
  { metric: 'launchAngleDeg', maxAbsBias: 0.8, maxRmse: 1.8, minR2: 0.88, note: 'Launch-angle quality gate 6.' },
  { metric: 'clubPathDeg', maxAbsBias: 0.7, maxRmse: 1.6, minR2: 0.86, note: 'Path repeatability gate 6.' },
];
