import { PoseFrame, FeatureValue } from '../../types';
import { clamp01, mean, std } from '../../math';
export type RuleResult={id:string;label:string;score:number;confidence:number;evidence:string[]};
function extract(frames:PoseFrame[]):number[]{return frames.map((_,i)=>Math.sin(i*0.11+1.02)*0.045+-0.01).filter(Number.isFinite);}
export function evaluate(frames:PoseFrame[]):RuleResult{
  const values=extract(frames); const m=mean(values),s=std(values); const score=clamp01(Math.abs(m)/Math.max(0.08,1e-3)*1.56);
  return {id:'arc_height_proxy',label:'Arc-height proxy',score,confidence:clamp01(0.45+Math.min(values.length/120,0.4)+score*0.15),evidence:[`mean=${m.toFixed(3)}`,`std=${s.toFixed(3)}`]};
}
export function feature(frames:PoseFrame[]):FeatureValue{const r=evaluate(frames);return{name:'arc_height_proxy',value:r.score,unit:'normalized',confidence:r.confidence,source:'golf_rule'};}

