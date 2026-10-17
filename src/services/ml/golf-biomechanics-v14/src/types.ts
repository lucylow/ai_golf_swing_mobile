export type Side = 'left' | 'right' | 'center';
export type QualityState = 'excellent' | 'good' | 'degraded' | 'insufficient';

export interface Vec2 { x: number; y: number; }
export interface Vec3 { x: number; y: number; z: number; }
export interface Landmark3D {
  id: string;
  p: Vec3;
  visibility: number;
  presence: number;
  tracked: boolean;
}
export interface HandPoint {
  id: string;
  p: Vec3;
  score: number;
}
export interface PoseFrame {
  timestampMs: number;
  fps: number;
  landmarks: Landmark3D[];
  hands?: HandPoint[];
  cameraQuality?: number;
}
export interface CameraModel {
  width: number;
  height: number;
  focalPx: number;
  principal: Vec2;
  rollDeg: number;
  yawDeg: number;
  pitchDeg: number;
  heightM: number;
  distanceM: number;
}
export interface MetricEvidence {
  sources: string[];
  confidence: number;
  quality: QualityState;
  reasons: string[];
}
export interface BiomechMetric {
  name: string;
  value: number;
  unit: string;
  evidence: MetricEvidence;
}
export interface P1P10State {
  phase: string;
  probability: number;
  frameIndex: number;
}
export interface Anomaly {
  id: string;
  phase: string;
  component: string;
  score: number;
  confidence: number;
  evidence: string[];
}
export interface PersonalBaseline {
  metric: string;
  median: number;
  mad: number;
  sampleCount: number;
  lower: number;
  upper: number;
}
export interface CoachingAction {
  focus: string;
  why: string;
  drill: string;
  reps: number;
  recheckSwings: number;
  confidence: number;
}
export interface V14Snapshot {
  quality: QualityState;
  metrics: BiomechMetric[];
  phases: P1P10State[];
  anomalies: Anomaly[];
  baselines: PersonalBaseline[];
  action: CoachingAction | null;
  warnings: string[];
}
