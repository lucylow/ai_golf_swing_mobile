import { Landmark3D } from '../types';
import { clamp, distance } from '../math';

export interface BoneConstraint { parent:string; child:string; expectedLength:number; tolerance:number; }
export interface ConstraintResult { adjusted:Landmark3D[]; rejected:string[]; residual:number; confidence:number; }

export function solveBoneConstraints(points:Landmark3D[], constraints:BoneConstraint[]):ConstraintResult {
  const map=new Map(points.map(p=>[p.id,p]));
  const adjusted=points.map(p=>({...p,p:{...p.p}}));
  const out:string[]=[];
  let residual=0;
  for(const c of constraints){
    const a=map.get(c.parent); const b=map.get(c.child);
    if(!a||!b) continue;
    const d=distance(a.p,b.p); const err=d-c.expectedLength; residual+=Math.abs(err);
    if(Math.abs(err)>c.tolerance){
      const scale=c.expectedLength/Math.max(d,1e-6);
      const dx=(b.p.x-a.p.x)*(scale-1),dy=(b.p.y-a.p.y)*(scale-1),dz=(b.p.z-a.p.z)*(scale-1);
      const target=adjusted.find(x=>x.id===c.child);
      if(target){ target.p.x-=dx*0.5; target.p.y-=dy*0.5; target.p.z-=dz*0.5; }
      if(Math.abs(err)>c.tolerance*3) out.push(c.child);
    }
  }
  const confidence=clamp(1-residual/Math.max(1,constraints.length),0,1);
  return {adjusted,rejected:out,residual,confidence};
}
