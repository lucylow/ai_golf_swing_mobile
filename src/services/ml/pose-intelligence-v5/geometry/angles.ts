import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { jointAngleDegrees, point3 } from './joints';
import { wrapAngleDegrees } from '../math/scalar';
import { Vec3, sub3 } from '../math/vector';

export function elbowAngle(frame: PoseFrame, side: 'left'|'right'): number {
  const shoulder = point3(frame, side==='left'?PoseLandmarkId.LeftShoulder:PoseLandmarkId.RightShoulder);
  const elbow = point3(frame, side==='left'?PoseLandmarkId.LeftElbow:PoseLandmarkId.RightElbow);
  const wrist = point3(frame, side==='left'?PoseLandmarkId.LeftWrist:PoseLandmarkId.RightWrist);
  return shoulder && elbow && wrist ? jointAngleDegrees(shoulder,elbow,wrist) : 0;
}

export function kneeAngle(frame: PoseFrame, side: 'left'|'right'): number {
  const hip = point3(frame, side==='left'?PoseLandmarkId.LeftHip:PoseLandmarkId.RightHip);
  const knee = point3(frame, side==='left'?PoseLandmarkId.LeftKnee:PoseLandmarkId.RightKnee);
  const ankle = point3(frame, side==='left'?PoseLandmarkId.LeftAnkle:PoseLandmarkId.RightAnkle);
  return hip && knee && ankle ? jointAngleDegrees(hip,knee,ankle) : 0;
}

export function shoulderTurn(frame: PoseFrame): number {
  const left = point3(frame, PoseLandmarkId.LeftShoulder); const right = point3(frame, PoseLandmarkId.RightShoulder);
  if (!left || !right) return 0;
  return Math.atan2(right.z-left.z, right.x-left.x) * 180 / Math.PI;
}

export function hipTurn(frame: PoseFrame): number {
  const left = point3(frame, PoseLandmarkId.LeftHip); const right = point3(frame, PoseLandmarkId.RightHip);
  if (!left || !right) return 0;
  return Math.atan2(right.z-left.z, right.x-left.x) * 180 / Math.PI;
}

export function torsoLean(frame: PoseFrame): number {
  const leftShoulder = point3(frame,PoseLandmarkId.LeftShoulder); const rightShoulder = point3(frame,PoseLandmarkId.RightShoulder);
  const leftHip = point3(frame,PoseLandmarkId.LeftHip); const rightHip = point3(frame,PoseLandmarkId.RightHip);
  if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return 0;
  const shoulderMid:Vec3 = {x:(leftShoulder.x+rightShoulder.x)/2,y:(leftShoulder.y+rightShoulder.y)/2,z:(leftShoulder.z+rightShoulder.z)/2};
  const hipMid:Vec3 = {x:(leftHip.x+rightHip.x)/2,y:(leftHip.y+rightHip.y)/2,z:(leftHip.z+rightHip.z)/2};
  const v = sub3(shoulderMid,hipMid);
  return Math.atan2(v.z, Math.max(1e-5, Math.abs(v.y))) * 180 / Math.PI;
}

export function circularDeltaDegrees(a:number,b:number):number { return wrapAngleDegrees(b-a); }
