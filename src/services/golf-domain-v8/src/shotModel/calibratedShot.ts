import { CalibrationProfileV8 } from '../calibration/types';
import { calibrateValue } from '../calibration/applyCalibration';
export type ShotInputsV8 = { ballSpeedMph: number; launchAngleDeg: number; azimuthDeg: number; spinRpm: number; spinAxisDeg: number; clubSpeedMph: number; clubPathDeg: number; attackAngleDeg: number; faceAngleDeg: number; dynamicLoftDeg: number };
export function calibrateShotInputs(profile: CalibrationProfileV8 | null, raw: ShotInputsV8): ShotInputsV8 {
  return {
    ballSpeedMph: calibrateValue(profile, 'ballSpeedMph', raw.ballSpeedMph),
    launchAngleDeg: calibrateValue(profile, 'launchAngleDeg', raw.launchAngleDeg),
    azimuthDeg: calibrateValue(profile, 'azimuthDeg', raw.azimuthDeg),
    spinRpm: calibrateValue(profile, 'spinRpm', raw.spinRpm),
    spinAxisDeg: calibrateValue(profile, 'spinAxisDeg', raw.spinAxisDeg),
    clubSpeedMph: calibrateValue(profile, 'clubSpeedMph', raw.clubSpeedMph),
    clubPathDeg: calibrateValue(profile, 'clubPathDeg', raw.clubPathDeg),
    attackAngleDeg: calibrateValue(profile, 'attackAngleDeg', raw.attackAngleDeg),
    faceAngleDeg: calibrateValue(profile, 'faceAngleDeg', raw.faceAngleDeg),
    dynamicLoftDeg: calibrateValue(profile, 'dynamicLoftDeg', raw.dynamicLoftDeg),
  };
}
