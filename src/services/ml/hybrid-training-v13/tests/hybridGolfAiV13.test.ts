import { describe, expect, it } from "vitest";
import { HybridGolfAiV13, type HybridSample } from "../index";

const sample = (
  sampleId: string,
  subjectId: string,
  domain: HybridSample["domain"],
  split: number,
  quality: number,
): HybridSample => ({
  sampleId,
  subjectId,
  domain,
  phaseCoverage: 0.8,
  quality,
  features: { split },
});

describe("HybridGolfAiV13", () => {
  it("prepares balanced train, validation, and test collections", () => {
    const pipeline = new HybridGolfAiV13();
    const records = [
      sample("train-real", "subject-1", "real", 1, 0.9),
      sample("validation-real", "subject-2", "real", 2, 0.8),
      sample("test-real", "subject-3", "real", 3, 0.7),
      sample("train-synthetic", "subject-4", "synthetic", 1, 0.85),
    ];

    const result = pipeline.prepare(records);

    expect(result.train.map((record) => record.sampleId).sort()).toEqual(
      ["train-real", "train-synthetic"].sort(),
    );
    expect(result.validation.map((record) => record.sampleId)).toEqual(["validation-real"]);
    expect(result.test.map((record) => record.sampleId)).toEqual(["test-real"]);
    expect(result.coverage).toEqual({
      count: 2,
      meanQuality: 0.875,
      meanPhaseCoverage: 0.8,
    });
    expect(result.activeLearningIds).toHaveLength(records.length);
  });

  it("rejects subjects assigned to multiple dataset splits", () => {
    const pipeline = new HybridGolfAiV13();

    expect(() =>
      pipeline.prepare([
        sample("train", "reused-subject", "real", 1, 0.9),
        sample("test", "reused-subject", "real", 3, 0.8),
      ]),
    ).toThrow("subject leakage: reused-subject");
  });

  it("reports invalid model input dimensions", () => {
    const pipeline = new HybridGolfAiV13();

    expect(
      pipeline.validateModelInput({
        frames: 2,
        landmarks: 32,
        channels: 3,
        data: [],
      }),
    ).toEqual(["landmarks must equal 33", "data length mismatch"]);
  });
});
