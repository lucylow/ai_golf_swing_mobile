export type HMRInput={width:number;height:number;rgb:Uint8Array;timestampMs:number;cameraFovDeg?:number};
export type HMROutput={pose:number[];shape:number[];camera:{scale:number;tx:number;ty:number};confidence:number;latencyMs:number};
export interface HMRRuntime{infer(input:HMRInput):Promise<HMROutput>|HMROutput;dispose?():void;}
export type HMRConfig={imageSize:number;poseDim:number;shapeDim:number;iterations:number;maxLatencyMs:number;enabled:boolean};
export const DEFAULT_HMR_CONFIG:HMRConfig={imageSize:256,poseDim:165,shapeDim:10,iterations:3,maxLatencyMs:120,enabled:false};
export function validateHMROutput(o:HMROutput,cfg=DEFAULT_HMR_CONFIG){return o.pose.length===cfg.poseDim&&o.shape.length===cfg.shapeDim&&Number.isFinite(o.camera.scale)&&o.confidence>=0&&o.confidence<=1;}
