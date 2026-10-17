import { dynamicTimeWarping } from './dtwMatrix';
export type PhaseCurve={phase:string;values:number[];weight:number};
export type DmsmResult={score:number;phaseScores:Record<string,number>;distance:number};
export function comparePhaseCurves(a:PhaseCurve[],b:PhaseCurve[]):DmsmResult{
 const mapB=new Map(b.map(x=>[x.phase,x]));let weighted=0,total=0;const phaseScores:Record<string,number>={};let distance=0;
 for(const p of a){const q=mapB.get(p.phase);if(!q||!p.values.length||!q.values.length)continue;const d=dynamicTimeWarping(p.values,q.values,Math.max(p.values.length,q.values.length)/3).distance;const denom=Math.max(.001,Math.sqrt(p.values.length+q.values.length));const score=Math.max(0,1-d/denom);phaseScores[p.phase]=score;weighted+=score*p.weight;total+=p.weight;distance+=d*p.weight;}
 return {score:total?weighted/total:0,phaseScores,distance};
}
