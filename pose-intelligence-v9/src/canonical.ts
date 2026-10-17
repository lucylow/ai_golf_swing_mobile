import { Landmark, PoseFrame, Vec3 } from './types';
import { MP33, bodyScale, torsoCenter, get } from './landmarks';
import { sub3, mul3 } from './math';
export function canonicalize(frame:PoseFrame):Vec3[]{const c=torsoCenter(frame)??{x:0,y:0,z:0};const s=bodyScale(frame);return frame.landmarks.map((p:Landmark)=>mul3(sub3(p,c),1/s));}
export function normalizeImage(frame:PoseFrame):Vec3[]{const w=Math.max(frame.width,1),h=Math.max(frame.height,1);const scale=Math.max(w,h);return frame.landmarks.map(p=>({x:(p.x*w-(w/2))/scale,y:(p.y*h-(h/2))/scale,z:p.z}));}
export function mirrorNormalize(points:Vec3[],handedness:'left'|'right'):Vec3[]{return handedness==='left'?points.map(p=>({x:-p.x,y:p.y,z:p.z})):points;}
export function facingScore(frame:PoseFrame):number{const ls=get(frame,MP33.LEFT_SHOULDER),rs=get(frame,MP33.RIGHT_SHOULDER),lh=get(frame,MP33.LEFT_HIP),rh=get(frame,MP33.RIGHT_HIP);if(!ls||!rs||!lh||!rh)return 0.5;const shoulder=Math.abs(ls.x-rs.x),hip=Math.abs(lh.x-rh.x);return Math.max(0,Math.min(1,shoulder/(shoulder+hip+1e-6)));}

