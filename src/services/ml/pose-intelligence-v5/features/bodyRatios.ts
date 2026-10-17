import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { segmentLength, point3 } from '../geometry/joints';
import { safeDivide, median } from '../math/scalar';

export type BodyScale = { shoulderWidth:number; hipWidth:number; torsoLength:number; legLength:number; overall:number };

export function bodyScale(frame:PoseFrame):BodyScale {
  const shoulderWidth=segmentLength(frame,PoseLandmarkId.LeftShoulder,PoseLandmarkId.RightShoulder,true);
  const hipWidth=segmentLength(frame,PoseLandmarkId.LeftHip,PoseLandmarkId.RightHip,true);
  const lShoulder=point3(frame,PoseLandmarkId.LeftShoulder); const lHip=point3(frame,PoseLandmarkId.LeftHip);
  const lKnee=point3(frame,PoseLandmarkId.LeftKnee); const lAnkle=point3(frame,PoseLandmarkId.LeftAnkle);
  const torsoLength=lShoulder&&lHip?Math.sqrt(((lShoulder.x-lHip.x)**2)+((lShoulder.y-lHip.y)**2)+((lShoulder.z-lHip.z)**2)):0;
  const legLength=lHip&&lKnee&&lAnkle?Math.sqrt(((lHip.x-lKnee.x)**2)+((lHip.y-lKnee.y)**2)+((lHip.z-lKnee.z)**2))+Math.sqrt(((lKnee.x-lAnkle.x)**2)+((lKnee.y-lAnkle.y)**2)+((lKnee.z-lAnkle.z)**2)):0;
  const overall=median([shoulderWidth,hipWidth,torsoLength,legLength].filter(v=>v>0),1);
  return {shoulderWidth,hipWidth,torsoLength,legLength,overall};
}

export function ratio(n:number,d:number):number{return safeDivide(n,d,0);}
