import {PoseFrame,Handedness,ForceProxy} from './types';
import {LM} from './landmarks';
import {massCenterProxy,centerOfSupport} from './grf';
import {clamp} from './math';
export interface PressureMap{trail:number;lead:number;balance:number;confidence:number;}
export function estimatePressure(frame:PoseFrame,h:Handedness):PressureMap{
  const c=massCenterProxy(frame),s=centerOfSupport(frame);
  const dx=c.x-s.x;
  const leadShare=clamp(0.5+dx*3,0,1);
  return{trail:1-leadShare,lead:leadShare,balance:1-Math.min(1,Math.abs(dx)*4),confidence:.68};
}
export function pressureTimeline(frames:PoseFrame[],h:Handedness){return frames.map(f=>estimatePressure(f,h));}
