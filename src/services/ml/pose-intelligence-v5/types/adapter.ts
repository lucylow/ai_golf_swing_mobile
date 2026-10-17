import { PoseFrame } from './landmarks';

export type ExternalLandmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
  presence?: number;
};

export type ExternalPoseResult = {
  landmarks: ExternalLandmark[];
  worldLandmarks?: ExternalLandmark[];
  detectionConfidence?: number;
  trackingConfidence?: number;
};

export interface PoseInferenceAdapter {
  initialize(): Promise<void>;
  infer(frame: unknown, timestampMs: number, frameIndex: number, width: number, height: number): Promise<PoseFrame | null>;
  dispose(): Promise<void>;
}
