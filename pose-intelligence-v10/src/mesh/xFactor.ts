import {Vec3,sub,angleDeg} from '../core/math';
export type XFactorPoint={timestampMs:number;hipTurnDeg:number;shoulderTurnDeg:number;xFactorDeg:number;rateDegPerSec:number};
export function xFactor(hipLeft:Vec3,hipRight:Vec3,shoulderLeft:Vec3,shoulderRight:Vec3){const h=Math.atan2(hipRight.z-hipLeft.z,hipRight.x-hipLeft.x)*180/Math.PI;const s=Math.atan2(shoulderRight.z-shoulderLeft.z,shoulderRight.x-shoulderLeft.x)*180/Math.PI;return{hip:h,shoulder:s,xFactor:s-h}}
export function xFactorSeries(points:Array<{t:number;h:number;s:number}>):XFactorPoint[]{return points.map((p,i)=>{const x=p.s-p.h;const prev=points[Math.max(i-1,0)];const dt=Math.max(p.t-prev.t,1);return{timestampMs:p.t,hipTurnDeg:p.h,shoulderTurnDeg:p.s,xFactorDeg:x,rateDegPerSec:(x-(prev.s-prev.h))/dt*1000}})}
