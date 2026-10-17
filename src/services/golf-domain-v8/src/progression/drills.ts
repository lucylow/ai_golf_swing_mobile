import { DrillDefinitionV8, SkillV8 } from './types';
const make = (id: string, skill: SkillV8, title: string, objective: string, difficulty: number, cue: string): DrillDefinitionV8 => ({ id, skill, title, objective, difficulty, estimatedMinutes: 10 + Math.round(difficulty * 8), steps: [
  { id: `${id}-1`, name: 'Rehearsal', reps: 8, target: 'Slow, controlled motion', passThreshold: 0.75, cue },
  { id: `${id}-2`, name: 'Half speed', reps: 10, target: 'Repeat the same pattern', passThreshold: 0.78, cue },
  { id: `${id}-3`, name: 'Full speed', reps: 12, target: 'Transfer to a normal shot', passThreshold: 0.72, cue },
], progressionRule: 'Increase speed or environmental variability after repeated success.', regressionRule: 'Reduce speed, reps, or complexity after repeated failures.' });
export const DRILLS_V8: DrillDefinitionV8[] = [
  make('v8-face-01', 'face-control', 'Start-Line Gate', 'Control the face through a narrow start window.', 0.35, 'Finish with the face matching the intended start line.'),
  make('v8-face-02', 'face-control', 'Face-to-Path Window', 'Reduce face-to-path variability.', 0.55, 'Feel the face closing through impact without forcing it.'),
  make('v8-path-01', 'path-control', 'Split-Stick Path', 'Build a repeatable club path.', 0.4, 'Swing between two visual rails.'),
  make('v8-path-02', 'path-control', 'Delivery Slot', 'Stabilize the delivery window.', 0.65, 'Return the shaft through the slot.'),
  make('v8-transition-01', 'transition', 'Pause at the Top', 'Improve lower-body-first transition sequencing.', 0.3, 'Pressure shift before the arms accelerate.'),
  make('v8-transition-02', 'transition', 'Step-Through Transition', 'Transfer sequencing into full motion.', 0.62, 'Let the lower body pull the motion forward.'),
  make('v8-tempo-01', 'tempo', 'Metronome 3:1', 'Stabilize backswing-to-downswing tempo.', 0.35, 'Keep the same cadence across clubs.'),
  make('v8-tempo-02', 'tempo', 'Random Tempo Ladder', 'Maintain timing under varied target demands.', 0.7, 'Keep rhythm stable while the target changes.'),
  make('v8-contact-01', 'iron-contact', 'Line Strike Gate', 'Control low point and strike.', 0.4, 'Brush the ground after the ball.'),
  make('v8-contact-02', 'iron-contact', 'Random Strike Test', 'Transfer contact consistency under variability.', 0.75, 'Commit to the same low point on every shot.'),
  make('v8-wedge-01', 'wedge-distance', 'Three-Wedge Ladder', 'Build reliable partial-swing carry windows.', 0.45, 'Match swing length to carry target.'),
  make('v8-wedge-02', 'wedge-distance', 'Random Wedge Matrix', 'Hit random distances with repeatable tempo.', 0.76, 'Keep setup and tempo stable while length changes.'),
  make('v8-putt-01', 'putting-start-line', 'Gate Start Line', 'Improve face-start direction.', 0.4, 'Start the putt between the gates.'),
  make('v8-putt-02', 'putting-distance', 'Ladder Pace', 'Control first-putt speed.', 0.58, 'Finish inside the distance window.'),
  make('v8-chip-01', 'chipping', 'Landing-Window Ladder', 'Choose a landing window and pace the roll.', 0.45, 'Land the ball on the chosen spot.'),
  make('v8-bunker-01', 'bunker', 'Entry Point Drill', 'Control sand entry depth and exit.', 0.5, 'Enter the sand at the same point.'),
  make('v8-course-01', 'course-management', 'Target-Window Game', 'Train target selection under consequence.', 0.6, 'Choose the safest high-value window.'),
  make('v8-driver-01', 'driver', 'Fairway Corridor', 'Reduce lateral dispersion on tee shots.', 0.5, 'Center the start line inside the corridor.'),
];
export function drillForSkill(skill: SkillV8, difficulty: number): DrillDefinitionV8 {
  const candidates = DRILLS_V8.filter((d) => d.skill === skill).sort((a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty));
  return candidates[0] ?? DRILLS_V8[0];
}
