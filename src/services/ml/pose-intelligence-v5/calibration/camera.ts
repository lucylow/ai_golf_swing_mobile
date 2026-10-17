import { CameraView } from '../types/model';
import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { angleBetween3, sub3, v3 } from '../math/vector';

export type CameraCalibration = { view:CameraView; bodyScale:number; perspectiveScore:number; notes:string[] };

export function calibrateCamera(frames:PoseFrame[]):CameraCalibration{
  const first=frames[0];
  if(!first)return {view:'unknown',bodyScale:1,perspectiveScore:0,notes:['No frames']};
  const l=point3(first,PoseLandmarkId.LeftShoulder,false); const r=point3(first,PoseLandmarkId.RightShoulder,false);
  const nose=point3(first,PoseLandmarkId.Nose,false); const hipL=point3(first,PoseLandmarkId.LeftHip,false); const hipR=point3(first,PoseLandmarkId.RightHip,false);
  if(!l||!r||!nose||!hipL||!hipR)return {view:'unknown',bodyScale:1,perspectiveScore:0,notes:['Insufficient landmarks']};
  const shoulder={x:r.x-l.x,y:r.y-l.y,z:r.z-l.z};
  const body={x:((hipL.x+hipR.x)/2)-nose.x,y:((hipL.y+hipR.y)/2)-nose.y,z:((hipL.z+hipR.z)/2)-nose.z};
  const perpendicular=Math.abs(angleBetween3(sub3(l,r),body)-90);
  const view:CameraView=perpendicular<25?'side':perpendicular<55?'three-quarter':'front';
  return {view,bodyScale:Math.max(0.01,Math.sqrt(shoulder.x**2+shoulder.y**2+shoulder.z**2)),perspectiveScore:Math.max(0,1-perpendicular/90),notes:[]};
}
