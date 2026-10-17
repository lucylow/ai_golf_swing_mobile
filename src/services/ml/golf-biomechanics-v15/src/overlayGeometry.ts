import { PoseFrame, Point3 } from './types';
import { golfSide } from './landmarks';

export interface OverlayLine { a:Point3; b:Point3; color:'good'|'warning'|'critical'; label:string; alpha:number; }

export function xFactorOverlay(frame:PoseFrame,handedness:'left'|'right',severity:'low'|'moderate'|'high'|'critical'):OverlayLine[]{
  const shoulderA=frame.landmarks[11],shoulderB=frame.landmarks[12],hipA=frame.landmarks[23],hipB=frame.landmarks[24];
  const color=severity==='critical'?'critical':severity==='high'?'warning':'good';
  return [{a:shoulderA,b:shoulderB,color,label:'shoulder line',alpha:.9},{a:hipA,b:hipB,color:'good',label:'hip line',alpha:.9},{a:shoulderA,b:hipA,color,label:'separation',alpha:.65}];
}

export function trailFootBoundary(frame:PoseFrame,handedness:'left'|'right'):OverlayLine[]{
  const side=golfSide(handedness).trail; const heel=frame.landmarks[side==='left'?29:30]; const hip=frame.landmarks[side==='left'?23:24]; return [{a:heel,b:{x:heel.x,y:heel.y-.35,z:heel.z},color:Math.abs(hip.x-heel.x)>.15?'critical':'good',label:'trail-foot boundary',alpha:.85}];
}
