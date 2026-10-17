import {PoseFrame} from './types';
import {LM} from './landmarks';
import {hipCenter,shoulderCenter} from './temporal';
import {std,clamp} from './math';
export function pointStd(frames:PoseFrame[],getter:(f:PoseFrame)=>number){return std(frames.map(getter));}
export function headStability(frames:PoseFrame[]){if(!frames.length)return 0;return clamp(1-meanAbsDiff(frames.map(f=>f.landmarks[LM.nose]?.x??0))*4)}
function meanAbsDiff(a:number[]){if(a.length<2)return 0;let s=0;for(let i=1;i<a.length;i++)s+=Math.abs(a[i]-a[i-1]);return s/(a.length-1);}
export function pelvisStability(frames:PoseFrame[]){const xs=frames.map(f=>hipCenter(f).x);return clamp(1-std(xs)*3)}
export function thoraxStability(frames:PoseFrame[]){const xs=frames.map(f=>shoulderCenter(f).x);return clamp(1-std(xs)*2)}
export function balanceIndex(frames:PoseFrame[]){if(!frames.length)return 0;const head=headStability(frames),pelvis=pelvisStability(frames);return clamp(.55*head+.45*pelvis)}
