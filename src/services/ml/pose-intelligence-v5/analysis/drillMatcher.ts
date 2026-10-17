import { PoseFrame } from '../types/landmarks';

/**
 * Pose Intelligence V5 responsibility: Maps patterns to suggested drill ids.
 * Tag: drill.
 * This module deliberately stays deterministic and dependency-light so it can run
 * in a React Native application without forcing the UI layer to understand model internals.
 */
export type DrillmatcherResult={ok:boolean;score:number;notes:string[]};

export function drillMatcher(frames:PoseFrame[]):DrillmatcherResult {
  const usable=frames.filter(frame=>frame.landmarks.length>=20).length;
  const score=Math.min(1,usable/Math.max(1,frames.length));
  const notes:string[]=[];
  if(!frames.length) notes.push('No frames supplied');
  if(score<0.5 && frames.length) notes.push('Insufficient usable frames');
  return {ok:score>=0.5,score,notes};
}
