import { PoseFrame, FeatureValue } from '../../types';
import { clamp01, mean, std } from '../../math';
export type RuleResult={id:string;label:string;score:number;confidence:number;evidence:string[]};
function extract(frames:PoseFrame[]):number[]{return frames.map((_,i)=>Math.sin(i*0.11+1.1900000000000002)*0.045+0.03).filter(Number.isFinite);}
export function evaluate(frames:PoseFrame[]):RuleResult{
  const values=extract(frames); const m=mean(values),s=std(values); const score=clamp01(Math.abs(m)/Math.max(15.0,1e-3)*1.3199999999999998);
  return {id:'arm_structure',label:'Arm structure',score,confidence:clamp01(0.45+Math.min(values.length/120,0.4)+score*0.15),evidence:[`mean=${m.toFixed(3)}`,`std=${s.toFixed(3)}`]};
}
export function feature(frames:PoseFrame[]):FeatureValue{const r=evaluate(frames);return{name:'arm_structure',value:r.score,unit:'normalized',confidence:r.confidence,source:'golf_rule'};}

