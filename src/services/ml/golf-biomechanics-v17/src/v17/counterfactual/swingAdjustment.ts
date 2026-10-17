import {PoseFrame,Handedness} from '../../types';
import {clamp,mean} from '../math/stats';
import {LM} from '../../landmarks';
export interface CounterfactualScenario{parameter:string;base:number;adjusted:number;predictedEffect:number;confidence:number;limitations:string[];}
export function simulateLeadWristAdjustment(frames:PoseFrame[],handedness:Handedness,deltaDeg:number):CounterfactualScenario{const wrist=handedness==='right'?LM.leftWrist:LM.rightWrist;const base=mean(frames.map(f=>f.landmarks[wrist].x));const effect=clamp(deltaDeg/30,-1,1)*.22;return{parameter:'lead_wrist_orientation_proxy',base,adjusted:base+deltaDeg/100,predictedEffect:effect,confidence:clamp(.45+frames.length/300),limitations:['proxy simulation','not a validated launch-model prediction']};}
