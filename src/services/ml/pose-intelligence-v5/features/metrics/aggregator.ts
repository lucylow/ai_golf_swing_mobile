import { PoseFrame, PoseLandmarkId } from '../../types/landmarks';
import { Metric } from '../../types/model';
import { hipTurn, shoulderTurn, torsoLean, kneeAngle, elbowAngle } from '../../geometry/angles';
import { point3 } from '../../geometry/joints';
import { mean, median, safeDivide, standardDeviation } from '../../math/scalar';
import { sequenceSpeed } from '../kinematics';
import { SwingFeatureContext } from './types';

function average(values:number[]):number{return values.length?mean(values):0;}

export function buildMetricContext(frames:PoseFrame[], confidence:number):SwingFeatureContext {
  const hipValues=frames.map(hipTurn).filter(v=>Number.isFinite(v));
  const shoulderValues=frames.map(shoulderTurn).filter(v=>Number.isFinite(v));
  const spineValues=frames.map(torsoLean).filter(v=>Number.isFinite(v));
  const leftKnee=frames.map(f=>kneeAngle(f,'left')).filter(v=>v>0);
  const rightKnee=frames.map(f=>kneeAngle(f,'right')).filter(v=>v>0);
  const leftElbow=frames.map(f=>elbowAngle(f,'left')).filter(v=>v>0);
  const rightElbow=frames.map(f=>elbowAngle(f,'right')).filter(v=>v>0);
  const wrists=sequenceSpeed(frames,PoseLandmarkId.LeftWrist).concat(sequenceSpeed(frames,PoseLandmarkId.RightWrist));
  const arm=sequenceSpeed(frames,PoseLandmarkId.LeftElbow).concat(sequenceSpeed(frames,PoseLandmarkId.RightElbow));
  const head=frames.map(f=>point3(f,PoseLandmarkId.Nose)?.y ?? NaN).filter(Number.isFinite);
  const hips=frames.map(f=>{
    const l=point3(f,PoseLandmarkId.LeftHip); const r=point3(f,PoseLandmarkId.RightHip); return l&&r?(l.y+r.y)/2:NaN;
  }).filter(Number.isFinite);
  const shoulders=frames.map(f=>{
    const l=point3(f,PoseLandmarkId.LeftShoulder); const r=point3(f,PoseLandmarkId.RightShoulder); return l&&r?(l.y+r.y)/2:NaN;
  }).filter(Number.isFinite);
  const values:Record<string,number>={
    hipRotation: median(hipValues), shoulderRotation: median(shoulderValues), spineAngle: median(spineValues),
    leadKneeFlex: median(leftKnee), trailKneeFlex: median(rightKnee), leadElbowFlex: median(leftElbow), trailElbowFlex: median(rightElbow),
    handHeight: mean(frames.map(f=>{const l=point3(f,PoseLandmarkId.LeftWrist);const r=point3(f,PoseLandmarkId.RightWrist);return l&&r?(l.y+r.y)/2:0;})),
    headMovement: standardDeviation(head), hipSway: standardDeviation(hips), shoulderSway: standardDeviation(shoulders),
    armSpeed: average(arm), handSpeed: average(wrists), tempo: estimateTempo(frames),
  };
  const metricConfidence:Record<string,number>={};
  Object.keys(values).forEach(k=>metricConfidence[k]=confidence);
  return {frames,sequenceConfidence:confidence,metricValues:values,metricConfidence};
}

function estimateTempo(frames:PoseFrame[]):number {
  if(frames.length<3) return 0;
  const start=frames[0].timestampMs; const end=frames[frames.length-1].timestampMs;
  const duration=Math.max(1,end-start);
  const half=duration/2;
  const top=frames.findIndex(f=>f.timestampMs-start>=half);
  const backswing=Math.max(1,(frames[top<0?Math.floor(frames.length/2):top]?.timestampMs ?? start)-start);
  const downswing=Math.max(1,end-(frames[top<0?Math.floor(frames.length/2):top]?.timestampMs ?? start));
  return safeDivide(backswing,downswing,0);
}

export function computeMetrics(ctx:SwingFeatureContext):Metric[]{
  return [
    {key:'hipRotation',value:ctx.metricValues.hipRotation,unit:'deg',confidence:ctx.metricConfidence.hipRotation,source:'derived'},
    {key:'shoulderRotation',value:ctx.metricValues.shoulderRotation,unit:'deg',confidence:ctx.metricConfidence.shoulderRotation,source:'derived'},
    {key:'spineAngle',value:ctx.metricValues.spineAngle,unit:'deg',confidence:ctx.metricConfidence.spineAngle,source:'pose'},
    {key:'leadKneeFlex',value:ctx.metricValues.leadKneeFlex,unit:'deg',confidence:ctx.metricConfidence.leadKneeFlex,source:'pose'},
    {key:'trailKneeFlex',value:ctx.metricValues.trailKneeFlex,unit:'deg',confidence:ctx.metricConfidence.trailKneeFlex,source:'pose'},
    {key:'leadElbowFlex',value:ctx.metricValues.leadElbowFlex,unit:'deg',confidence:ctx.metricConfidence.leadElbowFlex,source:'pose'},
    {key:'trailElbowFlex',value:ctx.metricValues.trailElbowFlex,unit:'deg',confidence:ctx.metricConfidence.trailElbowFlex,source:'pose'},
    {key:'handHeight',value:ctx.metricValues.handHeight,unit:'norm',confidence:ctx.metricConfidence.handHeight,source:'pose'},
    {key:'headMovement',value:ctx.metricValues.headMovement,unit:'norm',confidence:ctx.metricConfidence.headMovement,source:'temporal'},
    {key:'hipSway',value:ctx.metricValues.hipSway,unit:'norm',confidence:ctx.metricConfidence.hipSway,source:'temporal'},
    {key:'shoulderSway',value:ctx.metricValues.shoulderSway,unit:'norm',confidence:ctx.metricConfidence.shoulderSway,source:'temporal'},
    {key:'armSpeed',value:ctx.metricValues.armSpeed,unit:'norm/s',confidence:ctx.metricConfidence.armSpeed,source:'temporal'},
    {key:'handSpeed',value:ctx.metricValues.handSpeed,unit:'norm/s',confidence:ctx.metricConfidence.handSpeed,source:'temporal'},
    {key:'tempo',value:ctx.metricValues.tempo,unit:'ratio',confidence:ctx.metricConfidence.tempo,source:'temporal'},
  ];
}
