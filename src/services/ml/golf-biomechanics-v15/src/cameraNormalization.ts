import { PoseFrame, CameraModel, Point3 } from './types';
import { rad, sub, add, scale } from './math';

export interface CanonicalCamera { forward:Point3; up:Point3; right:Point3; warnings:string[]; score:number; }

export function buildCanonicalCamera(camera:CameraModel):CanonicalCamera {
  const warnings:string[]=[];
  const roll=rad(camera.rollDeg), pitch=rad(camera.pitchDeg), yaw=rad(camera.yawDeg);
  if(Math.abs(camera.rollDeg)>8) warnings.push('camera roll is high');
  if(Math.abs(camera.pitchDeg)>18) warnings.push('camera pitch is high');
  if(Math.abs(camera.yawDeg)>22) warnings.push('camera yaw is high');
  const forward={x:Math.cos(pitch)*Math.cos(yaw),y:Math.sin(pitch),z:Math.cos(pitch)*Math.sin(yaw)};
  const up={x:-Math.sin(roll),y:Math.cos(roll),z:0};
  const right={x:forward.z,y:0,z:-forward.x};
  const score=Math.max(0,1-(Math.abs(camera.rollDeg)/30+Math.abs(camera.pitchDeg)/60+Math.abs(camera.yawDeg)/60)/3);
  return {forward,up,right,warnings,score};
}

export function canonicalizePoint(p:Point3,camera:CanonicalCamera):Point3 {
  const x=p.x*camera.right.x+p.y*camera.right.y+p.z*camera.right.z;
  const y=p.x*camera.up.x+p.y*camera.up.y+p.z*camera.up.z;
  const z=p.x*camera.forward.x+p.y*camera.forward.y+p.z*camera.forward.z;
  return {x,y,z};
}

export function canonicalizeFrames(frames:PoseFrame[],camera:CameraModel):PoseFrame[] {
  const c=buildCanonicalCamera(camera);
  return frames.map(f=>({...f,landmarks:f.landmarks.map(l=>({...l,...canonicalizePoint(l,c)}))}));
}
