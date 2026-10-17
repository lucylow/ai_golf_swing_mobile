import {PoseFrame} from '../../types';
import {LM} from '../../landmarks';
import {midpoint,sub,normalize,cross,dot} from '../geometry/vec3';
export interface SegmentFrame{origin:{x:number;y:number;z:number};x:{x:number;y:number;z:number};y:{x:number;y:number;z:number};z:{x:number;y:number;z:number};confidence:number;}
function safe(frame:PoseFrame,i:number){return frame.landmarks[i]??{x:0,y:0,z:0,index:i,visibility:0};}
export function pelvisFrame(f:PoseFrame):SegmentFrame{const l=safe(f,LM.leftHip),r=safe(f,LM.rightHip),ls=safe(f,LM.leftShoulder);const origin=midpoint(l,r);const x=normalize(sub(r,l));const z=normalize(cross(x,sub(ls,origin)));const y=normalize(cross(z,x));return{origin,x,y,z,confidence:Math.min(l.visibility,r.visibility,ls.visibility)};}
export function thoraxFrame(f:PoseFrame):SegmentFrame{const l=safe(f,LM.leftShoulder),r=safe(f,LM.rightShoulder),h=safe(f,LM.leftHip);const origin=midpoint(l,r);const x=normalize(sub(r,l));const z=normalize(cross(x,sub(h,origin)));const y=normalize(cross(z,x));return{origin,x,y,z,confidence:Math.min(l.visibility,r.visibility,h.visibility)};}
export function frameTwistDeg(a:SegmentFrame,b:SegmentFrame){const ax={x:a.x.x,y:0,z:a.x.z},bx={x:b.x.x,y:0,z:b.x.z};return Math.atan2(ax.x*bx.z-ax.z*bx.x,dot(ax,bx))*180/Math.PI;}
