export type Vec3 = { x: number; y: number; z: number };
export type Vec2 = { x: number; y: number };
export type Quat = { x: number; y: number; z: number; w: number };
export type Handedness = "right" | "left";
export type CameraView = "face_on" | "down_the_line" | "three_quarter" | "rear";
export type ClubType = "driver" | "wood" | "hybrid" | "long_iron" | "mid_iron" | "short_iron" | "wedge";
export type SwingPhase = "P1"|"P2"|"P3"|"P4"|"P5"|"P6"|"P7"|"P8"|"P9"|"P10";

export const LANDMARK_NAMES = [
  "nose","left_eye_inner","left_eye","left_eye_outer","right_eye_inner","right_eye","right_eye_outer","left_ear","right_ear","mouth_left","mouth_right",
  "left_shoulder","right_shoulder","left_elbow","right_elbow","left_wrist","right_wrist","left_pinky","right_pinky","left_index","right_index","left_thumb","right_thumb",
  "left_hip","right_hip","left_knee","right_knee","left_ankle","right_ankle","left_heel","right_heel","left_foot_index","right_foot_index"
] as const;
export type LandmarkName = typeof LANDMARK_NAMES[number];

export type Pose3D = {
  name: LandmarkName;
  position: Vec3;
  visibility: number;
  presence: number;
};

export type ClubState = {
  grip: Vec3;
  shaftMid: Vec3;
  clubHead: Vec3;
  confidence: number;
};

export type BallState = {
  position: Vec3;
  velocity: Vec3;
  spinAxisDeg: number;
  confidence: number;
};

export type FrameTruth = {
  index: number;
  timestampMs: number;
  phase: SwingPhase;
  landmarks: Pose3D[];
  club: ClubState;
  ball: BallState;
  xFactorDeg: number;
  tempoProgress: number;
};

export type SwingMeta = {
  subjectId: string;
  sessionId: string;
  swingId: string;
  club: ClubType;
  handedness: Handedness;
  cameraView: CameraView;
  fps: 30 | 60 | 120 | 240;
  seed: number;
};

export type SwingSequence = {
  meta: SwingMeta;
  frames: FrameTruth[];
  quality: DatasetQuality;
};

export type DatasetQuality = {
  meanVisibility: number;
  meanPresence: number;
  blurRisk: number;
  occlusionRate: number;
  framingScore: number;
  labelIntegrity: number;
};

export type AugmentationConfig = {
  gaussianNoiseStd: number;
  dropoutProbability: number;
  occlusionProbability: number;
  frameDropProbability: number;
  rotationDeg: number;
  scaleJitter: number;
  translationJitter: number;
  visibilityFloor: number;
  seed: number;
};
