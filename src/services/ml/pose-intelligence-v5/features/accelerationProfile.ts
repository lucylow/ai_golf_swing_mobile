import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { sequenceSpeed } from './kinematics';
import { safeDivide } from '../math/scalar';
export function accelerationProfile(frames:PoseFrame[],id:PoseLandmarkId):number[]{
 const speeds=sequenceSpeed(frames,id); const output:number[]=[];
 for(let i=1;i<speeds.length;i+=1){const dt=Math.max(.001,((frames[i+1]?.timestampMs ?? frames[i]?.timestampMs ?? 16)-(frames[i]?.timestampMs ?? 0))/1000);output.push(safeDivide(speeds[i]-speeds[i-1],dt,0));}
 return output;
}
