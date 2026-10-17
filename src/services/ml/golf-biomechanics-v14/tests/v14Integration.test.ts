import { describe, expect, it } from "vitest";
import {
  GolfBiomechanicsEngineV14,
  V14Bridge,
  type AppPoseFrame,
  type ExistingAppPoseResult,
  type PoseFrame,
  type V14Snapshot,
} from "../index";
import { PoseController } from "../../pose-intelligence-v5/integration/poseController";

const makeLandmarks = (visibility = 0.9) =>
  Array.from({ length: 33 }, (_, id) => ({
    id: String(id),
    x: id / 100,
    y: 0.5 + id / 1000,
    z: id / 200,
    visibility,
    presence: visibility,
  }));

const makeFrames = (count: number, visibility = 0.9): ExistingAppPoseResult[] =>
  Array.from({ length: count }, (_, index) => ({
    timestampMs: index * (1000 / 60),
    width: 1920,
    height: 1080,
    landmarks: makeLandmarks(visibility),
  }));

describe("V14 app integration", () => {
  it("maps app pose frames using world coordinates and timestamp-derived FPS", () => {
    class CaptureEngine extends GolfBiomechanicsEngineV14 {
      analyzedFrames: PoseFrame[] = [];

      override analyze(
        frames: PoseFrame[],
        camera?: Parameters<GolfBiomechanicsEngineV14["analyze"]>[1],
      ): V14Snapshot {
        this.analyzedFrames = frames;
        return super.analyze(frames, camera);
      }
    }
    const engine = new CaptureEngine();
    const bridge = new V14Bridge(engine);
    const appFrames: AppPoseFrame[] = makeFrames(12).map(
      (frame, frameIndex) => ({
        ...frame,
        frameIndex,
        width: 1920,
        height: 1080,
        fps: undefined,
        landmarks: frame.landmarks.map((landmark, id) => ({ ...landmark, id })),
        worldLandmarks: frame.landmarks.map((landmark, id) => ({
          ...landmark,
          id,
          x: landmark.x + 10,
        })),
      }),
    );

    const mapped = bridge.mapAppFrame(appFrames[0]);
    const result = bridge.analyzeAppFrames(appFrames);

    expect(mapped.landmarks[0].p.x).toBe(10);
    expect(mapped.fps).toBe(30);
    expect(engine.analyzedFrames[0].fps).toBeCloseTo(60, 3);
    expect(
      result.metrics.find((metric) => metric.name === "poseVisibility")?.value,
    ).toBeCloseTo(0.9);
    expect(
      result.metrics.find((metric) => metric.name === "cameraAlignment")
        ?.evidence.confidence,
    ).toBe(0);
    expect(result.warnings).toContain(
      "Camera alignment is unverified; camera-dependent measurements are estimates.",
    );
  });

  it("does not assign perfect confidence when visibility is missing", () => {
    const bridge = new V14Bridge();
    const frame = {
      timestampMs: 0,
      landmarks: Array.from({ length: 33 }, (_, id) => ({
        id,
        x: 0,
        y: 0,
        z: 0,
      })),
    };

    expect(bridge.mapNative(frame).landmarks[0]).toMatchObject({
      visibility: 0,
      presence: 0,
      tracked: false,
    });
    expect(() =>
      bridge.mapNative({ ...frame, landmarks: frame.landmarks.slice(1) }),
    ).toThrow("exactly 33 pose landmarks");
  });

  it("uses explicit camera calibration confidence when supplied", () => {
    const bridge = new V14Bridge();
    const result = bridge.analyze(
      makeFrames(12).map((frame) => ({
        ...frame,
        cameraQuality: 0.85,
        cameraCalibration: {
          width: 1920,
          height: 1080,
          horizonY: 540,
          targetLineDeg: 0,
          rollDeg: 0,
          confidence: 0.8,
        },
      })),
    );

    expect(
      result.metrics.find((metric) => metric.name === "cameraAlignment")
        ?.evidence.confidence,
    ).toBe(0.8);
    expect(result.warnings).toEqual([]);
  });

  it("exposes V14 analysis through the existing pose controller", () => {
    const controller = new PoseController({
      async initialize() {},
      async infer() {
        return null;
      },
      async dispose() {},
    });

    expect(controller.analyzeV14().quality).toBe("insufficient");
  });

  it("returns no measurements for empty input and rejects non-monotonic timestamps", () => {
    const bridge = new V14Bridge();
    const empty = bridge.analyze([]);

    expect(empty.quality).toBe("insufficient");
    expect(empty.metrics).toEqual([]);
    expect(empty.action).toBeNull();
    expect(() => bridge.analyze([makeFrames(1)[0], makeFrames(1)[0]])).toThrow(
      "strictly increasing",
    );
  });

  it("does not learn baselines or coach from low-confidence frames", () => {
    const engine = new GolfBiomechanicsEngineV14();
    const result = engine.analyze(
      makeFrames(12, 0.2).map((frame) => ({
        timestampMs: frame.timestampMs,
        fps: 60,
        landmarks: frame.landmarks.map((landmark) => ({
          id: String(landmark.id),
          p: { x: landmark.x, y: landmark.y, z: landmark.z },
          visibility: 0.2,
          presence: 0.2,
          tracked: true,
        })),
      })),
    );

    expect(result.quality).toBe("insufficient");
    expect(result.baselines).toEqual([]);
    expect(result.action).toBeNull();
  });
});
