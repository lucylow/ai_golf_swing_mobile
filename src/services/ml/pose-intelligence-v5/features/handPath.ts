import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { distance3, Vec3 } from '../math/vector';
export function handPathLength(frames:PoseFrame[]):number{
 let total=0; let prev:Vec3|null=null;
 for(const f of frames){const l=point3(f,PoseLandmarkId.LeftWrist);const r=point3(f,PoseLandmarkId.RightWrist);if(!l||!r)continue;const p={x:(l.x+r.x)/2,y:(l.y+r.y)/2,z:(l.z+r.z)/2};if(prev)total+=distance3(prev,p);prev=p;}
 return total;
}
