import {PoseFrame,Handedness,BioMetric,Reliability} from './types';
import {LM} from './landmarks';
import {xFactorMax,xFactorStretch} from './xFactor';
import {leadWristFlexionProxy} from './wrist';
import {headStability,pelvisStability,balanceIndex} from './stability';
import {sequenceSeries,sequenceEfficiency,timingMilliseconds} from './sequence';
import {forceSeries,loadShift,supportWidth} from './grf';
import {attachMetric} from './reliability';
import {clamp,mean,std} from './math';
import {hipCenter} from './temporal';
function hipsSway(frames:PoseFrame[]){if(!frames.length)return 0;const base=hipCenter(frames[0]).x;return Math.max(...frames.map(f=>Math.abs(hipCenter(f).x-base)));}
function tempo(frames:PoseFrame[]){if(frames.length<4)return 3;const total=frames[frames.length-1].timestampMs-frames[0].timestampMs;const mid=Math.floor(frames.length*.62);const back=frames[mid].timestampMs-frames[0].timestampMs;const down=frames[frames.length-1].timestampMs-frames[mid].timestampMs;return down<=0?3:back/down;}
function bracing(frames:PoseFrame[],h:Handedness){if(frames.length<2)return 0;const knee=h==='right'?LM.rightKnee:LM.leftKnee;const hip=h==='right'?LM.rightHip:LM.leftHip;const ankle=h==='right'?LM.rightAnkle:LM.leftAnkle;const f=frames[Math.floor(frames.length*.65)];const a=f.landmarks[hip],k=f.landmarks[knee],an=f.landmarks[ankle];const v1=[a.x-k.x,a.y-k.y,a.z-k.z],v2=[an.x-k.x,an.y-k.y,an.z-k.z];const d=v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];const n=Math.hypot(...v1)*Math.hypot(...v2)||1;return Math.acos(clamp(d/n,-1,1))*180/Math.PI;}
export function buildMetrics(frames:PoseFrame[],h:Handedness,r:Reliability):BioMetric[]{const s=sequenceSeries(frames),timing=timingMilliseconds(s),seq=sequenceEfficiency(s),force=forceSeries(frames,h);return[
attachMetric('xFactor',xFactorMax(frames,h),'deg',r,['shoulder','hip'],'P4'),
attachMetric('xFactorStretch',xFactorStretch(frames,h),'deg',r,['shoulder','hip'],'P4'),
attachMetric('trailHipSway',hipsSway(frames),'normalized',r,['hip'],'P2'),
attachMetric('leadWristFlexion',leadWristFlexionProxy(frames,h),'deg',r,['wrist','elbow'],'P2'),
attachMetric('tempoRatio',tempo(frames),'ratio',r,['phase timing'],'P4'),
attachMetric('sequenceEfficiency',seq,'normalized',r,['pelvis','thorax','arms','club'],'P5'),
attachMetric('pelvisThoraxTiming',timing.pelvisToThorax,'ms',r,['temporal sequence'],'P5'),
attachMetric('thoraxArmTiming',timing.thoraxToArms,'ms',r,['temporal sequence'],'P5'),
attachMetric('armClubTiming',timing.armsToClub,'ms',r,['temporal sequence'],'P6'),
attachMetric('pressureTransfer',clamp(loadShift(frames)*4,-1,1),'normalized',r,['center-of-support','mass-center']),
attachMetric('supportWidth',supportWidth(frames[Math.floor(frames.length/2)]),'normalized',r,['feet']),
attachMetric('leadBracing',bracing(frames,h),'deg',r,['lead knee','hip'],'P7'),
attachMetric('headStability',headStability(frames),'normalized',r,['nose']),
attachMetric('pelvisStability',pelvisStability(frames),'normalized',r,['hip']),
attachMetric('balanceIndex',balanceIndex(frames),'normalized',r,['head','pelvis']),
attachMetric('grfLateralPeak',force.reduce((m,v)=>Math.max(m,Math.abs(v.lateral)),0),'proxy',r,['mass center','support']),
attachMetric('grfVerticalPeak',force.reduce((m,v)=>Math.max(m,Math.abs(v.vertical)),0),'proxy',r,['mass center','knee']),
attachMetric('grfRotationalPeak',force.reduce((m,v)=>Math.max(m,Math.abs(v.rotational)),0),'proxy',r,['hip motion']),
attachMetric('phaseConsistency',r.phase,'normalized',r,['phase detector'])
];}
