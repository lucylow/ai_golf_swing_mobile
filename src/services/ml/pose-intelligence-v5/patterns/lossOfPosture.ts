import { PatternContext } from './types';
import { SwingPattern } from '../types/model';
import { torsoLean } from '../geometry/angles';

export function detectLossOfPosture(ctx: PatternContext): SwingPattern | null {
  if(ctx.frames.length<8)return null;
  const values=ctx.frames.map(torsoLean).filter(Number.isFinite);
  if(values.length<8)return null;
  const first=values.slice(0,Math.max(2,Math.floor(values.length*.15)));
  const late=values.slice(Math.floor(values.length*.7));
  const a=first.reduce((s,v)=>s+v,0)/first.length;
  const b=late.reduce((s,v)=>s+v,0)/late.length;
  const delta=Math.abs(b-a);
  const score=Math.max(0,Math.min(1,delta/35));
  if(score<.35)return null;
  return {
    id:'lossOfPosture',label:'Posture change through impact',score,confidence:Math.max(.3,ctx.confidence*.82),severity:score>.75?'high':score>.55?'medium':'low',
    evidence:[`Torso orientation shift: ${delta.toFixed(1)}°`,`Compared early setup frames with late-swing frames`],
    recommendedFocus:'Use a posture-control drill and recheck the same camera view.'
  };
}
