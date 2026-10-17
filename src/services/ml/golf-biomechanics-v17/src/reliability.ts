import {PoseFrame,BioMetric,MetricEvidence,Reliability} from './types';
import {overallReliability,qualityLabel} from './quality';
export function evidence(reliability:number,sources:string[],reasons:string[]=[],phase?:any):MetricEvidence{return{confidence:reliability,quality:qualityLabel(reliability),sources,reasons,phase};}
export function attachMetric(name:string,value:number,unit:string,reliability:Reliability,sources:string[],phase?:any):BioMetric{return{name,value,unit,evidence:evidence(reliability.overall,sources,reliability.reasons,phase)}}
export function reliabilityFor(frames:PoseFrame[],cameraScore:number,phaseScore:number){return overallReliability(frames,cameraScore,phaseScore)}
