import {PoseFrame,EventPoint} from '../../types';
import {LM} from '../../landmarks';
import {derivative,peakIndex} from '../kinematics/finiteDifference';
import {clamp,mean,std} from '../math/stats';
export interface ImpactWindow{start:number;peak:number;end:number;confidence:number;method:string;}
export function detectClubProxy(frames:PoseFrame[]){return frames.map(f=>{const a=f.landmarks[LM.leftWrist],b=f.landmarks[LM.rightWrist];return Math.hypot(a.x-b.x,a.y-b.y)+Math.abs(a.z-b.z);});}
export function impactWindow(frames:PoseFrame[]):ImpactWindow{if(frames.length<5)return{start:0,peak:0,end:Math.max(0,frames.length-1),confidence:.2,method:'insufficient'};const t=frames.map(f=>f.timestampMs),s=detectClubProxy(frames),v=derivative(s,t),a=derivative(v,t),idx=peakIndex(v.map(Math.abs));const lo=Math.max(0,idx-2),hi=Math.min(frames.length-1,idx+2);const conf=clamp(mean(frames.slice(lo,hi+1).map(f=>mean([f.landmarks[LM.leftWrist].visibility,f.landmarks[LM.rightWrist].visibility]))));return{start:lo,peak:idx,end:hi,confidence:conf,method:'club-proxy acceleration'};}
export function impactEvent(frames:PoseFrame[]):EventPoint{const w=impactWindow(frames);const f=frames[w.peak]??frames[0];return{name:'impact',frameIndex:w.peak,timestampMs:f?.timestampMs??0,confidence:w.confidence};}
