import { PoseFrame3D,CanonicalFrame,POSE33_INDEX } from './types';
import { Vec3,sub,normalize,cross,distance,angleDeg,clamp } from '../core/math';
function j(f:PoseFrame3D,name:keyof typeof POSE33_INDEX):Vec3{return f.joints[POSE33_INDEX[name]]?.position??{x:0,y:0,z:0}}
export function makeCanonicalFrame(f:PoseFrame3D):CanonicalFrame{
 const lh=j(f,'left_hip'),rh=j(f,'right_hip'),ls=j(f,'left_shoulder'),rs=j(f,'right_shoulder');
 const root={x:(lh.x+rh.x)/2,y:(lh.y+rh.y)/2,z:(lh.z+rh.z)/2}; const x=normalize(sub(rh,lh)); const shoulder=normalize(sub(rs,ls)); const z=normalize(cross(x,shoulder)); const y=normalize(cross(z,x)); const scale=Math.max(distance(lh,rh),distance(ls,rs),0.01);
 const local=f.joints.map(q=>{const r=sub(q.position,root);return{x:r.x*x.x+r.y*x.y+r.z*x.z,y:r.x*y.x+r.y*y.y+r.z*y.z,z:r.x*z.x+r.y*z.y+r.z*z.z}});
 return {...f,root,scale,basis:{x,y,z},localJoints:local};
}
export function pelvisTiltDeg(f:CanonicalFrame){const lh=f.localJoints[POSE33_INDEX.left_hip],rh=f.localJoints[POSE33_INDEX.right_hip];return Math.atan2((rh?.z??0)-(lh?.z??0),Math.max(f.scale,0.01))*180/Math.PI;}
export function thoraxTiltDeg(f:CanonicalFrame){const ls=f.localJoints[POSE33_INDEX.left_shoulder],rs=f.localJoints[POSE33_INDEX.right_shoulder];return Math.atan2((rs?.z??0)-(ls?.z??0),Math.max(f.scale,0.01))*180/Math.PI;}
export function turnAngleDeg(f:CanonicalFrame,left:'left_hip'|'left_shoulder',right:'right_hip'|'right_shoulder'){
 const a=f.localJoints[POSE33_INDEX[left]],b=f.localJoints[POSE33_INDEX[right]];return Math.atan2(b.z-a.z,b.x-a.x)*180/Math.PI;
}
export function xFactorDeg(f:CanonicalFrame){return turnAngleDeg(f,'left_shoulder','right_shoulder')-turnAngleDeg(f,'left_hip','right_hip');}
export function xFactorStretchDeg(a:CanonicalFrame,b:CanonicalFrame){return xFactorDeg(b)-xFactorDeg(a);}
export function confidenceFor(f:CanonicalFrame,ids:number[]){if(!ids.length)return 0;return clamp(ids.reduce((s,i)=>s+(f.joints[i]?.confidence.combined??0),0)/ids.length,0,1)}
