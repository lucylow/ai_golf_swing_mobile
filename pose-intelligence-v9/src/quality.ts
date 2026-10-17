import { PoseFrame, PreparedFrame } from './types';
import { REQUIRED, get } from './landmarks';
import { clamp01, distance3, mean } from './math';
export function frameQuality(frame:PoseFrame):number {
  const required=REQUIRED.map(id=>get(frame,id)).filter(Boolean);
  const visible=required.filter(l=>!!l && l.confidence>=0.45 && l.visibility>=0.4).length/(REQUIRED.length||1);
  const conf=mean(required.map(l=>l?l.confidence:0));
  return clamp01(0.7*visible+0.3*conf);
}
export function sequenceCoverage(frames:PoseFrame[]):number {
  if(frames.length<2)return 0;
  const qualities=frames.map(frameQuality);
  return clamp01(qualities.filter(q=>q>=0.55).length/qualities.length);
}
export function jitterScore(frames:PoseFrame[]):number {
  if(frames.length<3)return 1;
  const nose=frames.map(f=>get(f,0)).filter(Boolean);
  if(nose.length<3)return 1;
  const step=[]; for(let i=1;i<nose.length;i++)step.push(distance3(nose[i]!,nose[i-1]!));
  const meanStep=mean(step); const spikes=step.filter(v=>v>Math.max(meanStep*2,0.08)).length;
  return clamp01(1-spikes/Math.max(step.length,1));
}
export function assessSequence(frames:PoseFrame[],minCoverage=0.75,maxJitter=0.045){const coverage=sequenceCoverage(frames),jitter=jitterScore(frames);const score=clamp01(0.55*coverage+0.45*jitter);const reasons:string[]=[];if(coverage<minCoverage)reasons.push('insufficient_frame_coverage');if((1-jitter)>maxJitter)reasons.push('excessive_temporal_jitter');return{score,coverage,jitter,accepted:score>=0.55,reasons};}
export function qualityEnvelope(frame:PoseFrame):PreparedFrame['frameQuality'] { return frameQuality(frame); }

