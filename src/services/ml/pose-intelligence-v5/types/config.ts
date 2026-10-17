export type PosePipelineConfig = {
  minLandmarkConfidence: number;
  minFrameQuality: number;
  smoothing: {
    enabled: boolean;
    cutoffHz: number;
    beta: number;
    minCutoffHz: number;
    maxGapFrames: number;
  };
  quality: {
    requiredLandmarks: number[];
    minimumVisibleFraction: number;
    maxJitterNorm: number;
    minFrameCoverage: number;
  };
  phase: {
    minimumSwingMs: number;
    minimumPhaseMs: number;
    impactWindowMs: number;
  };
};

export const defaultPosePipelineConfig: PosePipelineConfig = {
  minLandmarkConfidence: 0.45,
  minFrameQuality: 0.55,
  smoothing: {
    enabled: true,
    cutoffHz: 1.25,
    beta: 0.018,
    minCutoffHz: 0.35,
    maxGapFrames: 3,
  },
  quality: {
    requiredLandmarks: [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28],
    minimumVisibleFraction: 0.65,
    maxJitterNorm: 0.045,
    minFrameCoverage: 0.75,
  },
  phase: {
    minimumSwingMs: 450,
    minimumPhaseMs: 60,
    impactWindowMs: 90,
  },
};
