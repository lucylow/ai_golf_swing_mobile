export type DegradedMode={enabled:boolean;reason?:string;capabilities:string[]};
export function chooseDegradedMode(modelReady:boolean,qualityReady:boolean):DegradedMode{
 if(modelReady&&qualityReady)return {enabled:false,capabilities:['live_pose','swing_metrics','phase_analysis']};
 if(modelReady&&!qualityReady)return {enabled:true,reason:'capture_quality',capabilities:['capture_guidance','retry']};
 return {enabled:true,reason:'pose_model_unavailable',capabilities:['video_capture','cloud_analysis_when_available']};
}
