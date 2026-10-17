import {TimedPoint} from './impact';
import {Vec2,distance,clamp} from '../core/math';
export function pathAngle(points:TimedPoint[]){if(points.length<2)return 0;const a=points[0].p,b=points[points.length-1].p;return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI}
export function peakSpeed(points:TimedPoint[]){let peak=0;for(let i=1;i<points.length;i++){const dt=Math.max((points[i].t-points[i-1].t)/1000,1e-4);peak=Math.max(peak,distance2(points[i].p,points[i-1].p)/dt)}return peak}
function distance2(a:Vec2,b:Vec2){return Math.hypot(a.x-b.x,a.y-b.y)}
export function continuity(points:TimedPoint[]){if(points.length<3)return 0;let penalty=0;for(let i=1;i<points.length;i++){const d=Math.hypot(points[i].p.x-points[i-1].p.x,points[i].p.y-points[i-1].p.y);if(d>80)penalty+=1}return clamp(1-penalty/Math.max(points.length-1,1),0,1)}
