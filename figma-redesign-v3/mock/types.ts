export type MockTone = 'positive' | 'warning' | 'danger' | 'info' | 'neutral';
export type SwingQuality = 'excellent' | 'good' | 'fair' | 'poor';
export type SwingPhase = 'address' | 'takeaway' | 'top' | 'transition' | 'delivery' | 'impact' | 'finish';
export type ClubType = 'driver' | 'fairway' | 'hybrid' | 'iron' | 'wedge' | 'putter';
export type SkillBand = 'beginner' | 'developing' | 'intermediate' | 'advanced';

export interface MockGolfer {
  id: string;
  name: string;
  initials: string;
  handicap: number;
  skill: SkillBand;
  homeCourse: string;
  avatarSeed: string;
  streak: number;
  weeklyMinutes: number;
  sessionsThisMonth: number;
  preferredClub: string;
  focus: string;
  plan: 'free' | 'pro' | 'elite';
}

export interface MockSession {
  id: string;
  golferId: string;
  date: string;
  time: string;
  title: string;
  location: string;
  club: string;
  clubType: ClubType;
  swings: number;
  durationSec: number;
  score: number;
  quality: SwingQuality;
  focus: string;
  note: string;
  thumbnailSeed: string;
  weather: string;
  temperatureC: number;
  humidity: number;
  modelConfidence: number;
  comparedTo: string | null;
  tags: string[];
}

export interface MockSwing {
  id: string;
  sessionId: string;
  index: number;
  timestamp: string;
  score: number;
  quality: SwingQuality;
  carryYards: number;
  ballSpeedMph: number;
  clubSpeedMph: number;
  launchDeg: number;
  spinRpm: number;
  attackDeg: number;
  faceToPathDeg: number;
  dynamicLoftDeg: number;
  tempo: string;
  impactXcm: number;
  impactYcm: number;
  phaseFlags: string[];
  coachCue: string;
}

export interface MockMetricHistoryPoint {
  date: string;
  value: number;
  target: number;
  score: number;
}

export interface MockMetricRecord {
  id: string;
  label: string;
  unit: string;
  category: string;
  current: number;
  display: string;
  score: number;
  delta: number;
  deltaLabel: string;
  tone: MockTone;
  target: number;
  rangeLow: number;
  rangeHigh: number;
  history: MockMetricHistoryPoint[];
  cue: string;
  detail: string;
  phase: SwingPhase;
}

export interface MockPhaseRecord {
  id: SwingPhase;
  label: string;
  score: number;
  durationMs: number;
  minDegrees: number;
  maxDegrees: number;
  finding: string;
  cue: string;
  status: MockTone;
  checkpoints: string[];
}

export interface MockClubRecord {
  id: string;
  name: string;
  type: ClubType;
  loftDeg: number;
  swings: number;
  avgScore: number;
  avgCarry: number;
  bestCarry: number;
  dispersionYards: number;
  confidence: number;
  favorite: boolean;
  lastUsed: string;
  trend: number;
  cue: string;
}

export interface MockDrillRecord {
  id: string;
  title: string;
  focus: string;
  minutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  completionRate: number;
  sessions: number;
  equipment: string[];
  cue: string;
  description: string;
  steps: string[];
  tags: string[];
  progress: number;
}

export interface MockGoalRecord {
  id: string;
  title: string;
  category: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  due: string;
  tone: MockTone;
  why: string;
  nextAction: string;
}

export interface MockNotificationRecord {
  id: string;
  type: 'analysis' | 'plan' | 'streak' | 'device' | 'system' | 'coach';
  title: string;
  body: string;
  timestamp: string;
  unread: boolean;
  tone: MockTone;
  route: string;
}

export interface MockPracticeBlock {
  id: string;
  day: string;
  date: string;
  title: string;
  minutes: number;
  focus: string;
  drills: string[];
  completed: boolean;
  score: number;
  intensity: 'easy' | 'moderate' | 'hard';
}

export interface MockInsight {
  id: string;
  title: string;
  body: string;
  evidence: string[];
  impact: string;
  tone: MockTone;
  metricIds: string[];
  action: string;
}

export interface MockDevice {
  id: string;
  name: string;
  type: 'phone' | 'watch' | 'sensor' | 'tripod';
  connected: boolean;
  battery: number;
  lastSeen: string;
  firmware: string;
  capability: string;
}

export interface MockCourseRecord {
  id: string;
  name: string;
  city: string;
  holes: number;
  par: number;
  slope: number;
  rating: number;
  lastRound: string;
  favorite: boolean;
  score: number;
  notes: string;
}

export interface MockAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
  date: string | null;
}
