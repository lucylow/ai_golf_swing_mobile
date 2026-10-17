import { Vec3, Quat } from "./types";

export const clamp = (v:number, lo:number, hi:number) => Math.max(lo, Math.min(hi, v));
export const lerp = (a:number,b:number,t:number) => a + (b-a)*t;
export const add = (a:Vec3,b:Vec3):Vec3 => ({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z});
export const sub = (a:Vec3,b:Vec3):Vec3 => ({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
export const mul = (a:Vec3,s:number):Vec3 => ({x:a.x*s,y:a.y*s,z:a.z*s});
export const dot = (a:Vec3,b:Vec3) => a.x*b.x+a.y*b.y+a.z*b.z;
export const cross = (a:Vec3,b:Vec3):Vec3 => ({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
export const norm = (a:Vec3) => Math.hypot(a.x,a.y,a.z);
export const normalize = (a:Vec3):Vec3 => { const n=norm(a); return n<1e-9?{x:0,y:0,z:0}:mul(a,1/n); };
export const distance = (a:Vec3,b:Vec3) => norm(sub(a,b));
export const angleDeg = (a:Vec3,b:Vec3) => Math.acos(clamp(dot(normalize(a),normalize(b)),-1,1))*180/Math.PI;
export const signedAngleDeg = (a:Vec3,b:Vec3,axis:Vec3) => {
  const c=cross(a,b); const unsigned=angleDeg(a,b); return (dot(c,normalize(axis))>=0?1:-1)*unsigned;
};
export const meanVec = (xs:Vec3[]):Vec3 => xs.length?mul(xs.reduce(add,{x:0,y:0,z:0}),1/xs.length):{x:0,y:0,z:0};
export const median=(xs:number[])=>{if(!xs.length)return 0;const a=[...xs].sort((x,y)=>x-y);const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2};
export const variance=(xs:number[])=>{if(xs.length<2)return 0;const m=xs.reduce((a,b)=>a+b,0)/xs.length;return xs.reduce((s,x)=>s+(x-m)**2,0)/(xs.length-1)};
export const quatIdentity=():Quat=>({x:0,y:0,z:0,w:1});
export const quatMultiply=(a:Quat,b:Quat):Quat=>({
 x:a.w*b.x+a.x*b.w+a.y*b.z-a.z*b.y,
 y:a.w*b.y-a.x*b.z+a.y*b.w+a.z*b.x,
 z:a.w*b.z+a.x*b.y-a.y*b.x+a.z*b.w,
 w:a.w*b.w-a.x*b.x-a.y*b.y-a.z*b.z,
});
export const rotateByAxis=(p:Vec3,axis:Vec3,deg:number):Vec3=>{
 const u=normalize(axis), t=deg*Math.PI/180, c=Math.cos(t), s=Math.sin(t);
 return add(add(mul(p,c),mul(cross(u,p),s)),mul(u,dot(u,p)*(1-c)));
};
export const softmax=(xs:number[]):number[]=>{const m=Math.max(...xs);const es=xs.map(x=>Math.exp(x-m));const s=es.reduce((a,b)=>a+b,0);return es.map(x=>x/s)};
export const percentile=(xs:number[],p:number)=>{if(!xs.length)return 0;const a=[...xs].sort((x,y)=>x-y);const i=(a.length-1)*p;const lo=Math.floor(i),hi=Math.ceil(i);return lo===hi?a[lo]:lerp(a[lo],a[hi],i-lo)};
