import { PoseFrame, FeatureValue } from './types';
import { MP33, get } from './landmarks';
import { angleDeg, sub3, distance3, mean, clamp01 } from './math';
export function angleFeature(name:string,frames:PoseFrame[],a:number,b:number,c:number,unit='deg'):FeatureValue{const vals=frames.map(f=>{const pa=get(f,a),pb=get(f,b),pc=get(f,c);return pa&&pb&&pc?angleDeg(sub3(pa,pb),sub3(pc,pb)):NaN;}).filter(Number.isFinite);return{name,value:mean(vals),unit,confidence:clamp01(vals.length/Math.max(frames.length,1)),source:'pose_geometry'};}
export function distanceFeature(name:string,frames:PoseFrame[],a:number,b:number,unit='body_scale'):FeatureValue{const vals=frames.map(f=>{const pa=get(f,a),pb=get(f,b);return pa&&pb?distance3(pa,pb):NaN;}).filter(Number.isFinite);return{name,value:mean(vals),unit,confidence:clamp01(vals.length/Math.max(frames.length,1)),source:'pose_geometry'};}
export function keyGolfFeatures(frames:PoseFrame[]):FeatureValue[]{return[
 angleFeature('lead_elbow_angle',frames,MP33.LEFT_SHOULDER,MP33.LEFT_ELBOW,MP33.LEFT_WRIST),
 angleFeature('trail_elbow_angle',frames,MP33.RIGHT_SHOULDER,MP33.RIGHT_ELBOW,MP33.RIGHT_WRIST),
 angleFeature('lead_knee_angle',frames,MP33.LEFT_HIP,MP33.LEFT_KNEE,MP33.LEFT_ANKLE),
 angleFeature('trail_knee_angle',frames,MP33.RIGHT_HIP,MP33.RIGHT_KNEE,MP33.RIGHT_ANKLE),
 angleFeature('lead_shoulder_arm_angle',frames,MP33.LEFT_HIP,MP33.LEFT_SHOULDER,MP33.LEFT_WRIST),
 angleFeature('trail_shoulder_arm_angle',frames,MP33.RIGHT_HIP,MP33.RIGHT_SHOULDER,MP33.RIGHT_WRIST),
 distanceFeature('stance_width',frames,MP33.LEFT_ANKLE,MP33.RIGHT_ANKLE),
 distanceFeature('shoulder_width',frames,MP33.LEFT_SHOULDER,MP33.RIGHT_SHOULDER),
 distanceFeature('hip_width',frames,MP33.LEFT_HIP,MP33.RIGHT_HIP),
 ];}

