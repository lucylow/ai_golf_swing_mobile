import {PoseFrame,Handedness} from './types';
import {LM} from './landmarks';
import {dist} from './vector3';
import {mean} from './math';
export interface EnergyProxy{lower:number;upper:number;transfer:number;confidence:number;}
export function estimateEnergy(frames:PoseFrame[],h:Handedness):EnergyProxy{
  if(frames.length<3)return{lower:0,upper:0,transfer:0,confidence:.3};
  const hip=h==='right'?LM.rightHip:LM.leftHip;
  const shoulder=h==='right'?LM.rightShoulder:LM.leftShoulder;
  const wrist=h==='right'?LM.rightWrist:LM.leftWrist;
  const lower=mean(frames.slice(1).map((f,i)=>dist(f.landmarks[hip],frames[i].landmarks[hip])));
  const upper=mean(frames.slice(1).map((f,i)=>dist(f.landmarks[shoulder],frames[i].landmarks[shoulder])));
  const transfer=mean(frames.slice(1).map((f,i)=>dist(f.landmarks[wrist],frames[i].landmarks[wrist])));
  return{lower,upper,transfer,confidence:.72};
}
