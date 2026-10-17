import { PoseFrame, FeatureValue } from '../../types';
import { get } from '../../landmarks';
import { angleDeg, distance3, clamp01, mean, std, sub3 } from '../../math';

export type Hand_To_Pelvis_Right_47Report = {
  id: string;
  label: string;
  meanDegrees: number;
  variationDegrees: number;
  normalizedScore: number;
  confidence: number;
  evidence: string[];
};

const A = 15;
const B = 16;
const C = 24;
const TARGET = 29;

function sample(frame: PoseFrame): number | null {
  const pa = get(frame, A);
  const pb = get(frame, B);
  const pc = get(frame, C);
  if (!pa || !pb || !pc) return null;
  return angleDeg(sub3(pa, pb), sub3(pc, pb));
}

function collect(frames: PoseFrame[]): number[] {
  const values: number[] = [];
  for (const frame of frames) {
    const value = sample(frame);
    if (value !== null && Number.isFinite(value)) values.push(value);
  }
  return values;
}

export function analyze(frames: PoseFrame[]): Hand_To_Pelvis_Right_47Report {
  const values = collect(frames);
  const meanDegrees = mean(values);
  const variationDegrees = std(values);
  const distance = Math.abs(meanDegrees - TARGET);
  const normalizedScore = clamp01(1 - distance / Math.max(TARGET * 1.3, 1));
  const confidence = clamp01((values.length / Math.max(frames.length, 1)) * 0.72 + 0.28 * normalizedScore);
  const evidence = [
    `samples=${values.length}`,
    `mean_deg=${meanDegrees.toFixed(2)}`,
    `std_deg=${variationDegrees.toFixed(2)}`,
    `target_deg=${TARGET}`,
  ];
  return { id: 'hand_to_pelvis_right_47', label: 'Hand To Pelvis Right 47', meanDegrees, variationDegrees, normalizedScore, confidence, evidence };
}

export function feature(frames: PoseFrame[]): FeatureValue {
  const report = analyze(frames);
  return {
    name: report.id,
    value: report.meanDegrees,
    unit: 'deg',
    confidence: report.confidence,
    source: 'advanced_geometric_feature',
  };
}

export function isStable(report: Hand_To_Pelvis_Right_47Report, maxVariation = 8.0): boolean {
  return report.variationDegrees <= maxVariation && report.confidence >= 0.6;
}

export function explain(report: Hand_To_Pelvis_Right_47Report): string {
  if (report.confidence < 0.45) return 'Insufficient landmark confidence for a strong coaching conclusion.';
  if (report.normalizedScore > 0.8) return 'The measured relationship is consistent with the current reference window.';
  if (report.variationDegrees > 8.0) return 'Variation is elevated across the sequence; repeat the recording with a clearer view.';
  return 'The relationship differs from the current reference window and should be interpreted with other signals.';
}

