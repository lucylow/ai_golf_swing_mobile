import { GolfPoseAlgorithmV9 } from './algorithmV9';
import { PoseFrame, PosePipelineConfig, NativePoseResult } from './types';
import { defaultConfig } from './types';
import { mapNativeResult } from './nativeAdapter';
export class ProductionGolfAI {private readonly algorithm:GolfPoseAlgorithmV9;constructor(config:PosePipelineConfig=defaultConfig){this.algorithm=new GolfPoseAlgorithmV9(config);}analyzeFrames(frames:PoseFrame[]){return this.algorithm.analyze(frames);}analyzeNative(results:NativePoseResult[],runtime:'mediapipe'|'opencv'|'vision'|'mock'='mediapipe'){const frames:PoseFrame[]=results.map((r,i)=>{const p=mapNativeResult(r,runtime,0);return{timestampMs:p.timestampMs,frameIndex:i,width:r.width,height:r.height,landmarks:p.landmarks,detectionConfidence:p.detectionConfidence,trackingConfidence:p.trackingConfidence};});return this.algorithm.analyze(frames);}}

