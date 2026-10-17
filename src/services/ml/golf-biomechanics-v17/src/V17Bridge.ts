import { mapAppPoseFrame } from "../../golf-biomechanics-v16";
import type { AppPoseFrame } from "../../golf-biomechanics-v16";
import type { CameraCalibration, Handedness } from "./types";
import {
  GolfBiomechanicsEngineV17,
  type V17Options,
  type V17Snapshot,
} from "./v17Engine";

export class V17Bridge {
  constructor(private readonly engine = new GolfBiomechanicsEngineV17()) {}

  analyzeAppFrames(
    frames: AppPoseFrame[],
    camera: CameraCalibration,
    handedness: Handedness,
    options: V17Options = {},
  ): V17Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError("V17Bridge requires an array of app pose frames");
    }

    let previousTimestamp = -1;
    for (const [frameIndex, frame] of frames.entries()) {
      if (!frame || !Number.isFinite(frame.timestampMs) || frame.timestampMs < 0) {
        throw new RangeError(`Frame ${frameIndex} has an invalid timestamp`);
      }
      if (frame.timestampMs <= previousTimestamp) {
        throw new RangeError(
          "Pose frame timestamps must be strictly increasing",
        );
      }
      previousTimestamp = frame.timestampMs;
    }

    return this.engine.analyze(
      frames.map(mapAppPoseFrame),
      camera,
      handedness,
      options,
    );
  }
}
