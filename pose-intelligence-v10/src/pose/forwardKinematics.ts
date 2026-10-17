import { Vec3,add,cross,normalize,mul,rotationAxisAngle,mat3Vec,Mat3 } from '../core/math';
export type JointNode={name:string;parent:number;restOffset:Vec3;rotationAxis:Vec3;minDeg:number;maxDeg:number};
export type FKResult={positions:Vec3[];rotations:Mat3[]};
export function clampRotation(thetaDeg:number,j:JointNode){return Math.max(j.minDeg,Math.min(j.maxDeg,thetaDeg));}
export function solveFK(nodes:JointNode[],anglesDeg:number[],root:Vec3={x:0,y:0,z:0}):FKResult{
 const positions:Array<Vec3>=Array(nodes.length);const rotations:Array<Mat3>=Array(nodes.length);
 for(let i=0;i<nodes.length;i++){
  const j=nodes[i]; const local=rotationAxisAngle(j.rotationAxis,clampRotation(anglesDeg[i]??0,j)*Math.PI/180);
  if(j.parent<0){rotations[i]=local;positions[i]=add(root,j.restOffset);}
  else{rotations[i]=rotations[j.parent]?rotations[j.parent]!:[1,0,0,0,1,0,0,0,1] as Mat3; const worldOffset=mat3Vec(rotations[i]!,j.restOffset);positions[i]=add(positions[j.parent]!,worldOffset);}
 }
 return {positions,rotations};
}
export function inferSegmentFrame(a:Vec3,b:Vec3,c:Vec3){const x=normalize(cross(subSafe(b,a),subSafe(c,b)));const y=normalize(subSafe(b,a));const z=normalize(cross(x,y));return {x,y,z};}
function subSafe(a:Vec3,b:Vec3):Vec3{return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}}
