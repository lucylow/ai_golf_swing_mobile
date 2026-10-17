import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { makeCanonicalFrame, toCanonical } from '../geometry/coordinate';
import { point3 } from '../geometry/joints';

export type CanonicalLandmark = { id:PoseLandmarkId;x:number;y:number;z:number;confidence:number };

export function canonicalizeFrame(frame: PoseFrame): CanonicalLandmark[] {
  const basis=makeCanonicalFrame(frame);
  return frame.landmarks.map((lm)=>{
    const point=point3(frame,lm.id,true);
    if(!point) return {id:lm.id,x:0,y:0,z:0,confidence:0};
    const c=toCanonical(point,basis);
    return {id:lm.id,x:c.x,y:c.y,z:c.z,confidence:lm.confidence};
  });
}
