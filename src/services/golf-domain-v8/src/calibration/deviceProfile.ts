import { CalibrationProfileV8 } from './types';
import { scoreCalibrationQuality } from './quality';
export type DeviceCalibrationEnvelope = { deviceId: string; profile: CalibrationProfileV8; createdAt: string; quality: ReturnType<typeof scoreCalibrationQuality> };
export function createDeviceEnvelope(deviceId: string, profile: CalibrationProfileV8): DeviceCalibrationEnvelope {
  return { deviceId, profile, createdAt: new Date().toISOString(), quality: scoreCalibrationQuality(profile) };
}
