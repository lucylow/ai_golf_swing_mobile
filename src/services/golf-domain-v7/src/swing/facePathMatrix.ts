import { ShotInput } from '../types';

export type FacePathCell = {
  name: string;
  start: string;
  curve: string;
  coachingCue: string;
};

export function facePathCell(input: Pick<ShotInput, 'faceToPathDeg' | 'clubPathDeg'>): FacePathCell {
  const path = input.clubPathDeg;
  const face = input.faceToPathDeg;
  const start = path > 2 ? 'right' : path < -2 ? 'left' : 'center';
  const curve = face > 4 ? 'fade' : face < -4 ? 'draw' : 'neutral';
  let coachingCue = 'Face and path are relatively matched.';
  if (face > 4 && path < -2) coachingCue = 'Club path left with face more open to path: manage face first.';
  if (face < -4 && path > 2) coachingCue = 'Club path right with face more closed to path: manage face first.';
  if (Math.abs(path) > 6) coachingCue = 'Large path deviation is likely driving the start direction.';
  return { name: `${start} / ${curve}`, start, curve, coachingCue };
}

