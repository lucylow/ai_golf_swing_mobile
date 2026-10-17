import { Landmark, PoseFrame } from './types';
import { clamp, lerp } from './math';
function alpha(cutoff:number,dt:number){const tau=1/(2*Math.PI*Math.max(cutoff,1e-3));return 1/(1+tau/Math.max(dt,1e-3));}
export class OneEuroLandmarkSmoother {
  private prev: Landmark[]|null=null;
  private prevDx: Landmark[]|null=null;
  constructor(private readonly cutoffHz=1.25, private readonly beta=0.018, private readonly minCutoffHz=0.35){}
  reset(){this.prev=null;this.prevDx=null;}
  update(frame:PoseFrame):PoseFrame{if(!this.prev){this.prev=frame.landmarks.map(p=>({...p}));this.prevDx=frame.landmarks.map(p=>({...p,x:0,y:0,z:0}));return frame;}
    const dt=1/30; const next:Landmark[]=[]; for(let i=0;i<frame.landmarks.length;i++){const p=frame.landmarks[i],q=this.prev[i]??p;const dx=(p.x-q.x)/dt,dy=(p.y-q.y)/dt,dz=(p.z-q.z)/dt;const speed=Math.hypot(dx,dy,dz);const cutoff=this.minCutoffHz+this.beta*speed;const a=alpha(cutoff,dt);next.push({...p,x:lerp(q.x,p.x,a),y:lerp(q.y,p.y,a),z:lerp(q.z,p.z,a)});}this.prev=next;return {...frame,landmarks:next}; }
}
export function smoothSequence(frames:PoseFrame[],smoother=new OneEuroLandmarkSmoother()):PoseFrame[]{smoother.reset();return frames.map(f=>smoother.update(f));}
export function clampLandmarks(frame:PoseFrame,margin=0.04):PoseFrame{const m=clamp(margin,0,0.2);return {...frame,landmarks:frame.landmarks.map(p=>({...p,x:clamp(p.x,m,1-m),y:clamp(p.y,m,1-m)}))};}

