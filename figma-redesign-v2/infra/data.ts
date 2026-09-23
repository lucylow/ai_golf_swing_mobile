import type { Drill, FeedItem, Goal, Metric, Session } from './types';

export const metrics: Metric[] = [
  { id: 'extension', label: 'Early Extension', score: 74, value: '8 cm', delta: '-6 pts', direction: 'down', tone: 'danger', note: 'Hips move toward the ball through impact.' },
  { id: 'rotation', label: 'Shoulder Rotation', score: 81, value: '78°', delta: '+4 pts', direction: 'up', tone: 'warning', note: 'Turn is approaching the target range.' },
  { id: 'head', label: 'Head Stability', score: 92, value: '2 cm', delta: '+7 pts', direction: 'up', tone: 'positive', note: 'Lateral head movement stays compact.' },
  { id: 'tempo', label: 'Tempo', score: 88, value: '3:1', delta: '+2 pts', direction: 'up', tone: 'positive', note: 'Backswing-to-downswing rhythm is repeatable.' },
  { id: 'plane', label: 'Swing Plane', score: 86, value: '+2.1°', delta: '+5 pts', direction: 'up', tone: 'positive', note: 'Delivery is closer to the corridor.' },
  { id: 'face', label: 'Face Control', score: 79, value: '1.8°', delta: '-2 pts', direction: 'down', tone: 'warning', note: 'Face-to-path variability remains visible.' },
];
export const sessions: Session[] = [
  { id: 's1', date: 'Sep 09', club: '7 Iron', score: 86, swings: 12, focus: 'Rotation', duration: '08:42', quality: 'Clean' },
  { id: 's2', date: 'Sep 05', club: 'Driver', score: 83, swings: 8, focus: 'Tempo', duration: '06:18', quality: 'Strong' },
  { id: 's3', date: 'Sep 02', club: '7 Iron', score: 84, swings: 10, focus: 'Face Control', duration: '07:11', quality: 'Mixed' },
  { id: 's4', date: 'Aug 30', club: 'PW', score: 82, swings: 14, focus: 'Contact', duration: '09:26', quality: 'Clean' },
  { id: 's5', date: 'Aug 27', club: 'Driver', score: 81, swings: 9, focus: 'Swing Plane', duration: '06:54', quality: 'Strong' },
];
export const drills: Drill[] = [
  { id: 'd1', title: 'Wall-to-wall tempo', focus: 'Tempo', minutes: 8, level: 'Easy', cue: 'Keep the 3:1 rhythm.', steps: ['Make three rehearsal swings.', 'Pause at the top for one count.', 'Repeat at 60% speed.', 'Finish with three normal swings.'], favorite: true },
  { id: 'd2', title: 'Hip depth reset', focus: 'Early Extension', minutes: 10, level: 'Medium', cue: 'Keep your trail hip behind the line.', steps: ['Set your trail hip to the wall.', 'Make a half backswing.', 'Turn through without losing contact.', 'Progress to a full swing.'] },
  { id: 'd3', title: 'Feet-together balance', focus: 'Head Stability', minutes: 6, level: 'Easy', cue: 'Finish without the head chasing the target.', steps: ['Start with narrow stance.', 'Hit half shots.', 'Hold the finish for two counts.', 'Add speed only when balanced.'], favorite: true },
  { id: 'd4', title: 'Impact bag face control', focus: 'Face Control', minutes: 12, level: 'Medium', cue: 'Start line before speed.', steps: ['Set the bag square.', 'Make quarter swings.', 'Check the face at impact.', 'Gradually lengthen the motion.'] },
];
export const goals: Goal[] = [
  { id: 'g1', title: 'Break 80 consistently', current: 76, target: 80, unit: 'avg score', due: 'Oct 15', color: 'positive' },
  { id: 'g2', title: 'Reduce early extension', current: 74, target: 88, unit: 'score', due: 'Oct 01', color: 'danger' },
  { id: 'g3', title: 'Practice 4× per week', current: 3, target: 4, unit: 'sessions', due: 'This week', color: 'info' },
];
export const feed: FeedItem[] = [
  { id: 'f1', title: 'New swing analyzed', body: 'Rotation improved 4 points in the latest session.', time: '8m', tone: 'positive', unread: true },
  { id: 'f2', title: 'Mission ready', body: 'Hip Depth Reset is queued for your next practice.', time: '2h', tone: 'warning' },
  { id: 'f3', title: 'Weekly trend', body: 'Your last five sessions average 84.', time: 'Yesterday', tone: 'info' },
];
