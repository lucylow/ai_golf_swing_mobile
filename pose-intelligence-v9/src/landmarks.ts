import { Landmark, PoseFrame, Vec3 } from './types';
export const MP33 = {
  NOSE:0, LEFT_EYE_INNER:1, LEFT_EYE:2, LEFT_EYE_OUTER:3, RIGHT_EYE_INNER:4, RIGHT_EYE:5, RIGHT_EYE_OUTER:6,
  LEFT_EAR:7, RIGHT_EAR:8, MOUTH_LEFT:9, MOUTH_RIGHT:10, LEFT_SHOULDER:11, RIGHT_SHOULDER:12,
  LEFT_ELBOW:13, RIGHT_ELBOW:14, LEFT_WRIST:15, RIGHT_WRIST:16, LEFT_PINKY:17, RIGHT_PINKY:18,
  LEFT_INDEX:19, RIGHT_INDEX:20, LEFT_THUMB:21, RIGHT_THUMB:22, LEFT_HIP:23, RIGHT_HIP:24,
  LEFT_KNEE:25, RIGHT_KNEE:26, LEFT_ANKLE:27, RIGHT_ANKLE:28, LEFT_HEEL:29, RIGHT_HEEL:30,
  LEFT_FOOT_INDEX:31, RIGHT_FOOT_INDEX:32,
} as const;
export const REQUIRED = [MP33.NOSE, MP33.LEFT_SHOULDER, MP33.RIGHT_SHOULDER, MP33.LEFT_ELBOW, MP33.RIGHT_ELBOW,
  MP33.LEFT_WRIST, MP33.RIGHT_WRIST, MP33.LEFT_HIP, MP33.RIGHT_HIP, MP33.LEFT_KNEE, MP33.RIGHT_KNEE,
  MP33.LEFT_ANKLE, MP33.RIGHT_ANKLE];
export function get(frame: PoseFrame, id: number): Landmark | null { return frame.landmarks[id] ?? null; }
export function requireLandmarks(frame: PoseFrame, ids: number[]): Landmark[] { return ids.map(id => get(frame,id)).filter((v): v is Landmark => v !== null); }
export function torsoCenter(frame: PoseFrame): Vec3 | null {
  const a=get(frame,MP33.LEFT_SHOULDER), b=get(frame,MP33.RIGHT_SHOULDER), c=get(frame,MP33.LEFT_HIP), d=get(frame,MP33.RIGHT_HIP);
  if (!a||!b||!c||!d) return null;
  return {x:(a.x+b.x+c.x+d.x)/4,y:(a.y+b.y+c.y+d.y)/4,z:(a.z+b.z+c.z+d.z)/4};
}
export function bodyScale(frame: PoseFrame): number {
  const ls=get(frame,MP33.LEFT_SHOULDER), rs=get(frame,MP33.RIGHT_SHOULDER), lh=get(frame,MP33.LEFT_HIP), rh=get(frame,MP33.RIGHT_HIP);
  if (!ls||!rs||!lh||!rh) return 1;
  const shoulder=Math.hypot(ls.x-rs.x,ls.y-rs.y,ls.z-rs.z);
  const hip=Math.hypot(lh.x-rh.x,lh.y-rh.y,lh.z-rh.z);
  return Math.max((shoulder+hip)/2,0.01);
}

