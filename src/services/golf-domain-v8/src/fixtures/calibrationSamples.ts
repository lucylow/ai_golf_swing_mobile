import { CalibrationSample } from '../calibration/types';
export const CALIBRATION_SAMPLES_V8: CalibrationSample[] = [];
for (let i = 0; i < 48; i += 1) {
  const refBall = 128 + i * 0.5;
  const refLaunch = 12 + (i % 8) * 0.55;
  const rawBall = (refBall - 3.2) / 1.018;
  const rawLaunch = (refLaunch - 0.35) / 0.985;
  CALIBRATION_SAMPLES_V8.push({ shotKey: `shot-${i}`, metric: 'ballSpeedMph', appValue: rawBall, referenceValue: refBall, timestampMs: 1_700_000_000_000 + i * 60_000 });
  CALIBRATION_SAMPLES_V8.push({ shotKey: `shot-${i}`, metric: 'launchAngleDeg', appValue: rawLaunch, referenceValue: refLaunch, timestampMs: 1_700_000_000_000 + i * 60_000 });
  const refPath = -2.5 + (i % 10) * 0.55;
  const rawPath = (refPath + 0.22) / 0.97;
  CALIBRATION_SAMPLES_V8.push({ shotKey: `shot-${i}`, metric: 'clubPathDeg', appValue: rawPath, referenceValue: refPath, timestampMs: 1_700_000_000_000 + i * 60_000 });
  const refFace = -1.5 + (i % 7) * 0.48;
  const rawFace = (refFace + 0.12) / 1.025;
  CALIBRATION_SAMPLES_V8.push({ shotKey: `shot-${i}`, metric: 'faceAngleDeg', appValue: rawFace, referenceValue: refFace, timestampMs: 1_700_000_000_000 + i * 60_000 });
  const refCarry = 205 + i * 0.9;
  const rawCarry = (refCarry - 6.5) / 1.032;
  CALIBRATION_SAMPLES_V8.push({ shotKey: `shot-${i}`, metric: 'carryYards', appValue: rawCarry, referenceValue: refCarry, timestampMs: 1_700_000_000_000 + i * 60_000 });
}
