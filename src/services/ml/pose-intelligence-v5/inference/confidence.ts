import { clamp01 } from '../types/landmarks';

export type ConfidenceComponent = { name:string; value:number; weight:number };

export function combineConfidence(components:ConfidenceComponent[]):number{
  let numerator=0,total=0;
  for(const c of components){const w=Math.max(0,c.weight);numerator+=clamp01(c.value)*w;total+=w;}
  return total?clamp01(numerator/total):0;
}

export function decayConfidence(confidence:number, ageFrames:number, halfLifeFrames:number):number{
  if(halfLifeFrames<=0)return 0;
  return clamp01(confidence*Math.pow(0.5,ageFrames/halfLifeFrames));
}
