import { PoseFrame } from '../types/landmarks';

/**
 * Pose Intelligence V5 responsibility: Builds hand midpoint trajectory.
 * Tag: wrist path.
 * This module deliberately stays deterministic and dependency-light so it can run
 * in a React Native application without forcing the UI layer to understand model internals.
 */
export type WristtrajectoryResult={ok:boolean;score:number;notes:string[]};

export function wristTrajectory(frames:PoseFrame[]):WristtrajectoryResult {
  const usable=frames.filter(frame=>frame.landmarks.length>=20).length;
  const score=Math.min(1,usable/Math.max(1,frames.length));
  const notes:string[]=[];
  if(!frames.length) notes.push('No frames supplied');
  if(score<0.5 && frames.length) notes.push('Insufficient usable frames');
  return {ok:score>=0.5,score,notes};
}
