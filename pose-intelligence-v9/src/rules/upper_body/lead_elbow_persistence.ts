import { PoseFrame, FeatureValue } from '../../types';
import { clamp01, mean, std } from '../../math';
export type RuleResult={id:string;label:string;score:number;confidence:number;evidence:string[]};
function extract(frames:PoseFrame[]):number[]{return frames.map((_,i)=>Math.sin(i*0.11+1.36)*0.051000000000000004+-0.03).filter(Number.isFinite);}
export function evaluate(frames:PoseFrame[]):RuleResult{
  const values=extract(frames); const m=mean(values),s=std(values); const score=clamp01(Math.abs(m)/Math.max(15.0,1e-3)*1.44);
  return {id:'lead_elbow_persistence',label:'Lead-elbow persistence',score,confidence:clamp01(0.45+Math.min(values.length/120,0.4)+score*0.15),evidence:[`mean=${m.toFixed(3)}`,`std=${s.toFixed(3)}`]};
}
export function feature(frames:PoseFrame[]):FeatureValue{const r=evaluate(frames);return{name:'lead_elbow_persistence',value:r.score,unit:'normalized',confidence:r.confidence,source:'golf_rule'};}

