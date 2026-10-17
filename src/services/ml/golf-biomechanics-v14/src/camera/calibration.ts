import { CameraModel, Vec2, Vec3 } from "../types";
import { clamp, wrapDeg } from "../math";

export interface CalibrationFrame {
  width: number;
  height: number;
  horizonY: number;
  targetLineDeg: number;
  rollDeg: number;
  confidence?: number;
}
export interface CalibrationResult {
  camera: CameraModel;
  score: number;
  warnings: string[];
  canonicalUp: Vec3;
  targetAxis: Vec3;
}

export function calibrateGolfCamera(
  frame: CalibrationFrame,
  expectedTargetDeg = 0,
): CalibrationResult {
  const center: Vec2 = { x: frame.width / 2, y: frame.height / 2 };
  const roll = wrapDeg(frame.rollDeg);
  const yaw = wrapDeg(frame.targetLineDeg - expectedTargetDeg);
  const horizonOffset =
    Math.abs(frame.horizonY - center.y) / Math.max(1, frame.height);
  const rollPenalty = clamp(Math.abs(roll) / 8, 0, 1);
  const yawPenalty = clamp(Math.abs(yaw) / 12, 0, 1);
  const horizonPenalty = clamp(horizonOffset * 2, 0, 1);
  const score = clamp(
    1 - (rollPenalty * 0.4 + yawPenalty * 0.4 + horizonPenalty * 0.2),
    0,
    1,
  );
  const warnings: string[] = [];
  if (rollPenalty > 0.5) warnings.push("Rotate the phone to reduce roll.");
  if (yawPenalty > 0.5)
    warnings.push("Align the camera more closely to the target line.");
  if (horizonPenalty > 0.5) warnings.push("Reframe the golfer vertically.");
  const camera: CameraModel = {
    width: frame.width,
    height: frame.height,
    focalPx: Math.max(frame.width, frame.height),
    principal: center,
    rollDeg: roll,
    yawDeg: yaw,
    pitchDeg: 0,
    heightM: 1.1,
    distanceM: 4,
  };
  return {
    camera,
    score,
    warnings,
    canonicalUp: { x: 0, y: 1, z: 0 },
    targetAxis: { x: 1, y: 0, z: 0 },
  };
}
