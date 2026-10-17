export enum PoseLandmarkId {
  Nose = 0,
  LeftEyeInner = 1,
  LeftEye = 2,
  LeftEyeOuter = 3,
  RightEyeInner = 4,
  RightEye = 5,
  RightEyeOuter = 6,
  LeftEar = 7,
  RightEar = 8,
  MouthLeft = 9,
  MouthRight = 10,
  LeftShoulder = 11,
  RightShoulder = 12,
  LeftElbow = 13,
  RightElbow = 14,
  LeftWrist = 15,
  RightWrist = 16,
  LeftPinky = 17,
  RightPinky = 18,
  LeftIndex = 19,
  RightIndex = 20,
  LeftThumb = 21,
  RightThumb = 22,
  LeftHip = 23,
  RightHip = 24,
  LeftKnee = 25,
  RightKnee = 26,
  LeftAnkle = 27,
  RightAnkle = 28,
  LeftHeel = 29,
  RightHeel = 30,
  LeftFootIndex = 31,
  RightFootIndex = 32,
}

export type LandmarkVector = {
  x: number;
  y: number;
  z: number;
};

export type PoseLandmark = LandmarkVector & {
  id: PoseLandmarkId;
  visibility: number;
  presence?: number;
  confidence: number;
};

export type PoseFrame = {
  timestampMs: number;
  frameIndex: number;
  width: number;
  height: number;
  landmarks: PoseLandmark[];
  worldLandmarks?: PoseLandmark[];
  detectionConfidence?: number;
  trackingConfidence?: number;
};

export type JointName = keyof typeof PoseLandmarkId;

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
}

export function landmarkConfidence(lm: PoseLandmark): number {
  return clamp01((lm.confidence * 0.7) + (lm.visibility * 0.3));
}

export function getLandmark(frame: PoseFrame, id: PoseLandmarkId): PoseLandmark | null {
  const lm = frame.landmarks[id];
  return lm ? lm : null;
}
