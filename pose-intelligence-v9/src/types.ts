export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };
export type Confidence = { detection: number; visibility: number; tracking: number; combined: number };
export type Landmark = Vec3 & { id: number; confidence: number; visibility: number; presence?: number };
export type PoseFrame = {
  timestampMs: number;
  frameIndex: number;
  width: number;
  height: number;
  landmarks: Landmark[];
  worldLandmarks?: Landmark[];
  detectionConfidence?: number;
  trackingConfidence?: number;
};
export type PreparedFrame = PoseFrame & {
  canonical: Vec3[];
  normalized: Vec3[];
  frameQuality: number;
  cameraViewScore: number;
  jitterScore: number;
};
export type TimeSeries<T> = { timestampsMs: number[]; values: T[] };
export type AngleSignal = { name: string; degrees: number; confidence: number };
export type MotionSignal = { name: string; position: Vec3; velocity: Vec3; acceleration: Vec3; confidence: number };
export type SwingEvent = { name: 'address'|'takeaway'|'top'|'transition'|'delivery'|'impact'|'release'|'finish'; timestampMs: number; frameIndex: number; confidence: number };
export type SwingPhase = SwingEvent & { startFrame: number; endFrame: number; durationMs: number };
export type FeatureValue = { name: string; value: number; unit: string; confidence: number; source: string };
export type PatternHypothesis = { id: string; label: string; score: number; confidence: number; evidence: string[] };
export type CoachInsight = { title: string; explanation: string; action: string; confidence: number; relatedFeatures: string[] };
export type SwingAnalysis = {
  quality: { score: number; accepted: boolean; reasons: string[] };
  events: SwingEvent[];
  phases: SwingPhase[];
  features: FeatureValue[];
  patterns: PatternHypothesis[];
  insight: CoachInsight | null;
};
export type PosePipelineConfig = {
  minLandmarkConfidence: number;
  minFrameQuality: number;
  minFrames: number;
  maxGapFrames: number;
  smoothing: { enabled: boolean; cutoffHz: number; beta: number; minCutoffHz: number };
  quality: { minVisibleFraction: number; maxJitter: number; minCoverage: number };
  phase: { minSwingMs: number; minPhaseMs: number };
  runtime: { maxFps: number; maxLatencyMs: number; maxQueue: number };
};
export const defaultConfig: PosePipelineConfig = {
  minLandmarkConfidence: 0.45,
  minFrameQuality: 0.55,
  minFrames: 24,
  maxGapFrames: 3,
  smoothing: { enabled: true, cutoffHz: 1.25, beta: 0.018, minCutoffHz: 0.35 },
  quality: { minVisibleFraction: 0.65, maxJitter: 0.045, minCoverage: 0.75 },
  phase: { minSwingMs: 450, minPhaseMs: 60 },
  runtime: { maxFps: 30, maxLatencyMs: 120, maxQueue: 3 },
};
export type NativePoseLandmark = { x:number; y:number; z:number; visibility?:number; presence?:number; score?:number };
export type NativePoseResult = { timestampMs:number; width:number; height:number; landmarks:NativePoseLandmark[]; worldLandmarks?:NativePoseLandmark[] };
export type PoseRuntime = 'mediapipe'|'opencv'|'vision'|'mock';
export type InferencePacket = { runtime: PoseRuntime; timestampMs: number; landmarks: Landmark[]; latencyMs: number; detectionConfidence: number; trackingConfidence: number };

