import { generateSyntheticSwing } from "../src/synthetic/generator";
import { buildSyntheticDataset, defaultSyntheticDatasetConfig } from "../src/synthetic/datasetBuilder";
import { labelsForSequence, phaseOrder } from "../src/synthetic/labeling";
import { describe, expect, it } from "vitest";

describe("V12 synthetic golf data", () => {
  it("generates deterministic swing frames with complete landmarks and phase labels", () => {
    const sequence = generateSyntheticSwing({ seed: 42, frames: 120, fps: 120 });
    const repeatedSequence = generateSyntheticSwing({ seed: 42, frames: 120, fps: 120 });
    const labels = labelsForSequence(sequence.frames);

    expect(repeatedSequence).toEqual(sequence);
    expect(sequence.frames).toHaveLength(120);
    expect(sequence.frames.every((frame) => frame.landmarks.length === 33)).toBe(true);
    expect(sequence.frames.some((frame) => frame.phase === "P7")).toBe(true);
    expect(labels.every((label) => label.oneHot.length === phaseOrder.length)).toBe(true);
  });

  it("builds a dataset with the configured number of swings", () => {
    const config = defaultSyntheticDatasetConfig(9);
    const dataset = buildSyntheticDataset({
      ...config,
      subjects: 3,
      sessionsPerSubject: 1,
      swingsPerSession: 2,
      frames: 30,
    });

    expect(dataset).toHaveLength(6);
  });
});
