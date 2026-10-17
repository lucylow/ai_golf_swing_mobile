import {PoseFrame} from '../../types';
import {LM} from '../../landmarks';
import {clamp,mean,std} from '../math/stats';
export interface Readiness{score:number;ready:boolean;reasons:string[];}
export function assessReadiness(frames:PoseFrame[]):Readiness{if(!frames.length)return{score:0,ready:false,reasons:['no frames']};const vis=mean(frames.map(f=>mean([f.landmarks[LM.leftShoulder].visibility,f.landmarks[LM.rightShoulder].visibility,f.landmarks[LM.leftHip].visibility,f.landmarks[LM.rightHip].visibility])));const jitter=mean(frames.slice(1).map((f,i)=>Math.abs(f.landmarks[LM.leftHip].x-frames[i].landmarks[LM.leftHip].x)));const score=clamp(.7*vis+.3*(1-clamp(jitter*4)));const reasons:string[]=[];if(vis<.7)reasons.push('pose visibility low');if(jitter>.15)reasons.push('camera or tracking jitter');return{score,ready:score>.75,reasons};}
