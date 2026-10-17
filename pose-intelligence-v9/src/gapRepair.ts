import { Landmark, PoseFrame } from './types';
import { clamp } from './math';

function copyFrames(frames: PoseFrame[]): PoseFrame[] {
  return frames.map((f) => ({
    ...f,
    landmarks: f.landmarks.map((p) => ({ ...p })),
  }));
}

function isWeak(point: Landmark | undefined): boolean {
  return !point || point.confidence < 0.2;
}

export function repairGaps(frames: PoseFrame[], maxGap = 3): PoseFrame[] {
  const out = copyFrames(frames);
  for (let i = 0; i < out.length; i += 1) {
    const landmarkCount = out[i]?.landmarks.length ?? 0;
    for (let id = 0; id < landmarkCount; id += 1) {
      if (!isWeak(out[i]?.landmarks[id])) continue;
      let left = i - 1;
      while (left >= 0 && isWeak(out[left]?.landmarks[id])) left -= 1;
      let right = i + 1;
      while (right < out.length && isWeak(out[right]?.landmarks[id])) right += 1;
      const leftGap = i - left;
      const rightGap = right - i;
      if (left < 0 || right >= out.length || leftGap > maxGap + 1 || rightGap > maxGap + 1) continue;
      const a = out[left].landmarks[id];
      const b = out[right].landmarks[id];
      const t = (out[i].timestampMs - out[left].timestampMs) / Math.max(out[right].timestampMs - out[left].timestampMs, 1);
      out[i].landmarks[id] = {
        ...a,
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        confidence: clamp((a.confidence + b.confidence) / 2, 0, 1),
        visibility: clamp((a.visibility + b.visibility) / 2, 0, 1),
      };
    }
  }
  return out;
}
