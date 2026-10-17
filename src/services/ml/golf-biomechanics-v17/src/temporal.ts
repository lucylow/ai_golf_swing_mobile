import {PoseFrame,FeatureSeries} from './types';
import {LM} from './landmarks';
import {mean,smooth3,clamp} from './math';
export function timestamps(frames:PoseFrame[]){return frames.map(f=>f.timestampMs)}
export function hipCenter(frame:PoseFrame){const a=frame.landmarks[LM.leftHip],b=frame.landmarks[LM.rightHip];return{ x:(a.x+b.x)/2,y:(a.y+b.y)/2,z:(a.z+b.z)/2};}
export function shoulderCenter(frame:PoseFrame){const a=frame.landmarks[LM.leftShoulder],b=frame.landmarks[LM.rightShoulder];return{ x:(a.x+b.x)/2,y:(a.y+b.y)/2,z:(a.z+b.z)/2};}
export function series(name:string,frames:PoseFrame[],getter:(f:PoseFrame)=>number):FeatureSeries{const raw=frames.map(getter);const sm=smooth3(raw);return{name,values:sm,timestampsMs:timestamps(frames),confidence:frames.map(f=>mean([f.landmarks[LM.leftHip]?.visibility??0,f.landmarks[LM.rightHip]?.visibility??0]))};}
export function velocity(values:number[],times:number[]){const out:number[]=[];for(let i=0;i<values.length;i++){if(i===0){out.push(0);continue;}const dt=Math.max((times[i]-times[i-1])/1000,.001);out.push((values[i]-values[i-1])/dt);}return out;}
export function acceleration(values:number[],times:number[]){return velocity(velocity(values,times),times)}
export function normalizePhase(values:number[]){const mn=Math.min(...values),mx=Math.max(...values);const d=mx-mn||1;return values.map(v=>clamp((v-mn)/d,0,1));}
export function finiteWindow(seriesValues:number[],center:number,radius:number){const lo=Math.max(0,center-radius),hi=Math.min(seriesValues.length,center+radius+1);return seriesValues.slice(lo,hi)}
