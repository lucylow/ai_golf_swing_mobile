import { PoseFrame } from './types/landmarks';
import { PosePipelineConfig, defaultPosePipelineConfig } from './types/config';
import { AnalysisResult, CameraView } from './types/model';
import { AdvancedPosePipeline, AdvancedPipelineResult } from './pipeline/advancedPosePipeline';
import { ModelHealthTracker } from './inference/modelHealth';
import { qualityGate } from './inference/qualityGate';
import { buildInsight } from './coaching/insight';
import { chooseDegradedMode } from './inference/degradedMode';

export type GolfPoseAlgorithmOptions = {
  config?: PosePipelineConfig;
  cameraView?: CameraView;
  allowDegraded?: boolean;
};

export type GolfPoseAlgorithmResult = AdvancedPipelineResult & {
  degraded: ReturnType<typeof chooseDegradedMode>;
  modelHealth: ReturnType<ModelHealthTracker['snapshot']>;
};

/**
 * Top-level pose/swing intelligence façade.
 *
 * This class is deliberately agnostic about how the raw pose was generated. The
 * production iOS/React Native layer can use a native MediaPipe adapter, Vision,
 * another on-device landmark engine, or a future custom model. V5 owns the
 * post-inference intelligence contract: conditioning, quality, phases, metrics,
 * pattern hypotheses, confidence and coaching explanation.
 */
export class GolfPoseAlgorithmV5 {
  private readonly pipeline: AdvancedPosePipeline;
  private readonly health = new ModelHealthTracker();
  private readonly options: Required<Pick<GolfPoseAlgorithmOptions, 'allowDegraded'>> & GolfPoseAlgorithmOptions;

  constructor(options: GolfPoseAlgorithmOptions = {}) {
    this.options = { allowDegraded: true, ...options };
    this.pipeline = new AdvancedPosePipeline(options.config ?? defaultPosePipelineConfig);
  }

  analyze(frames: PoseFrame[]): GolfPoseAlgorithmResult {
    const start = Date.now();
    let result: AdvancedPipelineResult;

    try {
      result = this.pipeline.run(frames);
    } catch (error) {
      this.health.observe(false, 0, Date.now() - start);
      throw error;
    }

    const gate = qualityGate(result.analysis.quality);
    const modelReady = frames.some((frame) => frame.landmarks.length >= 20);
    const degraded = chooseDegradedMode(modelReady, gate.accept);
    const insight = buildInsight(result.analysis.primaryFocus);

    this.health.observe(
      gate.accept,
      Math.min(result.analysis.quality.score, result.phaseConfidence),
      Date.now() - start,
    );

    return {
      ...result,
      insight,
      accepted: gate.accept,
      qualityReason: gate.reason,
      degraded: this.options.allowDegraded ? degraded : { enabled: false, capabilities: [] },
      modelHealth: this.health.snapshot(),
    };
  }

  resetHealth(): void {
    // Intentionally create no model dependency here. Health belongs to the orchestration layer.
    // A new instance is not required to reset counters in the production app; this method exists
    // as a semantic boundary for future persistence/telemetry implementations.
  }
}
