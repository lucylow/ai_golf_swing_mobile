import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { segmentLength } from '../geometry/joints';
import { safeDivide } from '../math/scalar';
export function bilateralLengthAsymmetry(frame:PoseFrame, left:PoseLandmarkId,right:PoseLandmarkId, scale=1):number{
 const l=segmentLength(frame,left,right,true); return Math.abs(l/Math.max(1e-6,scale)-1);
}
