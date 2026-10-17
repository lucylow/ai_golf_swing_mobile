import { HandPoint, Landmark3D } from '../types';
import { weightedMean, distance, clamp } from '../math';

export interface FusedHand { id:string; p:{x:number;y:number;z:number}; confidence:number; source:'pose'|'hand'|'fused'; }

export function fusePoseAndHands(wrist:Landmark3D, handPoints:HandPoint[], handCenterId:string):FusedHand {
  const target=handPoints.find(p=>p.id===handCenterId);
  if(!target) return {id:wrist.id,p:{...wrist.p},confidence:wrist.visibility,source:'pose'};
  const wPose=clamp(wrist.visibility,0,1),wHand=clamp(target.score,0,1);
  const x=weightedMean([[wrist.p.x,wPose],[target.p.x,wHand]]);
  const y=weightedMean([[wrist.p.y,wPose],[target.p.y,wHand]]);
  const z=weightedMean([[wrist.p.z,wPose],[target.p.z,wHand]]);
  const agreement=1-clamp(distance(wrist.p,target.p)/0.25,0,1);
  const confidence=clamp((wPose+wHand)/2*0.75+agreement*0.25,0,1);
  return {id:wrist.id,p:{x,y,z},confidence,source:'fused'};
}
