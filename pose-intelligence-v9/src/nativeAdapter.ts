import { InferencePacket, Landmark, NativePoseResult, PoseRuntime } from './types';
import { combineConfidence } from './confidence';
export function mapNativeResult(result:NativePoseResult,runtime:PoseRuntime,latencyMs:number):InferencePacket{const landmarks:Landmark[]=result.landmarks.map((p,i)=>({id:i,x:p.x,y:p.y,z:p.z,visibility:p.visibility??p.score??1,confidence:combineConfidence(p.score??1,p.visibility??1,p.presence??1),presence:p.presence}));return{runtime,timestampMs:result.timestampMs,landmarks,latencyMs,detectionConfidence:landmarks.reduce((a,b)=>a+b.confidence,0)/Math.max(1,landmarks.length),trackingConfidence:landmarks.reduce((a,b)=>a+b.visibility,0)/Math.max(1,landmarks.length)};}

