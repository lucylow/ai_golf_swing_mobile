import { QualityReport } from '../types/model';

export type QualityDecision = { accept:boolean; reason:string; confidence:number };

export function qualityGate(report:QualityReport, minimum=0.55):QualityDecision{
  if(!report.usable)return {accept:false,reason:report.reasons[0]??'Pose quality below threshold',confidence:report.score};
  if(report.score<minimum)return {accept:false,reason:'Sequence confidence is below the configured analysis threshold',confidence:report.score};
  return {accept:true,reason:'Pose sequence passed quality checks',confidence:report.score};
}
