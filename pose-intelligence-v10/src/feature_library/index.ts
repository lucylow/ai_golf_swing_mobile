export const V10_FEATURE_DOMAINS=['pose_geometry','temporal','stgcn','attention','club_ball','quality','data','strategy','progression'] as const;
export function featureId(domain:string,name:string,variant:number){return `v10.feature_library.${domain}.${name}.v${variant}`;}
export function clampFeatureConfidence(value:number){return Math.max(0,Math.min(1,value));}
