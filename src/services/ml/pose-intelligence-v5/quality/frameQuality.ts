import { PoseFrame, PoseLandmarkId, landmarkConfidence, clamp01 } from '../types/landmarks';
import { PosePipelineConfig } from '../types/config';
import { median } from '../math/scalar';
import { distance2 } from '../math/vector';

function normalizedCoverage(lm: PoseFrame['landmarks']): number {
  return lm.filter((x)=>landmarkConfidence(x)>=0.45).length / Math.max(1,lm.length);
}

export function frameQuality(frame: PoseFrame, config: PosePipelineConfig): number {
  const required = config.quality.requiredLandmarks;
  const requiredScores = required.map((id)=>{
    const lm=frame.landmarks[id]; return lm ? landmarkConfidence(lm) : 0;
  });
  const requiredMean = requiredScores.reduce((s,v)=>s+v,0)/Math.max(1,requiredScores.length);
  const coverage = normalizedCoverage(frame.landmarks);
  const detector = frame.detectionConfidence ?? requiredMean;
  const tracker = frame.trackingConfidence ?? requiredMean;
  return clamp01((requiredMean*0.45)+(coverage*0.25)+(detector*0.15)+(tracker*0.15));
}

export function frameVisibilityScore(frame: PoseFrame): number {
  return median(frame.landmarks.map((lm)=>clamp01(lm.visibility)));
}

export function requiredLandmarkFraction(frame: PoseFrame, config: PosePipelineConfig): number {
  const ok = config.quality.requiredLandmarks.filter((id)=>{
    const lm = frame.landmarks[id]; return !!lm && landmarkConfidence(lm) >= config.minLandmarkConfidence;
  });
  return ok.length / Math.max(1, config.quality.requiredLandmarks.length);
}

export function normalizedJitter(a: PoseFrame, b: PoseFrame): number {
  const important:[number,number][] = [
    [PoseLandmarkId.LeftShoulder,PoseLandmarkId.RightShoulder],
    [PoseLandmarkId.LeftHip,PoseLandmarkId.RightHip],
    [PoseLandmarkId.LeftWrist,PoseLandmarkId.RightWrist],
  ];
  const distances:number[]=[];
  for(const [l,r] of important){
    const p1=a.landmarks[l],p2=a.landmarks[r]; if(p1&&p2) distances.push(distance2({x:p1.x,y:p1.y},{x:p2.x,y:p2.y}));
  }
  if(!distances.length) return 1;
  return distances.reduce((s,v)=>s+v,0)/distances.length;
}
