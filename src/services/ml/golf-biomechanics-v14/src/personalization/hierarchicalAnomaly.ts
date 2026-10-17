import { Anomaly } from '../types';
import { clamp } from '../math';

export interface PhaseAnomalyInput { phase:string; component:string; score:number; confidence:number; evidence:string[]; }

export function rankHierarchicalAnomalies(items:PhaseAnomalyInput[], topN=8):Anomaly[]{
  return [...items]
    .map((x,i)=>({id:`v14-anomaly-${i}`,...x,score:clamp(x.score,0,1),confidence:clamp(x.confidence,0,1)}))
    .sort((a,b)=>b.score*b.confidence-a.score*a.confidence)
    .slice(0,topN);
}
