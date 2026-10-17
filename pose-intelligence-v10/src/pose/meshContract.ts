import { MeshFrame,PoseFrame3D } from './types';
export interface DenseMeshRuntime{infer(frame:PoseFrame3D):Promise<MeshFrame>|MeshFrame;dispose?():void;}
export type DenseMeshConfig={vertexCount:number;jointCount:number;shapeDim:number;poseDim:number;expressionDim:number;maxLatencyMs:number;enabled:boolean};
export const DEFAULT_MESH_CONFIG:DenseMeshConfig={vertexCount:10475,jointCount:54,shapeDim:10,poseDim:165,expressionDim:10,maxLatencyMs:80,enabled:false};
export type MeshAlignment={pelvisIndex:number;thoraxIndex:number;leftHipIndex:number;rightHipIndex:number;leftShoulderIndex:number;rightShoulderIndex:number};
export const DEFAULT_SMPLX_ALIGNMENT:MeshAlignment={pelvisIndex:0,thoraxIndex:3,leftHipIndex:1,rightHipIndex:2,leftShoulderIndex:15,rightShoulderIndex:16};
export function validateMeshFrame(frame:MeshFrame,config:DenseMeshConfig=DEFAULT_MESH_CONFIG){return frame.vertices.length===config.vertexCount&&frame.joints.length===config.jointCount&&frame.confidence>=0&&frame.confidence<=1;}
