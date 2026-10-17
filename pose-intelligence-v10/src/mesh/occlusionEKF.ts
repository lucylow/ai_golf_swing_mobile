import {Vec3,add,mul,sub} from '../core/math';
export type JointState={x:Vec3;v:Vec3;p:number[][];lastTs:number};
const I=[[1,0,0],[0,1,0],[0,0,1]];
export function predictJoint(s:JointState,ts:number,q=0.02):JointState{const dt=Math.max((ts-s.lastTs)/1000,0);return{x:add(s.x,mul(s.v,dt)),v:s.v,p:s.p.map((r,i)=>r.map((v,j)=>v+(i===j?q*dt:0))),lastTs:ts}}
export function updateJoint(s:JointState,z:Vec3,measurementVar=0.01):JointState{const k=s.p.map((r,i)=>r[i]/Math.max(r[i]+measurementVar,1e-9));const innovation=sub(z,s.x);return{x:add(s.x,{x:k[0]*innovation.x,y:k[1]*innovation.y,z:k[2]*innovation.z}),v:s.v,p:s.p.map((r,i)=>r.map((v,j)=>i===j?v*(1-(k[i]??0)):v)),lastTs:s.lastTs}}
