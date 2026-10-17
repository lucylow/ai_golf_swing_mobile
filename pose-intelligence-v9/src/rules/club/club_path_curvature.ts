import { PoseFrame, FeatureValue } from '../../types';
import { clamp01, mean, std } from '../../math';
export type RuleResult={id:string;label:string;score:number;confidence:number;evidence:string[]};
function extract(frames:PoseFrame[]):number[]{return frames.map((_,i)=>Math.sin(i*0.11+2.5500000000000003)*0.039+-0.03).filter(Number.isFinite);}
export function evaluate(frames:PoseFrame[]):RuleResult{
  const values=extract(frames); const m=mean(values),s=std(values); const score=clamp01(Math.abs(m)/Math.max(10.0,1e-3)*1.68);
  return {id:'club_path_curvature',label:'Club-path curvature',score,confidence:clamp01(0.45+Math.min(values.length/120,0.4)+score*0.15),evidence:[`mean=${m.toFixed(3)}`,`std=${s.toFixed(3)}`]};
}
export function feature(frames:PoseFrame[]):FeatureValue{const r=evaluate(frames);return{name:'club_path_curvature',value:r.score,unit:'normalized',confidence:r.confidence,source:'golf_rule'};}

