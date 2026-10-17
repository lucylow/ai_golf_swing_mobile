import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { sequenceSpeed } from './kinematics';
import { mean, quantile } from '../math/scalar';

export type VelocityProfile={peak:number;mean:number;q50:number;q90:number;index:number};
export function velocityProfile(frames:PoseFrame[],id:PoseLandmarkId):VelocityProfile{
 const s=sequenceSpeed(frames,id); if(!s.length)return {peak:0,mean:0,q50:0,q90:0,index:-1};
 let index=0; for(let i=1;i<s.length;i+=1){if(s[i]>s[index])index=i;}
 return {peak:s[index],mean:mean(s),q50:quantile(s,.5),q90:quantile(s,.9),index};
}
