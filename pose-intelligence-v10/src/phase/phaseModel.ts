import {PoseFrame3D} from '../pose/types';
import {FramePhase,PState,P_STATES,pSystemClassify} from './pSystem';
export type PhaseFeatureFrame={timestampMs:number;frameIndex:number;features:number[]};
export interface PhaseLogitModel{infer(features:number[][]):Promise<number[][]>|number[][];}
export function featureVector(f:PoseFrame3D){const js=f.joints;const pick=(i:number)=>js[i]?.position??{x:0,y:0,z:0};const s=pick(11),s2=pick(12),h=pick(23),h2=pick(24),w=pick(15);return[s.x,s.y,s.z,s2.x,s2.y,s2.z,h.x,h.y,h.z,h2.x,h2.y,h2.z,w.x,w.y,w.z];}
export function classifySequence(frames:PoseFrame3D,model:PhaseLogitModel){return model.infer([featureVector(frames)]);}
export function logitsToPhases(frames:PoseFrame3D[],logits:number[][]){return frames.map((f,i)=>pSystemClassify(logits[i]??Array(P_STATES.length).fill(0),f.frameIndex,f.timestampMs));}
