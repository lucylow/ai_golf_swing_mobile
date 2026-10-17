import { describe, expect, it } from "vitest";
import {
  GolfBiomechanicsEngineV15,
  mapExistingPose,
  V15Bridge,
} from "../index";
import type { CameraModel, ExistingAppPoseResult, PoseFrame } from "../index";
import { PoseController } from "../../pose-intelligence-v5/integration/poseController";

const camera: CameraModel = {
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
    x: 0.2 + index * 0.01,
    y: 0.3 + Math.sin(index / 4) * 0.03,
    z: 0.1 + Math.cos(index / 5) * 0.02,
    visibility,
    presence: visibility,
    confidence: visibility,
  }));
}

function makeFrames(count: number, visibility = 0.95): ExistingAppPoseResult[] {
  return Array.from({ length: count }, (_, index) => ({
    timestampMs: index * (1000 / 60),
    landmarks: makeLandmarks(visibility),
  }));
}

function makeEngineFrames(count: number, visibility = 0.95): PoseFrame[] {
  return makeFrames(count, visibility).map((frame) => ({
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

describe("V15 golf biomechanics integration", () => {
  it("maps world pose coordinates and preserves low landmark confidence", () => {
    const result: ExistingAppPoseResult = {
      timestampMs: 0,
      landmarks: makeLandmarks(),
      worldLandmarks: makeLandmarks(0.25).map((landmark) => ({
        ...landmark,
        x: landmark.x + 5,
      })),
    };

    const frame = mapExistingPose(result);

    expect(frame.landmarks[0].x).toBeCloseTo(5.2);
    expect(frame.landmarks[0].visibility).toBeCloseTo(0.0625);
  });

  it("allows empty hand results and treats unknown pose confidence as zero", () => {
    const frame = mapExistingPose({
      timestampMs: 0,
      landmarks: makeLandmarks().map(({ x, y, z }) => ({ x, y, z })),
      hands: [],
    });

    expect(frame.landmarks[0].visibility).toBe(0);
    expect(frame.hands).toEqual([]);
  });

  it("produces golf metrics and suppresses coaching for low-confidence data", () => {
    const engine = new GolfBiomechanicsEngineV15();
    const reliable = engine.analyze(makeEngineFrames(60), {
      handedness: "right",
      camera,
      goal: "trail-foot stability",
    });
    const unreliable = engine.analyze(makeEngineFrames(60, 0.1), {
      handedness: "right",
      camera,
      goal: "trail-foot stability",
    });

    expect(reliable.metrics.map((metric) => metric.name)).toContain("xFactor");
    expect(reliable.metrics).toHaveLength(13);
    expect(unreliable.reliability.overall).toBeLessThan(0.5);
    expect(unreliable.anomalies).toEqual([]);
    expect(unreliable.coaching).toBeNull();
  });

  it("returns explicit insufficient quality for empty sequences", () => {
    const result = new GolfBiomechanicsEngineV15().analyze([], {
      handedness: "right",
      camera,
      goal: "consistency",
    });

    expect(result.reliability.overall).toBe(0);
    expect(result.metrics).toEqual([]);
    expect(result.coaching).toBeNull();
  });

  it("rejects malformed landmarks, timestamps, and camera inputs", () => {
    const bridge = new V15Bridge();
    expect(() =>
      bridge.analyze([{ timestampMs: 0, landmarks: [] }], camera, "right"),
    ).toThrow("exactly 33 landmarks");
    expect(() =>
      bridge.analyze([...makeFrames(1), ...makeFrames(1)], camera, "right"),
    ).toThrow("strictly increasing");
    expect(() =>
      new GolfBiomechanicsEngineV15().analyze(makeEngineFrames(2), {
        handedness: "right",
        camera: { ...camera, fx: 0 },
        goal: "consistency",
      }),
    ).toThrow("finite and positive");
  });

  it("exposes V15 analysis through the existing pose controller", () => {
    const controller = new PoseController({
      async initialize() {},
      async infer() {
        return null;
      },
      async dispose() {},
    });

    const result = controller.analyzeV15(camera, "right", "tempo");
    expect(result.version).toBe("v15.0.0-golf-biomechanics");
    expect(result.reliability.overall).toBe(0);
  });
});
