import { CalibrationProfileV8 } from './types';
export function serializeCalibrationProfile(profile: CalibrationProfileV8): string { return JSON.stringify(profile); }
export function parseCalibrationProfile(text: string): CalibrationProfileV8 | null {
  try {
    const value = JSON.parse(text) as CalibrationProfileV8;
    if (value?.version !== 8 || typeof value.id !== 'string' || typeof value.coefficients !== 'object') return null;
    return value;
  } catch { return null; }
}
