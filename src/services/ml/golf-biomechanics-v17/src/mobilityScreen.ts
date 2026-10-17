import {PoseFrame} from './types';
import {angleDeg,clamp} from './math';
import {LM} from './landmarks';
export interface MobilityScreen{thorax:number;hip:number;ankle:number;overall:number;flags:string[];}
export function screenMobility(frame:PoseFrame):MobilityScreen{
 const s=frame.landmarks[LM.leftShoulder],h=frame.landmarks[LM.leftHip],k=frame.landmarks[LM.leftKnee],a=frame.landmarks[LM.leftAnkle];
 const thorax=clamp(Math.abs(s.z-h.z)*5);const hip=clamp(Math.abs(h.x-k.x)*4);const ankle=clamp(Math.abs(k.y-a.y)*4);const flags:string[]=[];
 if(thorax<.2)flags.push('limited_thorax_rotation_proxy');
 if(hip<.2)flags.push('limited_hip_motion_proxy');
 if(ankle<.2)flags.push('limited_ankle_motion_proxy');
 return{thorax,hip,ankle,overall:.34*thorax+.33*hip+.33*ankle,flags};
}
