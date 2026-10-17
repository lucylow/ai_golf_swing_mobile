import { PoseFrame } from '../types/landmarks';

export type CompactPoseFrame={t:number;i:number;p:number[];c:number[]};

export function compactFrame(frame:PoseFrame):CompactPoseFrame{
  const p:number[]=[]; const c:number[]=[];
  for(const lm of frame.landmarks){p.push(lm.x,lm.y,lm.z);c.push(lm.confidence);}
  return {t:Math.round(frame.timestampMs),i:frame.frameIndex,p,c};
}

export function expandFrame(compact:CompactPoseFrame,width=1,height=1):PoseFrame{
  const landmarks=Array.from({length:Math.floor(compact.p.length/3)},(_,id)=>({
    id:id as any,x:compact.p[id*3],y:compact.p[id*3+1],z:compact.p[id*3+2],visibility:compact.c[id]??0,presence:compact.c[id]??0,confidence:compact.c[id]??0,
  }));
  return {timestampMs:compact.t,frameIndex:compact.i,width,height,landmarks};
}
