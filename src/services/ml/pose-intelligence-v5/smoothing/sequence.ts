import { PoseFrame, PoseLandmark } from '../types/landmarks';
import { AdaptiveOneEuro3D } from './oneEuro';
import { median } from '../math/scalar';

export type SequenceSmoothingOptions = {
  minCutoffHz: number;
  beta: number;
  maxGapFrames: number;
};

function cloneLandmark(lm: PoseLandmark): PoseLandmark {
  return { ...lm, id: lm.id };
}

export class PoseSequenceSmoother {
  private readonly filters = new Map<number, AdaptiveOneEuro3D>();
  private readonly options: SequenceSmoothingOptions;
  private previous?: PoseFrame;

  constructor(options: SequenceSmoothingOptions) {
    this.options = options;
  }

  reset(): void {
    this.filters.clear();
    this.previous = undefined;
  }

  smoothFrame(frame: PoseFrame): PoseFrame {
    const next = { ...frame, landmarks: frame.landmarks.map(cloneLandmark) };
    next.landmarks = next.landmarks.map((lm) => {
      let filter = this.filters.get(lm.id);
      if (!filter) {
        filter = new AdaptiveOneEuro3D({ minCutoffHz: this.options.minCutoffHz, beta: this.options.beta });
        this.filters.set(lm.id, filter);
      }
      const filtered = filter.filter({x: lm.x, y: lm.y, z: lm.z}, frame.timestampMs);
      return { ...lm, x: filtered.x, y: filtered.y, z: filtered.z };
    });
    this.previous = next;
    return next;
  }

  repairShortGaps(frames: PoseFrame[]): PoseFrame[] {
    if (frames.length < 2) return frames;
    const output = frames.map((f) => ({ ...f, landmarks: f.landmarks.map(cloneLandmark) }));
    for (let i = 1; i < output.length - 1; i += 1) {
      const prev = output[i - 1];
      const current = output[i];
      const next = output[i + 1];
      for (let j = 0; j < current.landmarks.length; j += 1) {
        const lm = current.landmarks[j];
        if (lm.confidence > 0.15) continue;
        const before = prev.landmarks[j];
        const after = next.landmarks[j];
        if (!before || !after || before.confidence < 0.3 || after.confidence < 0.3) continue;
        current.landmarks[j] = {
          ...lm,
          x: (before.x + after.x) / 2,
          y: (before.y + after.y) / 2,
          z: (before.z + after.z) / 2,
          confidence: Math.min(before.confidence, after.confidence) * 0.75,
          visibility: Math.min(before.visibility, after.visibility) * 0.75,
        };
      }
    }
    return output;
  }
}
