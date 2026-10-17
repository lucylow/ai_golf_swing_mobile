import { clamp, mean } from '../math/statistics';
export type ImpactWindow = { centerMs: number; widthMs: number; confidence: number; cue: string };
export function estimateImpactWindow(eventTimes: number[]): ImpactWindow {
  const clean = eventTimes.filter(Number.isFinite);
  if (!clean.length) return { centerMs: 0, widthMs: 0, confidence: 0, cue: 'Need more valid events.' };
  const centerMs = mean(clean);
  const spread = clean.length > 1 ? Math.max(...clean) - Math.min(...clean) : 0;
  const widthMs = clamp(spread, 0, 140);
  const confidence = clamp(1 - widthMs / 180, 0, 1);
  const cue = confidence > 0.8 ? 'Impact timing is repeatable.' : 'Capture more clean swings to tighten the event window.';
  return { centerMs, widthMs, confidence, cue };
}

