import { PoseFrame, Reliability, QualityLabel } from './types';
import { clamp, mean, std } from './math';

export interface LandmarkConfidence { index:number; score:number; reasons:string[]; }

export function landmarkConfidence(frames:PoseFrame[]): LandmarkConfidence[] {
  if (!frames.length) return [];
  const n = frames[0].landmarks.length;
  const out:LandmarkConfidence[]=[];
  for (let i=0;i<n;i++) {
    const values=frames.map(f=>f.landmarks[i]?.visibility ?? 0);
    const v=mean(values);
    const s=1/(1+std(values));
    const score=clamp(v*s,0,1);
    const reasons:string[]=[];
    if(v<.6) reasons.push('low visibility');
    if(s<.75) reasons.push('temporal instability');
    out.push({index:i,score,reasons});
  }
  return out;
}

export function measurementReliability(frames:PoseFrame[], cameraScore=1, anatomyScore=1, temporalScore=1): Reliability {
  const lm=mean(landmarkConfidence(frames).map(x=>x.score));
  const overall=clamp(lm*cameraScore*anatomyScore*temporalScore,0,1);
  const reasons:string[]=[];
  if(cameraScore<.7) reasons.push('camera');
  if(anatomyScore<.7) reasons.push('anatomy');
  if(temporalScore<.7) reasons.push('temporal');
  return {overall,landmark:lm,camera:cameraScore,anatomy:anatomyScore,temporal:temporalScore,reasons};
}

export function qualityLabel(score:number): QualityLabel { return score>.9?'excellent':score>.75?'good':score>.45?'degraded':'insufficient'; }
