import { CalibrationMetricKey } from './types';

export const COMMON_FIELD_ALIASES: Record<CalibrationMetricKey, string[]> = {
  ballSpeedMph: ['Ball Speed', 'BallSpeed', 'ball_speed', 'ball speed mph'],
  launchAngleDeg: ['Launch Angle', 'LaunchAngle', 'launch_angle'],
  azimuthDeg: ['Azimuth', 'Side Angle', 'SideAngle', 'azimuth'],
  spinRpm: ['Total Spin', 'TotalSpin', 'Spin', 'spin_rpm'],
  spinAxisDeg: ['Spin Axis', 'SpinAxis', 'Spin Tilt Axis', 'spin_axis'],
  carryYards: ['Carry', 'Carry Distance', 'carry_yards'],
  totalYards: ['Total', 'Total Distance', 'total_yards'],
  clubSpeedMph: ['Club Speed', 'ClubSpeed', 'club_speed'],
  smashFactor: ['Smash Factor', 'SmashFactor', 'smash_factor'],
  clubPathDeg: ['Club Path', 'ClubPath', 'club_path'],
  attackAngleDeg: ['Angle of Attack', 'Attack Angle', 'AoA', 'attack_angle'],
  faceAngleDeg: ['Face Angle', 'FaceAngle', 'face_angle'],
  dynamicLoftDeg: ['Dynamic Loft', 'DynamicLoft', 'dynamic_loft'],
  impactOffsetMm: ['Impact Location', 'Impact Offset', 'impact_offset_mm'],
  closureRateDegPerSec: ['Closure Rate', 'ClosureRate', 'closure_rate'],
};

export function canonicalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function resolveMetricHeader(header: string): CalibrationMetricKey | undefined {
  const normalized = canonicalizeHeader(header);
  for (const [metric, aliases] of Object.entries(COMMON_FIELD_ALIASES) as [CalibrationMetricKey, string[]][]) {
    if (aliases.some((alias) => canonicalizeHeader(alias) === normalized)) return metric;
  }
  return undefined;
}
