import { PoseFrame } from '../../types';
import { get } from '../../landmarks';
import { clamp01, mean, std } from '../../math';

export type QualityGateResult={
  score:number;
  visibility:number;
  confidence:number;
  coverage:number;
  jitter:number;
  accepted:boolean;
  reasons:string[];
};

const IDS=[0,11,12,15,16,23,24];

export function evaluate(frames:PoseFrame[]):QualityGateResult{
  const frameScores=frames.map(frame=>{
    const points=IDS.map(id=>get(frame,id)).filter(Boolean);
    const coverage=points.length/IDS.length;
    const confidence=mean(points.map(p=>p?.confidence??0));
    return 0.6*coverage+0.4*confidence;
  });
  const score=clamp01(mean(frameScores));
  const coverage=clamp01(frameScores.filter(v=>v>0.55).length/Math.max(frameScores.length,1));
  const confidence=clamp01(mean(frameScores));
  const nose=frames.map(f=>get(f,0)?.x??0);
  const diffs=nose.slice(1).map((v,j)=>Math.abs(v-nose[j]));
  const jitter=std(diffs);
  const reasons:string[]=[];
  if(coverage<0.72) reasons.push('landmark_coverage_low');
  if(confidence<0.58) reasons.push('confidence_low');
  if(jitter>0.030) reasons.push('temporal_jitter_high');
  return{score,visibility:coverage,confidence,coverage,jitter,accepted:score>=0.55&&coverage>=0.72,reasons};
}

