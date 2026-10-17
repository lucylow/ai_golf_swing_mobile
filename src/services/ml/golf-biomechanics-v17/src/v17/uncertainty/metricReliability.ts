import {BioMetric,MetricEvidence,Reliability} from '../../types';
import {clamp,mean} from '../math/stats';
export interface ReliabilityInputs{visibility:number;temporal:number;anatomy:number;camera:number;event:number;support:number;}
export function metricConfidence(i:ReliabilityInputs){return clamp(0.20*i.visibility+0.20*i.temporal+0.20*i.anatomy+0.15*i.camera+0.15*i.event+0.10*i.support);}
export function qualityFor(c:number): 'excellent'|'good'|'degraded'|'insufficient'{return c>=.9?'excellent':c>=.75?'good':c>=.5?'degraded':'insufficient';}
export function evidence(c:number,sources:string[],reasons:string[],phase?:any):MetricEvidence{return{confidence:clamp(c),quality:qualityFor(c),sources,reasons,phase};}
export function summarizeReliability(parts:number[]):Reliability{const overall=mean(parts.map(v=>clamp(v)));return{overall,landmark:overall,camera:overall,anatomy:overall,temporal:overall,phase:overall,reasons:overall>.75?[]:['one or more biomechanical signals are uncertain']};}
export function degradeForMissingEvidence(m:BioMetric,loss:number){const c=clamp(m.evidence.confidence-loss);return{...m,evidence:{...m.evidence,confidence:c,quality:qualityFor(c),reasons:[...m.evidence.reasons,'derived from uncertain upstream evidence']}};}
