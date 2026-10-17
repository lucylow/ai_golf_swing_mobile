import { describe, expect, it } from "vitest";
import {
  GolfBiomechanicsEngineV17,
  V17Bridge,
  V17_FEATURE_REGISTRY,
} from "../index";
import type { AppPoseFrame, CameraCalibration } from "../index";
import { PoseController } from "../../pose-intelligence-v5/integration/poseController";

const camera: CameraCalibration = {
  width: 1920,
  height: 1080,
  fx: 1400,
  fy: 1400,
  cx: 960,
  cy: 540,
  rollDeg: 0,
  pitchDeg: 0,
  yawDeg: 0,
};

function makeLandmarks(visibility = 0.95) {
  return Array.from({ length: 33 }, (_, index) => ({
    x: Math.sin(index / 9) * 0.02 + (index % 4) * 0.008,
    y: 1 - Math.abs(index - 18) * 0.01,
    z: Math.cos(index / 13) * 0.03,
    visibility,
    presence: visibility,
    confidence: visibility,
  }));
}

function makeFrames(count: number): AppPoseFrame[] {
  return Array.from({ length: count }, (_, index) => ({
    timestampMs: index * 33,
    fps: 30,
    landmarks: makeLandmarks(),
  }));
}

describe("V17 golf biomechanics integration", () => {
  it("returns V16 metrics with readiness, impact and all 118 registered features", () => {
    const result = new V17Bridge().analyzeAppFrames(
      makeFrames(180),
      camera,
      "right",
      { enableCounterfactual: true },
    );

    expect(result.version).toBe("v17.0.0-biomechanics");
    expect(result.base.metrics).toHaveLength(23);
    expect(result.readiness.score).toBeGreaterThan(0);
    expect(result.impact?.name).toBe("impact");
    expect(result.counterfactual).not.toBeNull();
    expect(result.registeredFeatures).toHaveLength(118);
    expect(
      result.registeredFeatures.every((feature) => !("run" in feature)),
    ).toBe(true);
    expect(V17_FEATURE_REGISTRY.map(({ id }) => id)).toEqual(
      Array.from({ length: 118 }, (_, index) => index),
    );
  });

  it("does not report personal anomalies without a golfer history", () => {
    const result = new GolfBiomechanicsEngineV17().analyze(
      makeFrames(20).map((frame) => ({
        timestampMs: frame.timestampMs,
        landmarks: frame.landmarks.map((landmark, index) => ({
          index,
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility ?? 0,
          presence: landmark.presence,
        })),
      })),
      camera,
      "right",
    );

    expect(result.personalized.length).toBe(result.base.metrics.length);
    expect(result.personalized.every((item) => item.score === 0)).toBe(true);
    expect(result.personalized.every((item) => item.confidence === 0)).toBe(
      true,
    );
  });

  it("returns explicit empty results and rejects invalid inputs", () => {
    const bridge = new V17Bridge();
    const empty = bridge.analyzeAppFrames([], camera, "right");

    expect(empty.base.reliability.overall).toBe(0);
    expect(empty.impact).toBeNull();
    expect(empty.registeredFeatures).toEqual([]);
    expect(() =>
      bridge.analyzeAppFrames(
        [makeFrames(1)[0], makeFrames(1)[0]],
        camera,
        "right",
      ),
    ).toThrow("strictly increasing");
    expect(() =>
      bridge.analyzeAppFrames([], { ...camera, fx: Number.NaN }, "right"),
    ).toThrow("camera calibration");
    expect(() =>
      bridge.analyzeAppFrames([], camera, "right", { goal: "" }),
    ).toThrow("non-empty string");
  });

  it("makes V17 available through the existing pose controller", () => {
    const controller = new PoseController({
      async initialize() {},
      async infer() {
        return null;
      },
      async dispose() {},
    });
    const result = controller.analyzeV17(camera, "right");

    expect(result.version).toBe("v17.0.0-biomechanics");
    expect(result.base.reliability.overall).toBe(0);
    expect(controller.getLastError()).toBeNull();
  });
});
