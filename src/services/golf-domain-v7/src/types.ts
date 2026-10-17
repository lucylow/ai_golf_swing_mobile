export type Handedness = 'right' | 'left';
export type CameraView = 'side' | 'down-the-line' | 'front' | 'three-quarter' | 'unknown';
export type ClubCategory = 'driver' | 'wood' | 'hybrid' | 'iron' | 'wedge' | 'putter';
export type LieType = 'tee' | 'fairway' | 'rough' | 'deep-rough' | 'sand' | 'fairway-bunker' | 'hardpan' | 'cart-path' | 'green';
export type ShotShape = 'straight' | 'push' | 'pull' | 'push-fade' | 'pull-draw' | 'fade' | 'draw' | 'slice' | 'hook' | 'block';
export type SwingPhase = 'address' | 'takeaway' | 'backswing' | 'top' | 'transition' | 'delivery' | 'impact' | 'release' | 'finish';
export type PracticeSkill = 'driver' | 'irons' | 'wedges' | 'short-game' | 'putting' | 'course-management' | 'tempo' | 'sequencing' | 'contact' | 'face-control' | 'path-control';

export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export type PoseJoint = {
  name: string;
  position: Vec3;
  visibility: number;
  presence: number;
};

export type PoseFrame = {
  index: number;
  timeMs: number;
  joints: PoseJoint[];
  clubHead?: Vec3;
  clubGrip?: Vec3;
  ball?: Vec3;
  cameraView: CameraView;
  frameQuality: number;
};

export type SwingEvent = {
  phase: SwingPhase;
  frameIndex: number;
  timeMs: number;
  confidence: number;
};

export type SwingMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  confidence: number;
  phase?: SwingPhase;
  direction?: 'higher-is-better' | 'lower-is-better' | 'target-window';
  targetLow?: number;
  targetHigh?: number;
};

export type ShotInput = {
  clubId: string;
  clubCategory: ClubCategory;
  swingSpeedMph: number;
  launchDeg: number;
  spinRpm: number;
  faceToPathDeg: number;
  clubPathDeg: number;
  attackAngleDeg: number;
  dynamicLoftDeg: number;
  strikeEfficiency: number;
  carryYards?: number;
  totalYards?: number;
  shotShape?: ShotShape;
  lie?: LieType;
  windMph?: number;
  windDirectionDeg?: number;
  elevationFt?: number;
};

export type BallFlight = {
  carryYards: number;
  totalYards: number;
  apexYards: number;
  launchDeg: number;
  descentDeg: number;
  sideOffsetYards: number;
  curvatureYards: number;
  estimatedConfidence: number;
  notes: string[];
};

export type ClubProfile = {
  id: string;
  name: string;
  category: ClubCategory;
  loftDeg: number;
  lieDeg: number;
  nominalLengthIn: number;
  carryMeanYards: number;
  carryStdYards: number;
  speedWindowMph: [number, number];
};

export type ClubGap = {
  clubId: string;
  carryYards: number;
  totalYards: number;
  gapFromPriorYards: number;
  overlap: number;
  confidence: number;
};

export type HoleHazard = {
  id: string;
  type: 'water' | 'bunker' | 'trees' | 'ob' | 'native' | 'slope';
  distanceFromTeeYards?: number;
  distanceFromGreenYards?: number;
  lateralYards?: number;
  penaltyStroke?: boolean;
};

export type HolePlan = {
  hole: number;
  par: 3 | 4 | 5;
  yardage: number;
  windMph: number;
  windDirectionDeg: number;
  elevationFt: number;
  pinYardsFromFront: number;
  hazards: HoleHazard[];
};

export type TargetWindow = {
  name: string;
  centerYards: number;
  widthYards: number;
  expectedSuccess: number;
  risk: number;
  reason: string;
};

export type PracticeBlock = {
  id: string;
  skill: PracticeSkill;
  title: string;
  minutes: number;
  reps: number;
  target: string;
  cue: string;
  passCondition: string;
};

export type CoachingInsight = {
  id: string;
  title: string;
  observation: string;
  evidence: string[];
  whyItMatters: string;
  nextAction: string;
  confidence: number;
  priority: 'primary' | 'secondary' | 'supporting';
  domain: 'swing' | 'ball-flight' | 'equipment' | 'strategy' | 'short-game' | 'putting';
};

export type GolfSession = {
  id: string;
  golferId: string;
  startedAt: string;
  clubId: string;
  shots: ShotInput[];
  insights: CoachingInsight[];
  practiceBlocks: PracticeBlock[];
};

export type GolferProfile = {
  id: string;
  name: string;
  handicap: number;
  handedness: Handedness;
  typicalMiss: ShotShape;
  driverSpeedMph: number;
  goals: string[];
  recentSkills: PracticeSkill[];
};

