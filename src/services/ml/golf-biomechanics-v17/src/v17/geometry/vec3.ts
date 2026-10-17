import {Point3} from '../../types';
export function add(a:Point3,b:Point3):Point3{return{x:a.x+b.x,y:a.y+b.y,z:a.z+b.z};}
export function sub(a:Point3,b:Point3):Point3{return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z};}
export function scale(a:Point3,s:number):Point3{return{x:a.x*s,y:a.y*s,z:a.z*s};}
export function dot(a:Point3,b:Point3){return a.x*b.x+a.y*b.y+a.z*b.z;}
export function cross(a:Point3,b:Point3):Point3{return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x};}
export function norm(a:Point3){return Math.hypot(a.x,a.y,a.z);}
export function normalize(a:Point3):Point3{const n=norm(a)||1;return scale(a,1/n);}
export function distance(a:Point3,b:Point3){return norm(sub(a,b));}
export function midpoint(a:Point3,b:Point3):Point3{return scale(add(a,b),0.5);}
export function angleDeg(a:Point3,b:Point3){const na=norm(a)||1,nb=norm(b)||1;const c=Math.max(-1,Math.min(1,dot(a,b)/(na*nb)));return Math.acos(c)*180/Math.PI;}
export function signedAngleDeg(a:Point3,b:Point3,axis:Point3){const c=cross(a,b);const s=Math.sign(dot(c,axis))||1;return s*angleDeg(a,b);}
export function rotateY(a:Point3,deg:number){const t=deg*Math.PI/180,c=Math.cos(t),s=Math.sin(t);return{x:a.x*c+a.z*s,y:a.y,z:-a.x*s+a.z*c};}
export function basisFrom(a:Point3,b:Point3,c:Point3){const x=normalize(sub(b,a));const z=normalize(cross(x,sub(c,a)));const y=normalize(cross(z,x));return{x,y,z};}
export function projectToPlane(p:Point3,normal:Point3){const n=normalize(normal);return sub(p,scale(n,dot(p,n)));}
