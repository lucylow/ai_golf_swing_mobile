import {Vec2,angleDeg,normalize} from '../core/math';
export type LaunchEstimate={horizontalDeg:number;verticalDeg:number;confidence:number;vector:Vec2};
export function estimateLaunchVector(start:Vec2,end:Vec2,confidence:number):LaunchEstimate{const dx=end.x-start.x,dy=end.y-start.y;const m=Math.hypot(dx,dy)||1;return{horizontalDeg:Math.atan2(dx,-dy)*180/Math.PI,verticalDeg:Math.atan2(-dy,Math.abs(dx)+1e-6)*180/Math.PI,confidence,vector:{x:dx/m,y:dy/m}}}
