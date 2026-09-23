export type CoachingTone = "good" | "high" | "medium";

export type CoachingMetric = {
  id: string;
  label: string;
  shortLabel: string;
  score: number;
  tone: CoachingTone;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
  observation: string;
  explanation: string;
  action: string;
  drillId?: string;
};

export type TrendPoint = { label: string; value: number };

export const FIGMA_METRICS: CoachingMetric[] = [
  {
    id: "extension",
    label: "Early Extension",
    shortLabel: "Extension",
    score: 74,
    tone: "high",
    value: "8 cm",
    delta: "-6 pts",
    direction: "down",
    observation: "Your hips move toward the ball through impact.",
    explanation: "That shift shortens your delivery space and can change strike location under pressure.",
    action: "Build hip depth with slow wall-to-wall rehearsals before full-speed swings.",
    drillId: "step-through",
  },
  {
    id: "rotation",
    label: "Shoulder Rotation",
    shortLabel: "Rotation",
    score: 81,
    tone: "medium",
    value: "78°",
    delta: "+4 pts",
    direction: "up",
    observation: "Your shoulder turn is closer to the target range at the top.",
    explanation: "A fuller turn gives you space to sequence from the ground up instead of rushing transition.",
    action: "Use a three-rep pause-at-the-top drill to keep the turn smooth.",
    drillId: "rotation-through-impact",
  },
  {
    id: "head",
    label: "Head Stability",
    shortLabel: "Head",
    score: 92,
    tone: "good",
    value: "2 cm",
    delta: "+7 pts",
    direction: "up",
    observation: "Your head remains close to the same lateral center through transition.",
    explanation: "Stable head position gives the arms a predictable delivery window.",
    action: "Keep feet-together rehearsals in the warm-up instead of adding more swing thoughts.",
    drillId: "feet-together-balance",
  },
  {
    id: "tempo",
    label: "Tempo",
    shortLabel: "Tempo",
    score: 88,
    tone: "good",
    value: "3:1",
    delta: "+2 pts",
    direction: "up",
    observation: "Your backswing-to-downswing timing is consistent.",
    explanation: "Repeatable timing makes the larger movement changes easier to coordinate.",
    action: "Protect this rhythm while changing one mechanical cue at a time.",
    drillId: "wall-to-wall-tempo",
  },
  {
    id: "plane",
    label: "Swing Plane",
    shortLabel: "Plane",
    score: 86,
    tone: "good",
    value: "+2.1°",
    delta: "+5 pts",
    direction: "up",
    observation: "The club is tracking closer to the reference corridor through delivery.",
    explanation: "Less variation in the delivery plane reduces compensations at the bottom of the arc.",
    action: "Rehearse the takeaway with a wall cue, then let the club fall naturally.",
  },
  {
    id: "face",
    label: "Face Control",
    shortLabel: "Face",
    score: 79,
    tone: "medium",
    value: "1.8°",
    delta: "-2 pts",
    direction: "down",
    observation: "Face-to-path variability is still the largest source of directional dispersion.",
    explanation: "A stable path with a changing face can turn a centered strike into a start-line miss.",
    action: "Use impact-bag half swings and measure start line before adding speed.",
  },
];

export const HOME_TREND: TrendPoint[] = [
  { label: "W1", value: 72 },
  { label: "W2", value: 75 },
  { label: "W3", value: 74 },
  { label: "W4", value: 79 },
  { label: "W5", value: 78 },
  { label: "W6", value: 82 },
  { label: "W7", value: 81 },
  { label: "W8", value: 84 },
];

export const SCORE_HISTORY: TrendPoint[] = [
  { label: "Aug 05", value: 72 },
  { label: "Aug 08", value: 74 },
  { label: "Aug 11", value: 73 },
  { label: "Aug 15", value: 76 },
  { label: "Aug 18", value: 78 },
  { label: "Aug 20", value: 77 },
  { label: "Aug 24", value: 80 },
  { label: "Aug 27", value: 81 },
  { label: "Aug 30", value: 82 },
  { label: "Sep 02", value: 84 },
  { label: "Sep 05", value: 83 },
  { label: "Sep 09", value: 86 },
];

export const SESSION_HISTORY = [
  { id: "session-09-09", date: "Sep 09, 2026", club: "7 Iron", score: 86, swings: 12, note: "Better rotation", focus: "Rotation", duration: "08:42" },
  { id: "session-09-05", date: "Sep 05, 2026", club: "Driver", score: 83, swings: 8, note: "Strong tempo", focus: "Tempo", duration: "06:18" },
  { id: "session-09-02", date: "Sep 02, 2026", club: "7 Iron", score: 84, swings: 10, note: "Face still variable", focus: "Face Control", duration: "07:11" },
  { id: "session-08-30", date: "Aug 30, 2026", club: "Pitching Wedge", score: 82, swings: 14, note: "Centered strike", focus: "Contact", duration: "09:26" },
  { id: "session-08-27", date: "Aug 27, 2026", club: "Driver", score: 81, swings: 9, note: "Plane trending", focus: "Swing Plane", duration: "06:54" },
  { id: "session-08-24", date: "Aug 24, 2026", club: "5 Iron", score: 80, swings: 11, note: "Good balance", focus: "Head Stability", duration: "08:03" },
  { id: "session-08-20", date: "Aug 20, 2026", club: "7 Iron", score: 77, swings: 7, note: "Tempo reset", focus: "Tempo", duration: "05:46" },
  { id: "session-08-18", date: "Aug 18, 2026", club: "Driver", score: 78, swings: 13, note: "Speed day", focus: "Face Control", duration: "09:09" },
];

export const MISSION_LIBRARY = [
  { id: "mission-extension", title: "Own hip depth", time: "10 min", progress: 42, metricId: "extension", detail: "Three slow sets, one cue: stay behind the ball into impact." },
  { id: "mission-rotation", title: "Turn without rushing", time: "12 min", progress: 68, metricId: "rotation", detail: "Pause at the top, then let the lower body start the downswing." },
  { id: "mission-tempo", title: "Protect your rhythm", time: "8 min", progress: 84, metricId: "tempo", detail: "Keep the 3:1 rhythm across five deliberate rehearsals." },
];

export const PROFILE_DEFAULTS = {
  name: "Alex Thompson",
  handicap: 4,
  goal: "Break 80 consistently",
  streak: 4,
  analyzedSwings: 47,
  practiceMinutes: 286,
};

export const APP_COPY = {
  coachLine: "Small cue. Better swing. Repeat.",
  homeSubtitle: "Your practice, organized around the next useful change.",
  analysisSubtitle: "AI biomechanics · phase-by-phase coaching",
  progressSubtitle: "Trend the move, not just the number.",
};
