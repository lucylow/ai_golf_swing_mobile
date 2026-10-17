export type ReplayManifest={id:string;createdAt:string;deviceModel:string;osVersion:string;cameraFormat:{width:number;height:number;fps:number};runtime:string;modelVersion:string;frameCount:number;notes:string[]};
export function validateReplay(m:ReplayManifest){return Boolean(m.id&&m.createdAt&&m.frameCount>0&&m.cameraFormat.fps>0)}
