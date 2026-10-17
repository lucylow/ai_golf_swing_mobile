import {PoseFrame} from '../../types';
import {mean} from '../math/stats';
export interface TemporalFeature{fast:number[];medium:number[];long:number[];}
function windowed(a:number[],n:number){if(!a.length)return[];const out:number[]=[];for(let i=0;i<a.length;i+=Math.max(1,n)){out.push(mean(a.slice(Math.max(0,i-n),Math.min(a.length,i+n+1))));}return out;}
export function buildMultiResolution(frames:PoseFrame[]):TemporalFeature{const xs=frames.map(f=>f.landmarks[0]?.x??0);return{fast:windowed(xs,2),medium:windowed(xs,6),long:windowed(xs,15)};}
