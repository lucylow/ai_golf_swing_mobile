import { clamp } from '../math/statistics';
export type SequenceInput = { pelvisPeakMs: number; torsoPeakMs: number; armsPeakMs: number; clubPeakMs: number };
export type SequenceResult = { score: number; order: string[]; spreadMs: number; cue: string };
export function scoreSequence(input: SequenceInput): SequenceResult {
  const points = [
    ['pelvis', input.pelvisPeakMs],
    ['torso', input.torsoPeakMs],
    ['arms', input.armsPeakMs],
    ['club', input.clubPeakMs],
  ] as const;
  const ordered = [...points].sort((a, b) => a[1] - b[1]);
  const inversions = ordered.reduce((count, item, index) => count + (item[0] !== points[index][0] ? 1 : 0), 0);
  const spreadMs = Math.max(...points.map((point) => point[1])) - Math.min(...points.map((point) => point[1]));
  const score = clamp(1 - inversions * 0.16 - Math.max(0, 50 - spreadMs) / 250, 0, 1);
  const cue = score > 0.8 ? 'Sequence is coherent; protect the order and refine timing.' : 'Focus on creating clearer lower-body lead before the club accelerates.';
  return { score, order: ordered.map((point) => point[0]), spreadMs, cue };
}

