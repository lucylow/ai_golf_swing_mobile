import { clamp } from '../math/statistics';
export type DeliveryWindow = { pathLow: number; pathHigh: number; faceLow: number; faceHigh: number; score: number };
export function buildDeliveryWindow(pathDeg: number, faceToPathDeg: number): DeliveryWindow {
  const score = clamp(1 - (Math.abs(pathDeg) / 10 + Math.abs(faceToPathDeg) / 8) * 0.5, 0, 1);
  return { pathLow: pathDeg - 2, pathHigh: pathDeg + 2, faceLow: faceToPathDeg - 1.5, faceHigh: faceToPathDeg + 1.5, score };
}

