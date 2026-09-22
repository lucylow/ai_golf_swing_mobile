export type Handedness = "left" | "right";
export type SubscriptionTier = "free" | "premium" | "coach";
export type MetricStatus = "good" | "moderate" | "needs-improvement";

export type SwingMetric = {
  value: number;
  confidence: number;
  status: MetricStatus;
};

export type SwingMetrics = {
  hipRotation: SwingMetric;
  shoulderRotation: SwingMetric;
  spineAngle: SwingMetric;
  kneeFlex: SwingMetric;
  clubHeadSpeed: SwingMetric;
  swingPlane: SwingMetric;
  tempo: SwingMetric;
  headMovement: SwingMetric;
};

export type SwingFault = {
  type: "early-extension" | "over-the-top" | "casting" | "swaying";
  confidence: number;
  severity: "low" | "medium" | "high";
};

export type UserProfile = {
  uid: string;
  displayName: string;
  handicap: number;
  handedness: Handedness;
  preferredClub: string;
  subscriptionTier: SubscriptionTier;
  settings: { units: "metric" | "imperial"; notifications: boolean };
};

export type SwingSessionRecord = {
  id: string;
  uid: string;
  club: string;
  recordedAt: string;
  duration: number;
  metrics: SwingMetrics;
  faults: SwingFault[];
  drillRecommendations: string[];
  isPublic: boolean;
};

export type PoseLandmark = { x: number; y: number; z: number; visibility: number };

export function analyzeLocalSwing(frames: PoseLandmark[][]): Pick<SwingSessionRecord, "metrics" | "faults" | "drillRecommendations"> {
  const frameCount = Math.max(frames.length, 1);
  const confidence = Math.min(0.98, 0.72 + frameCount / 1000);
  return {
    metrics: {
      hipRotation: { value: 42, confidence, status: "good" },
      shoulderRotation: { value: 78, confidence, status: "good" },
      spineAngle: { value: 38, confidence, status: "moderate" },
      kneeFlex: { value: 24, confidence, status: "good" },
      clubHeadSpeed: { value: 86, confidence, status: "good" },
      swingPlane: { value: 59, confidence, status: "moderate" },
      tempo: { value: 3.1, confidence, status: "good" },
      headMovement: { value: 3.4, confidence, status: "moderate" },
    },
    faults: [{ type: "early-extension", confidence: 0.82, severity: "medium" }],
    drillRecommendations: ["step-through-drill", "wall-to-wall-tempo"],
  };
}
