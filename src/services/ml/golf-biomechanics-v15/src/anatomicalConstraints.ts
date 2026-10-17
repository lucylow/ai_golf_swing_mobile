import { PoseFrame } from './types';
import { clamp, median, std } from './math';

export interface ConstraintReport { score:number; violations:string[]; repaired:number; }

const pairs=[[11,13],[13,15],[12,14],[14,16],[23,25],[25,27],[24,26],[26,28],[11,23],[12,24]] as const;

export function estimateBoneLengths(frames:PoseFrame[]):Record<string,number>{
  const out:Record<string,number>={};
  for(const [a,b] of pairs){ const xs=frames.map(f=>{const p=f.landmarks[a],q=f.landmarks[b];return Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z);}); out[`${a}-${b}`]=median(xs);}
  return out;
}

export function validateAnatomy(frame:PoseFrame,reference:Record<string,number>):string[]{
  const violations:string[]=[];
  for(const [a,b] of pairs){const r=reference[`${a}-${b}`];if(!r)continue;const p=frame.landmarks[a],q=frame.landmarks[b];const d=Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z);if(Math.abs(d-r)>Math.max(r*.25,.05)) violations.push(`bone ${a}-${b} outlier`);}
  return violations;
}

export function constrainPose(frames:PoseFrame[]):{frames:PoseFrame[];report:ConstraintReport}{
  const ref=estimateBoneLengths(frames);let repaired=0;let violations=0;
  const out=frames.map(f=>{const copy={...f,landmarks:f.landmarks.map(l=>({...l}))};const v=validateAnatomy(copy,ref);violations+=v.length;
    for(const [a,b] of pairs){const target=ref[`${a}-${b}`];if(!target)continue;const p=copy.landmarks[a],q=copy.landmarks[b];const d=Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z);if(d<1e-6)continue;const scaleFactor=1+clamp((target-d)/d,-.12,.12);copy.landmarks[b]={...q,x:p.x+(q.x-p.x)*scaleFactor,y:p.y+(q.y-p.y)*scaleFactor,z:p.z+(q.z-p.z)*scaleFactor};if(Math.abs(target-d)>Math.max(target*.2,.05)) repaired++;}
    return copy;});
  const score=clamp(1-violations/Math.max(frames.length*pairs.length,1),0,1);return {frames:out,report:{score,violations:[`${violations} segment violations`],repaired}};
}
