import { Vec2, Vec3 } from './types';
export const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
export const clamp01=(v:number)=>clamp(Number.isFinite(v)?v:0,0,1);
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const lerp3=(a:Vec3,b:Vec3,t:number):Vec3=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t)});
export const add3=(a:Vec3,b:Vec3):Vec3=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z});
export const sub3=(a:Vec3,b:Vec3):Vec3=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
export const mul3=(a:Vec3,s:number):Vec3=>({x:a.x*s,y:a.y*s,z:a.z*s});
export const dot3=(a:Vec3,b:Vec3)=>a.x*b.x+a.y*b.y+a.z*b.z;
export const cross3=(a:Vec3,b:Vec3):Vec3=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
export const norm3=(a:Vec3)=>Math.hypot(a.x,a.y,a.z);
export const normalize3=(a:Vec3):Vec3=>{const n=norm3(a);return n<1e-9?{x:0,y:0,z:0}:mul3(a,1/n)};
export const distance3=(a:Vec3,b:Vec3)=>norm3(sub3(a,b));
export const angleDeg=(a:Vec3,b:Vec3):number=>{const na=norm3(a),nb=norm3(b); if(na<1e-9||nb<1e-9)return 0; return Math.acos(clamp(dot3(a,b)/(na*nb),-1,1))*180/Math.PI;};
export const signedAngle2=(a:Vec2,b:Vec2):number=>Math.atan2(a.x*b.y-a.y*b.x,a.x*b.x+a.y*b.y)*180/Math.PI;
export const mean=(xs:number[])=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:0;
export const median=(xs:number[])=>{if(!xs.length)return 0;const s=[...xs].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;};
export const mad=(xs:number[])=>{const m=median(xs);return median(xs.map(x=>Math.abs(x-m)));};
export const percentile=(xs:number[],p:number)=>{if(!xs.length)return 0;const s=[...xs].sort((a,b)=>a-b),i=clamp(p,0,1)*(s.length-1),lo=Math.floor(i),hi=Math.ceil(i);return s[lo]+(s[hi]-s[lo])*(i-lo);};
export const variance=(xs:number[])=>{if(xs.length<2)return 0;const m=mean(xs);return xs.reduce((a,x)=>a+(x-m)**2,0)/(xs.length-1);};
export const std=(xs:number[])=>Math.sqrt(variance(xs));
export const robustZ=(v:number,xs:number[])=>{const m=median(xs),s=Math.max(mad(xs)*1.4826,1e-6);return (v-m)/s;};
export const sigmoid=(x:number)=>1/(1+Math.exp(-clamp(x,-40,40)));
export function linearRegression(x:number[],y:number[],lambda=0.001):{intercept:number;scale:number}{const n=Math.min(x.length,y.length);if(n<2)return{intercept:0,scale:1};let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];sxx+=x[i]*x[i];sxy+=x[i]*y[i];}const det=n*(sxx+lambda)-sx*sx;if(Math.abs(det)<1e-9)return{intercept:sy/n,scale:1};return{intercept:((sy*(sxx+lambda))-sx*sxy)/det,scale:((n*sxy)-sx*sy)/det};}
export function softmax(xs:number[]):number[]{const mx=Math.max(...xs);const ex=xs.map(v=>Math.exp(clamp(v-mx,-30,30)));const z=ex.reduce((a,b)=>a+b,0)||1;return ex.map(v=>v/z);}

