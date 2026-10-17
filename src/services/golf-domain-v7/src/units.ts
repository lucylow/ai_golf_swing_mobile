export const MPH_TO_MPS = 0.44704;
export const YARD_TO_METER = 0.9144;
export const METER_TO_YARD = 1 / YARD_TO_METER;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export function mphToMps(mph: number): number { return mph * MPH_TO_MPS; }
export function mpsToMph(mps: number): number { return mps / MPH_TO_MPS; }
export function yardsToMeters(yards: number): number { return yards * YARD_TO_METER; }
export function metersToYards(meters: number): number { return meters * METER_TO_YARD; }
export function degToRad(deg: number): number { return deg * DEG_TO_RAD; }
export function radToDeg(rad: number): number { return rad * RAD_TO_DEG; }
export function normalizeAngleDeg(value: number): number {
  let angle = value % 360;
  if (angle > 180) angle -= 360;
  if (angle < -180) angle += 360;
  return angle;
}

