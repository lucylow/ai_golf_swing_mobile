import { describe, expect, it } from "vitest";
import {
  GolfBiomechanicsEngineV16,
  mapAppPoseFrame,
  V16Bridge,
} from "../index";
import type { AppPoseFrame, CameraCalibration, PoseFrame } from "../index";
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

function makeFrames(count: number, visibility = 0.95): AppPoseFrame[] {
  return Array.from({ length: count }, (_, index) => ({
    timestampMs: index * 33,
    fps: 30,
    landmarks: makeLandmarks(visibility),
  }));
}

function makeEngineFrames(count: number): PoseFrame[] {
  return makeFrames(count).map((frame) => ({
    timestampMs: frame.timestampMs,
    landmarks: frame.landmarks.map((landmark, index) => ({
      index,
      x: landmark.x,
      y: landmark.y,
      z: landmark.z,
      visibility: landmark.visibility ?? 0,
      presence: landmark.presence,
    })),
  }));
}

describe("V16 golf biomechanics integration", () => {
  it("returns the expanded 23-metric result for a complete swing sequence", () => {
    const result = new V16Bridge().analyzeAppFrames(
      makeFrames(180),
      camera,
      "right",
      "consistency",
    );

    expect(result.version).toBe("v16.0.0-biomechanics");
    expect(result.metrics).toHaveLength(23);
    expect(result.phases.length).toBeGreaterThanOrEqual(5);
    expect(result.events.length).toBeGreaterThanOrEqual(2);
    expect(
      result.metrics.every((metric) => Number.isFinite(metric.value)),
    ).toBe(true);
  });

  it("prefers world landmarks and does not infer confidence when omitted", () => {
    const frame = mapAppPoseFrame({
      timestampMs: 0,
      landmarks: makeLandmarks(0.9),
      worldLandmarks: makeLandmarks(0.2).map((landmark) => ({
        x: landmark.x + 2,
        y: landmark.y,
        z: landmark.z,
      })),
    });

    expect(frame.landmarks[0].x).toBeCloseTo(2);
    expect(frame.landmarks[0].visibility).toBe(0);
    expect(frame.landmarks[0].presence).toBe(0);
  });

  it("returns explicit empty-input reliability and refuses malformed sequences", () => {
    const bridge = new V16Bridge();
    const empty = bridge.analyzeAppFrames([], camera, "right");

    expect(empty.reliability.overall).toBe(0);
    expect(empty.metrics).toEqual([]);
    expect(empty.coaching).toBeNull();
    expect(() =>
      bridge.analyzeAppFrames(
        [{ timestampMs: 0, landmarks: makeLandmarks().slice(1) }],
        camera,
        "right",
      ),
    ).toThrow("exactly 33");
    expect(() =>
      bridge.analyzeAppFrames(
        [makeFrames(1)[0], makeFrames(1)[0]],
        camera,
        "right",
      ),
    ).toThrow("strictly increasing");
  });

  it("rejects invalid camera and frame data through the engine API", () => {
    const engine = new GolfBiomechanicsEngineV16();
    expect(() =>
      engine.analyze(
        makeEngineFrames(2),
        { ...camera, fx: Number.NaN },
        "right",
      ),
    ).toThrow("Camera calibration");
    expect(() =>
      engine.analyze(
        [
          {
            ...makeEngineFrames(1)[0],
            landmarks: makeEngineFrames(1)[0].landmarks.slice(1),
          },
        ],
        camera,
        "right",
      ),
    ).toThrow("exactly 33");
  });

  it("exposes V16 analysis through the existing pose controller", () => {
    const controller = new PoseController({
      async initialize() {},
      async infer() {
        return null;
      },
      async dispose() {},
    });

    const result = controller.analyzeV16(camera, "right", "sequencing");
    expect(result.version).toBe("v16.0.0-biomechanics");
    expect(result.reliability.overall).toBe(0);
  });
});
