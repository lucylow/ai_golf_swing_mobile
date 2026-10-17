import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { distance3, Vec3 } from '../math/vector';
export type BoneConstraint={a:PoseLandmarkId;b:PoseLandmarkId;expected:number;tolerance:number};
export type ConstraintReport={score:number;violations:Array<{constraint:BoneConstraint;actual:number;error:number}>};
export function evaluateBoneConstraints(frame:PoseFrame,constraints:BoneConstraint[]):ConstraintReport{
 const violations:ConstraintReport['violations']=[];let total=0;let good=0;
 for(const c of constraints){const a=point3(frame,c.a);const b=point3(frame,c.b);if(!a||!b)continue;const actual=distance3(a,b);const error=Math.abs(actual-c.expected);total+=1;if(error<=c.tolerance)good+=1;else violations.push({constraint:c,actual,error});}
 return {score:total?good/total:0,violations};
}
export function defaultGolfBoneConstraints(frame:PoseFrame):BoneConstraint[]{
 const pairs:[[PoseLandmarkId,PoseLandmarkId]]|any=[];
 const ids=[[PoseLandmarkId.LeftShoulder,PoseLandmarkId.LeftElbow],[PoseLandmarkId.LeftElbow,PoseLandmarkId.LeftWrist],[PoseLandmarkId.RightShoulder,PoseLandmarkId.RightElbow],[PoseLandmarkId.RightElbow,PoseLandmarkId.RightWrist],[PoseLandmarkId.LeftHip,PoseLandmarkId.LeftKnee],[PoseLandmarkId.LeftKnee,PoseLandmarkId.LeftAnkle],[PoseLandmarkId.RightHip,PoseLandmarkId.RightKnee],[PoseLandmarkId.RightKnee,PoseLandmarkId.RightAnkle]];
 for(const [a,b] of ids){const p=point3(frame,a);const q=point3(frame,b);if(p&&q)pairs.push({a,b,expected:distance3(p,q),tolerance:0.18});}
 return pairs;
}
