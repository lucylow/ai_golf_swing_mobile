import {PoseFrame3D,KinematicFrame} from './pose/types';
import {makeCanonicalFrame,pelvisTiltDeg,thoraxTiltDeg,turnAngleDeg,xFactorDeg,xFactorStretchDeg} from './pose/kinematicFrames';
import {pSystemClassify,FramePhase,PState,tempoRatio} from './phase/pSystem';
import {GOLF_GRAPH} from './stgcn/graph';
import {mean,sub,normalize,distance} from './core/math';
export type V10Result={kinematics:KinematicFrame[];phaseFrames:FramePhase[];phaseTimeline:{timestampMs:number;state:PState;confidence:number}[];tempoRatio:number;xFactorPeakDeg:number;xFactorStretchPeakDeg:number;quality:number;notes:string[]};
export class GolfAIV10Engine{
 analyze(frames:PoseFrame3D[]):V10Result{
  try{return this.analyzeUnsafe(frames)}catch{return{kinematics:[],phaseFrames:[],phaseTimeline:[],tempoRatio:0,xFactorPeakDeg:0,xFactorStretchPeakDeg:0,quality:0,notes:['analysis_error','runtime_input_rejected']}}
 }
 private analyzeUnsafe(frames:PoseFrame3D[]):V10Result{
  if(!frames.length)return{kinematics:[],phaseFrames:[],phaseTimeline:[],tempoRatio:0,xFactorPeakDeg:0,xFactorStretchPeakDeg:0,quality:0,notes:['no_frames']};
  const canon=frames.map(makeCanonicalFrame);const kin:KinematicFrame[]=[];let xfPrev=0;
  for(let i=0;i<canon.length;i++){const c=canon[i],prev=canon[Math.max(0,i-1)];const xf=xFactorDeg(c),stretch=i?xf-xfPrev:0;xfPrev=xf;const lh=frames[i].joints[23]?.position??{x:0,y:0,z:0},rh=frames[i].joints[24]?.position??{x:0,y:0,z:0};const ls=frames[i].joints[11]?.position??{x:0,y:0,z:0},rs=frames[i].joints[12]?.position??{x:0,y:0,z:0};const handA=frames[i].joints[15]?.position??{x:0,y:0,z:0},handB=frames[Math.max(0,i-1)].joints[15]?.position??handA;const dt=Math.max((frames[i].timestampMs-(frames[Math.max(0,i-1)].timestampMs))/1000,0.001);kin.push({timestampMs:frames[i].timestampMs,pelvisTiltDeg:pelvisTiltDeg(c),thoraxTiltDeg:thoraxTiltDeg(c),hipTurnDeg:turnAngleDeg(c,'left_hip','right_hip'),shoulderTurnDeg:turnAngleDeg(c,'left_shoulder','right_shoulder'),xFactorDeg:xf,xFactorStretchDeg:stretch,handSpeed:distance(handA,handB)/dt,clubSpeedProxy:distance(ls,rs)/dt,confidence:Math.min(...frames[i].joints.map(j=>j.confidence.combined))});}
  const logitsTimeline=canon.map((c,i)=>{const xf=xFactorDeg(c);const t=i/Math.max(canon.length-1,1);const logits=[-((t-0.02)**2)*20,-((t-0.12)**2)*25,-((t-0.24)**2)*30,-((t-0.40)**2)*35,-((t-0.50)**2)*35,-((t-0.62)**2)*35,-((t-0.70)**2)*55,-((t-0.79)**2)*45,-((t-0.90)**2)*35,-((t-0.98)**2)*40];return pSystemClassify(logits,i,frames[i].timestampMs)});
  const address=logitsTimeline.find(x=>x.state==='P1')?.timestampMs??frames[0].timestampMs;const top=logitsTimeline.find(x=>x.state==='P4')?.timestampMs??frames[Math.floor(frames.length*0.45)].timestampMs;const impact=logitsTimeline.find(x=>x.state==='P7')?.timestampMs??frames[Math.floor(frames.length*0.68)].timestampMs;const xs=kin.map(x=>x.xFactorDeg),xss=kin.map(x=>x.xFactorStretchDeg);const quality=mean(frames.map(f=>mean(f.joints.map(j=>j.confidence.combined))));return{kinematics:kin,phaseFrames:logitsTimeline,phaseTimeline:logitsTimeline.map(x=>({timestampMs:x.timestampMs,state:x.state,confidence:x.confidence})),tempoRatio:tempoRatio(address,top,impact),xFactorPeakDeg:Math.max(...xs),xFactorStretchPeakDeg:Math.max(...xss),quality,notes:['V10 analysis is model-runtime agnostic. Replace the demo P1-P10 logits with trained ST-GCN/Transformer logits for production.','Dense mesh output is optional and not bundled.']};
 }
}
export const v10Engine=new GolfAIV10Engine();
export {GOLF_GRAPH};
