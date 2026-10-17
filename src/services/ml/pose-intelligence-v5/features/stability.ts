import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { standardDeviation } from '../math/scalar';
export function headStability(frames:PoseFrame[]):number{
 const ys=frames.map(f=>point3(f,PoseLandmarkId.Nose)?.y??NaN).filter(Number.isFinite);return Math.max(0,1-standardDeviation(ys));
}
export function pelvisStability(frames:PoseFrame[]):number{
 const ys=frames.map(f=>{const l=point3(f,PoseLandmarkId.LeftHip);const r=point3(f,PoseLandmarkId.RightHip);return l&&r?(l.y+r.y)/2:NaN}).filter(Number.isFinite);return Math.max(0,1-standardDeviation(ys));
}
