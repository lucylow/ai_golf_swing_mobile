import { PoseFrame } from '../types/landmarks';
import { PosePipelineConfig, defaultPosePipelineConfig } from '../types/config';
import { AnalysisResult, CameraView } from '../types/model';
import { buildSequenceQuality } from '../quality/sequenceQuality';
import { PosePreprocessor } from './preprocess';
import { HeuristicSwingPhaseDetector } from '../phases/phaseDetector';
import { detectSwingEvents } from '../phases/eventDetector';
import { buildMetricContext, computeMetrics } from '../features/metrics/aggregator';
import { PatternEngine } from '../patterns/engine';
import { makeSwingSignature } from '../features/signature';

const CAMERA_VIEWS: CameraView[] = ['side', 'down-the-line', 'front', 'three-quarter', 'unknown'];

type SanitizedFrames = { frames: PoseFrame[]; suppliedCount: number };

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidPoseFrame(value: unknown): value is PoseFrame {
  if (!value || typeof value !== 'object') return false;
  const frame = value as PoseFrame;
  const validLandmarks = (landmarks: PoseFrame['landmarks']) =>
    Array.isArray(landmarks) && landmarks.length === 33 && landmarks.every((landmark, index) =>
      landmark && landmark.id === index && isFiniteNumber(landmark.x) &&
      isFiniteNumber(landmark.y) && isFiniteNumber(landmark.z) &&
      isFiniteNumber(landmark.visibility) && isFiniteNumber(landmark.confidence),
    );

  return isFiniteNumber(frame.timestampMs) && frame.timestampMs >= 0 &&
    Number.isInteger(frame.frameIndex) && frame.frameIndex >= 0 &&
    isFiniteNumber(frame.width) && frame.width > 0 &&
    isFiniteNumber(frame.height) && frame.height > 0 &&
    validLandmarks(frame.landmarks) &&
    (frame.worldLandmarks === undefined || validLandmarks(frame.worldLandmarks));
}

function sanitizeFrames(input: unknown): SanitizedFrames {
  if (!Array.isArray(input)) return { frames: [], suppliedCount: 0 };
  return {
    frames: input.filter(isValidPoseFrame),
    suppliedCount: input.length,
  };
}

function safeCameraView(value: CameraView): CameraView {
  return CAMERA_VIEWS.includes(value) ? value : 'unknown';
}

export class PoseSwingAnalyzer {
  private readonly preprocessor: PosePreprocessor;
  private readonly phaseDetector: HeuristicSwingPhaseDetector;
  private readonly patternEngine = new PatternEngine();

  constructor(private readonly config: PosePipelineConfig = defaultPosePipelineConfig) {
    this.preprocessor = new PosePreprocessor(config);
    this.phaseDetector = new HeuristicSwingPhaseDetector(config);
  }

  analyze(input: PoseFrame[], cameraView: CameraView = 'unknown'): AnalysisResult {
    const sanitized = sanitizeFrames(input);
    const prepared = this.preprocessor.process(sanitized.frames);
    return this.analyzeNormalized(prepared, cameraView, sanitized.suppliedCount);
  }

  analyzePrepared(input: PoseFrame[], cameraView: CameraView = 'unknown'): AnalysisResult {
    const sanitized = sanitizeFrames(input);
    return this.analyzeNormalized(sanitized.frames, cameraView, sanitized.suppliedCount);
  }

  private analyzeNormalized(
    frames: PoseFrame[],
    cameraView: CameraView,
    suppliedCount: number,
  ): AnalysisResult {
    const start = Date.now();
    const quality = buildSequenceQuality(frames, this.config);
    const retainedFraction = suppliedCount > 0 ? frames.length / suppliedCount : 1;
    if (retainedFraction < 1) {
      quality.score *= retainedFraction;
      quality.usable = quality.usable && retainedFraction >= 0.75;
      quality.reasons.push('Malformed pose frames were dropped before analysis');
    }

    const phases = this.phaseDetector.detect(frames);
    detectSwingEvents(frames, phases);
    const context = buildMetricContext(frames, quality.score);
    const metrics = computeMetrics(context);
    const patterns = this.patternEngine.detect({
      frames,
      phases,
      values: context.metricValues,
      confidence: quality.score,
    });
    const signature = makeSwingSignature(context.metricValues, quality, safeCameraView(cameraView));

    return {
      frames,
      phases,
      metrics,
      patterns,
      quality,
      signature,
      primaryFocus: patterns[0],
      processingMs: Math.max(0, Date.now() - start),
    };
  }
}
