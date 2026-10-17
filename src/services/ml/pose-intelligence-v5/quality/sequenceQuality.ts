import { PoseFrame } from '../types/landmarks';
import { PosePipelineConfig } from '../types/config';
import { frameQuality, frameVisibilityScore, normalizedJitter, requiredLandmarkFraction } from './frameQuality';
import { clamp } from '../math/scalar';

export function buildSequenceQuality(frames: PoseFrame[], config: PosePipelineConfig): {
  score:number; usable:boolean; reasons:string[]; perLandmark:Record<string,number>; frameCoverage:number; temporalStability:number; visibilityScore:number;
} {
  if (!frames.length) return {score:0,usable:false,reasons:['No pose frames were produced'],perLandmark:{},frameCoverage:0,temporalStability:0,visibilityScore:0};
  const scores=frames.map(f=>frameQuality(f,config));
  const frameCoverage=scores.filter(s=>s>=config.minFrameQuality).length/scores.length;
  const visibilityScore=frames.reduce((s,f)=>s+frameVisibilityScore(f),0)/frames.length;
  const jitter:number[]=[];
  for(let i=1;i<frames.length;i+=1){
    const d=normalizedJitter(frames[i-1],frames[i]);
    if(d>0) jitter.push(d);
  }
  const avgJitter=jitter.length ? jitter.reduce((s,v)=>s+v,0)/jitter.length : 0;
  const temporalStability=clamp(1-(avgJitter/config.quality.maxJitterNorm),0,1);
  const requiredCoverage=frames.reduce((s,f)=>s+requiredLandmarkFraction(f,config),0)/frames.length;
  const score=clamp((frameCoverage*0.35)+(visibilityScore*0.15)+(temporalStability*0.25)+(requiredCoverage*0.25),0,1);
  const reasons:string[]=[];
  if(frameCoverage<config.quality.minFrameCoverage) reasons.push('Too many low-quality frames');
  if(visibilityScore<config.quality.minimumVisibleFraction) reasons.push('Key body landmarks are frequently occluded or missing');
  if(temporalStability<0.45) reasons.push('Pose trajectory is unstable or jittery');
  if(requiredCoverage<config.quality.minimumVisibleFraction) reasons.push('Required landmarks are not consistently visible');
  return {score,usable:score>=config.minFrameQuality,reasons,perLandmark:{},frameCoverage,temporalStability,visibilityScore};
}
