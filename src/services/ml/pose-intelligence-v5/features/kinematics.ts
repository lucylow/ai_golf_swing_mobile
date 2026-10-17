import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { sub3, magnitude3, Vec3 } from '../math/vector';
import { safeDivide } from '../math/scalar';

export type KinematicSample = {
  timestampMs:number;
  velocities:Partial<Record<PoseLandmarkId,Vec3>>;
  speeds:Partial<Record<PoseLandmarkId,number>>;
};

export function estimateKinematics(previous:PoseFrame,current:PoseFrame):KinematicSample {
  const dt=Math.max(0.001,(current.timestampMs-previous.timestampMs)/1000);
  const velocities:Partial<Record<PoseLandmarkId,Vec3>>={};
  const speeds:Partial<Record<PoseLandmarkId,number>>={};
  for(let id=0;id<current.landmarks.length;id+=1){
    const p=point3(previous,id as PoseLandmarkId,true); const c=point3(current,id as PoseLandmarkId,true);
    if(!p||!c) continue;
    const v=sub3(c,p); const vel={x:safeDivide(v.x,dt),y:safeDivide(v.y,dt),z:safeDivide(v.z,dt)};
    velocities[id as PoseLandmarkId]=vel;
    speeds[id as PoseLandmarkId]=magnitude3(vel);
  }
  return {timestampMs:current.timestampMs,velocities,speeds};
}

export function sequenceSpeed(frames:PoseFrame[],id:PoseLandmarkId):number[] {
  const result:number[]=[];
  for(let i=1;i<frames.length;i+=1){result.push(estimateKinematics(frames[i-1],frames[i]).speeds[id] ?? 0);}
  return result;
}
