import {PoseFrame} from './types';
import {dist} from './vector3';
import {LM} from './landmarks';
import {clamp} from './math';
export function shoulderSymmetry(frames:PoseFrame[]){const d=frames.map(f=>Math.abs(dist(f.landmarks[LM.leftShoulder],f.landmarks[LM.leftElbow])-dist(f.landmarks[LM.rightShoulder],f.landmarks[LM.rightElbow])));return clamp(1-(d.reduce((a,b)=>a+b,0)/Math.max(d.length,1))*2);}
export function kneeSymmetry(frames:PoseFrame[]){const d=frames.map(f=>Math.abs(dist(f.landmarks[LM.leftHip],f.landmarks[LM.leftKnee])-dist(f.landmarks[LM.rightHip],f.landmarks[LM.rightKnee])));return clamp(1-(d.reduce((a,b)=>a+b,0)/Math.max(d.length,1))*2);}
