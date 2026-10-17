import { PracticeBlock, PracticeSkill } from '../types';
const library: Record<PracticeSkill, Omit<PracticeBlock, 'id'>[]> = {
  driver: [{ skill: 'driver', title: 'Fairway Window Challenge', minutes: 12, reps: 18, target: '7/10 balls inside fairway window', cue: 'Finish balanced at 80% speed.', passCondition: 'At least 7 of 10 playable starts.' }],
  irons: [{ skill: 'irons', title: 'Low-Point Ladder', minutes: 10, reps: 20, target: 'Contact ahead of ball', cue: 'Brush the turf after the ball.', passCondition: '16 of 20 with forward low point.' }],
  wedges: [{ skill: 'wedges', title: 'Three-Window Wedge Matrix', minutes: 14, reps: 24, target: 'Build repeatable carry windows', cue: 'Same finish length for each target.', passCondition: 'Carry variability below 8 yards.' }],
  'short-game': [{ skill: 'short-game', title: 'Landing Spot Ladder', minutes: 12, reps: 18, target: 'Land inside target zone', cue: 'Pick landing spot before club selection.', passCondition: '12 of 18 inside landing window.' }],
  putting: [{ skill: 'putting', title: 'Start-Line Gate', minutes: 10, reps: 30, target: 'Start within a narrow gate', cue: 'Eyes over line, smooth face return.', passCondition: '24 of 30 inside gate.' }],
  'course-management': [{ skill: 'course-management', title: 'Safe-Target Simulation', minutes: 15, reps: 9, target: 'Commit to high-percentage target', cue: 'Name the miss before the swing.', passCondition: 'Decision chosen before setup.' }],
  tempo: [{ skill: 'tempo', title: '3-2-1 Rhythm Ladder', minutes: 8, reps: 15, target: 'Repeat target rhythm', cue: 'Quiet setup, smooth takeaway.', passCondition: '10 of 15 within tempo window.' }],
  sequencing: [{ skill: 'sequencing', title: 'Step-Through Transition', minutes: 9, reps: 18, target: 'Lower body leads transition', cue: 'Feel pressure shift before arms fire.', passCondition: 'Sequence score above 0.8.' }],
  contact: [{ skill: 'contact', title: 'Impact Spray Grid', minutes: 10, reps: 20, target: 'Center strike cluster', cue: 'Preserve posture through strike.', passCondition: 'Cluster radius under target.' }],
  'face-control': [{ skill: 'face-control', title: 'Gate-Start Challenge', minutes: 12, reps: 20, target: 'Start near target line', cue: 'Square the face without steering.', passCondition: '14 of 20 in start corridor.' }],
  'path-control': [{ skill: 'path-control', title: 'Alignment Rod Window', minutes: 12, reps: 18, target: 'Neutral delivery window', cue: 'Swing through the gate, not at the ball.', passCondition: 'Path window hit on 12 of 18.' }],
};
export function buildPracticeBlocks(skills: PracticeSkill[]): PracticeBlock[] {
  const unique = [...new Set(skills)];
  return unique.flatMap((skill, skillIndex) => (library[skill] ?? []).map((block, blockIndex) => ({ ...block, id: `v7-${skill}-${skillIndex}-${blockIndex}` })));
}

