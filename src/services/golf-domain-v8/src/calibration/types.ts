export type CalibrationMetricKey =
  | 'ballSpeedMph'
  | 'launchAngleDeg'
  | 'azimuthDeg'
  | 'spinRpm'
  | 'spinAxisDeg'
  | 'carryYards'
  | 'totalYards'
  | 'clubSpeedMph'
  | 'smashFactor'
  | 'clubPathDeg'
  | 'attackAngleDeg'
  | 'faceAngleDeg'
  | 'dynamicLoftDeg'
  | 'impactOffsetMm'
  | 'closureRateDegPerSec';

export type CalibrationSample = {
  shotKey: string;
  metric: CalibrationMetricKey;
  appValue: number;
  referenceValue: number;
  weight?: number;
  clubId?: string;
  timestampMs?: number;
};

export type CalibrationCoefficients = {
  metric: CalibrationMetricKey;
  intercept: number;
  scale: number;
  rmse: number;
  mae: number;
  bias: number;
  r2: number;
  sampleCount: number;
  inlierCount: number;
  minReference: number;
  maxReference: number;
};

export type CalibrationProfileV8 = {
  id: string;
  deviceLabel: string;
  createdAt: string;
  version: 8;
  coefficients: Partial<Record<CalibrationMetricKey, CalibrationCoefficients>>;
  sampleCount: number;
  holdoutRmseByMetric: Partial<Record<CalibrationMetricKey, number>>;
  notes: string[];
};

export type CalibrationFitOptions = {
  minSamples: number;
  huberDelta: number;
  ridgeLambda: number;
  holdoutFraction: number;
  maxIterations: number;
  convergenceEpsilon: number;
};

export type CalibrationReport = {
  profile: CalibrationProfileV8;
  pass: boolean;
  warnings: string[];
  recommendations: string[];
};
