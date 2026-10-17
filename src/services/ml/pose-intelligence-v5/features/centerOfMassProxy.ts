import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
export function centerOfMassProxy(frame:PoseFrame){
 const ids=[PoseLandmarkId.LeftShoulder,PoseLandmarkId.RightShoulder,PoseLandmarkId.LeftHip,PoseLandmarkId.RightHip,PoseLandmarkId.LeftKnee,PoseLandmarkId.RightKnee];
 const pts=ids.map(id=>point3(frame,id)).filter(Boolean) as {x:number;y:number;z:number}[];
 if(!pts.length)return null;
 return {x:pts.reduce((s,p)=>s+p.x,0)/pts.length,y:pts.reduce((s,p)=>s+p.y,0)/pts.length,z:pts.reduce((s,p)=>s+p.z,0)/pts.length};
}
