import { PoseFrame, Vec3, MotionSignal } from './types';
import { MP33, get } from './landmarks';
import { sub3, mul3, distance3, angleDeg, mean } from './math';
export function velocity(a:Vec3,b:Vec3,dtMs:number):Vec3{const dt=Math.max(dtMs/1000,1e-3);return mul3(sub3(b,a),1/dt);}
export function acceleration(a:Vec3,b:Vec3,dtMs:number):Vec3{return velocity(a,b,dtMs);}
export function pointSeries(frames:PoseFrame[],id:number):Vec3[]{const out:Vec3[]=[];for(const f of frames){const p=get(f,id);if(p)out.push({x:p.x,y:p.y,z:p.z});}return out;}
export function motionSignals(frames:PoseFrame[],id:number):MotionSignal[]{const out:MotionSignal[]=[];for(let i=0;i<frames.length;i++){const cur=get(frames[i],id);if(!cur)continue;const prev=get(frames[Math.max(0,i-1)],id)??cur;const prev2=get(frames[Math.max(0,i-2)],id)??prev;const dt=frames[i].timestampMs-frames[Math.max(0,i-1)].timestampMs;const dt2=frames[Math.max(0,i-1)].timestampMs-frames[Math.max(0,i-2)].timestampMs;const v=velocity(prev,cur,dt);const v0=velocity(prev2,prev,dt2);const a=acceleration(v0,v,dt);out.push({name:`landmark_${id}`,position:cur,velocity:v,acceleration:a,confidence:cur.confidence});}return out;}
export function segmentAngle(frames:PoseFrame[],a:number,b:number,c:number):number[]{return frames.map(f=>{const pa=get(f,a),pb=get(f,b),pc=get(f,c);return pa&&pb&&pc?angleDeg(sub3(pa,pb),sub3(pc,pb)):0;});}
export function peakVelocity(signals:MotionSignal[]):number{return signals.reduce((m,s)=>Math.max(m,Math.hypot(s.velocity.x,s.velocity.y,s.velocity.z)),0);}
export function meanAngle(values:number[]):number{return mean(values.filter(v=>Number.isFinite(v)));}

