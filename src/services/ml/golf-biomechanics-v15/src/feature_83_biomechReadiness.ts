import { PoseFrame, Handedness, BioMetric } from './types';
import { clamp, mean, std, variance, safeDiv, deg } from './math';
import { golfSide } from './landmarks';

export const FEATURE_ID='biomechReadiness';
let featureKey:string=FEATURE_ID;
export interface BiomechreadinessResult { value:number; confidence:number; quality:'excellent'|'good'|'degraded'|'insufficient'; evidence:string[]; }

const mid=(a:any,b:any)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2,z:(a.z+b.z)/2});
const d=(a:any,b:any)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const angle=(a:any,b:any,c:any)=>{const u={x:a.x-b.x,y:a.y-b.y,z:a.z-b.z},v={x:c.x-b.x,y:c.y-b.y,z:c.z-b.z};const nu=d(u,{x:0,y:0,z:0}),nv=d(v,{x:0,y:0,z:0});return deg(Math.acos(clamp(safeDiv(u.x*v.x+u.y*v.y+u.z*v.z,nu*nv,1),-1,1)));};
const val=(frames:PoseFrame[],handedness:Handedness)=>{
  if(!frames.length)return 0;
  const side=golfSide(handedness);
  const lead=side.lead==='left'?15:16;
  const trailHip=side.trail==='left'?23:24;
  const leadHip=side.lead==='left'?23:24;
  const trailKnee=side.trail==='left'?25:26;
  const leadKnee=side.lead==='left'?25:26;
  const trailAnkle=side.trail==='left'?27:28;
  const leadAnkle=side.lead==='left'?27:28;
  const xs=frames.map((f,i)=>{
    switch(featureKey){
      case 'pelvisTiltDynamic': return angle(f.landmarks[23],mid(f.landmarks[23],f.landmarks[24]),f.landmarks[24]);
      case 'thoraxSideBend': return angle(f.landmarks[11],mid(f.landmarks[11],f.landmarks[12]),f.landmarks[12]);
      case 'thoraxDepth': return d(mid(f.landmarks[11],f.landmarks[12]),mid(f.landmarks[23],f.landmarks[24]));
      case 'scapularTurnProxy': return Math.abs(f.landmarks[11].z-f.landmarks[12].z);
      case 'ankleStability': return 1/(1+d(f.landmarks[trailAnkle],f.landmarks[trailAnkle]));
      case 'kneeAlignment': return d(f.landmarks[leadKnee],f.landmarks[leadAnkle]);
      case 'leadKneeVelocity': return i?d(f.landmarks[leadKnee],frames[i-1].landmarks[leadKnee]):0;
      case 'trailKneeVelocity': return i?d(f.landmarks[trailKnee],frames[i-1].landmarks[trailKnee]):0;
      case 'pelvisVerticalMotion': return mid(f.landmarks[23],f.landmarks[24]).y;
      case 'centerOfMassVertical': return (f.landmarks[23].y+f.landmarks[24].y+f.landmarks[25].y+f.landmarks[26].y)/4;
      case 'brakingImpulseProxy': return i?Math.abs((mid(f.landmarks[23],f.landmarks[24]).x-mid(frames[i-1].landmarks[23],frames[i-1].landmarks[24]).x)):0;
      case 'rotationalVelocity': return i?Math.abs(f.landmarks[11].z-f.landmarks[12].z-(frames[i-1].landmarks[11].z-frames[i-1].landmarks[12].z)):0;
      case 'rotationalDeceleration': return i>1?Math.abs((f.landmarks[11].z-f.landmarks[12].z)-(2*(frames[i-1].landmarks[11].z-frames[i-1].landmarks[12].z))+(frames[i-2].landmarks[11].z-frames[i-2].landmarks[12].z)):0;
      case 'sequenceSmoothness': return i?1/(1+d(f.landmarks[lead],frames[i-1].landmarks[lead])):1;
      case 'transitionJerk': return i>2?Math.abs((f.landmarks[lead].x-3*frames[i-1].landmarks[lead].x+3*frames[i-2].landmarks[lead].x-frames[i-3].landmarks[lead].x)):0;
      case 'impactPosture': return 1/(1+angle(f.landmarks[leadKnee],f.landmarks[leadAnkle],mid(f.landmarks[23],f.landmarks[24])));
      case 'finishStabilization': return 1/(1+std(frames.slice(Math.floor(frames.length*.85)).map(ff=>bodyX(ff))));
      case 'gripStability': return i?1/(1+d(f.landmarks[lead],frames[i-1].landmarks[lead])):1;
      case 'wristRadialUlnar': return angle(f.landmarks[lead],f.landmarks[lead],f.landmarks[lead]);
      case 'forearmRotationProxy': return Math.abs(f.landmarks[lead].z-f.landmarks[leadKnee].z);
      case 'shoulderToHipTiming': return i?Math.abs((f.landmarks[11].z-f.landmarks[12].z)-(frames[i-1].landmarks[11].z-frames[i-1].landmarks[12].z)):0;
      case 'hipToKneeTiming': return i?Math.abs((f.landmarks[leadHip].x-frames[i-1].landmarks[leadHip].x)-(f.landmarks[leadKnee].x-frames[i-1].landmarks[leadKnee].x)):0;
      case 'kneeToAnkleTiming': return i?Math.abs((f.landmarks[leadKnee].x-frames[i-1].landmarks[leadKnee].x)-(f.landmarks[leadAnkle].x-frames[i-1].landmarks[leadAnkle].x)):0;
      case 'biomechReadiness': return mean(f.landmarks.map(l=>l.visibility??0));
      default:return 0;
    }
  });
  return mean(xs);
};
const bodyX=(f:PoseFrame)=>mid(f.landmarks[23],f.landmarks[24]).x;

export function calculateBiomechreadiness(frames:PoseFrame[],handedness:Handedness):number{return val(frames,handedness);}
export function confidenceBiomechreadiness(frames:PoseFrame[]):number{const v=frames.flatMap(f=>f.landmarks.map(l=>l.visibility??0));return clamp(mean(v)/(1+std(v)),0,1);}
export function metricBiomechreadiness(frames:PoseFrame[],handedness:Handedness,phase='full'):BioMetric{const value=calculateBiomechreadiness(frames,handedness),confidence=confidenceBiomechreadiness(frames);return {name:FEATURE_ID,value,unit:'normalized',evidence:{sources:['pose',FEATURE_ID],confidence,quality:confidence>.85?'excellent':confidence>.7?'good':confidence>.45?'degraded':'insufficient',reasons:[],phase}};}
export const BIOMECHREADINESS={calculate:calculateBiomechreadiness,confidence:confidenceBiomechreadiness,metric:metricBiomechreadiness};
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
// pure deterministic feature
// confidence should propagate
// phase context is important
// use repeated swings for validation
// camera canonicalization should happen upstream
