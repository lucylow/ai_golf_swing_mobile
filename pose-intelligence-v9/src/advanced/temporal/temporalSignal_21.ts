import { PoseFrame, FeatureValue } from '../../types';
import { get } from '../../landmarks';
import { distance3, mean, std, clamp01 } from '../../math';

export type TemporalSignalReport = {
  landmarkId: number;
  window: number;
  energy: number;
  variability: number;
  peakSpeed: number;
  stability: number;
  confidence: number;
  samples: number;
};

function positions(frames: PoseFrame[]): Array<{x:number;y:number;z:number;confidence:number}> {
  return frames.map(f => get(f, 28)).filter((p): p is NonNullable<ReturnType<typeof get>> => p !== null);
}

function speeds(frames: PoseFrame[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < frames.length; i++) {
    const a = get(frames[i - 1], 28);
    const b = get(frames[i], 28);
    if (!a || !b) continue;
    const dt = Math.max((frames[i].timestampMs - frames[i - 1].timestampMs) / 1000, 1e-3);
    out.push(distance3(a, b) / dt);
  }
  return out;
}

export function analyze(frames: PoseFrame[]): TemporalSignalReport {
  const ps = positions(frames);
  const ss = speeds(frames);
  const energy = ss.reduce((sum, v) => sum + v * v, 0);
  const peakSpeed = ss.reduce((max, v) => Math.max(max, v), 0);
  const variability = std(ss);
  const confidence = clamp01(mean(ps.map(p => p.confidence)));
  const stability = clamp01(1 / (1 + variability));
  return {landmarkId:28,window:8,energy,variability,peakSpeed,stability,confidence,samples:ss.length};
}

export function feature(frames: PoseFrame[]): FeatureValue {
  const r = analyze(frames);
  return {name:`temporal_28_21`,value:r.peakSpeed,unit:'body_scale_per_s',confidence:r.confidence,source:'temporal_motion'};
}

export function exceedsWindow(report: TemporalSignalReport, threshold = 0.25): boolean {
  return report.variability > threshold && report.samples >= 8;
}

export function coachingHint(report: TemporalSignalReport): string {
  if (report.confidence < 0.5) return 'Low landmark confidence: prioritize camera placement before changing technique.';
  if (exceedsWindow(report)) return 'High motion variability: repeat the movement and look for consistency across swings.';
  return 'Motion signal is stable enough to combine with phase and geometry features.';
}

