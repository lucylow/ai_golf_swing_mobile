import { PoseFrame } from './landmarks';

export type CameraView = 'side' | 'down-the-line' | 'front' | 'three-quarter' | 'unknown';

export type SwingPhaseName =
  | 'setup'
  | 'takeaway'
  | 'backswing'
  | 'top'
  | 'transition'
  | 'downswing'
  | 'impact'
  | 'release'
  | 'finish'
  | 'unknown';

export type PhaseWindow = {
  phase: SwingPhaseName;
  startFrame: number;
  endFrame: number;
  startMs: number;
  endMs: number;
  confidence: number;
};

export type Metric = {
  key: string;
  value: number;
  unit: string;
  confidence: number;
  source: 'pose' | 'club' | 'temporal' | 'derived';
  phase?: SwingPhaseName;
};

export type PatternSeverity = 'info' | 'low' | 'medium' | 'high';

export type SwingPattern = {
  id: string;
  label: string;
  score: number;
  confidence: number;
  severity: PatternSeverity;
  evidence: string[];
  recommendedFocus?: string;
};

export type QualityReport = {
  score: number;
  usable: boolean;
  reasons: string[];
  perLandmark: Record<string, number>;
  frameCoverage: number;
  temporalStability: number;
  visibilityScore: number;
};

export type FeatureVector = {
  values: number[];
  names: string[];
  weights: number[];
  confidence: number;
};

export type SwingSignature = {
  version: string;
  featureVector: FeatureVector;
  cameraView: CameraView;
  dominantHand: 'left' | 'right' | 'unknown';
  quality: QualityReport;
};

export type AnalysisResult = {
  frames: PoseFrame[];
  phases: PhaseWindow[];
  metrics: Metric[];
  patterns: SwingPattern[];
  quality: QualityReport;
  signature: SwingSignature;
  primaryFocus?: SwingPattern;
  processingMs: number;
};
