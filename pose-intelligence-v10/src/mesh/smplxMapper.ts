import {MeshFrame} from '../pose/types';
export type SMPLXRaw={vertices:number[][];joints:number[][];betas:number[];bodyPose:number[];expression:number[];confidence:number;timestampMs:number};
export function mapSMPLX(r:SMPLXRaw):MeshFrame{return{timestampMs:r.timestampMs,vertices:r.vertices.map(v=>({x:v[0]??0,y:v[1]??0,z:v[2]??0})),joints:r.joints.map(v=>({x:v[0]??0,y:v[1]??0,z:v[2]??0})),shape:[...r.betas],pose:[...r.bodyPose],expression:[...r.expression],confidence:Math.max(0,Math.min(1,r.confidence)),source:'smplx'}}
