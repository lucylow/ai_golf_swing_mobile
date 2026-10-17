import { PatternContext } from './types';
import { SwingPattern } from '../types/model';

export function detectTempoVariation(ctx: PatternContext): SwingPattern | null {
  const top=ctx.phases.find(p=>p.phase==='top');
  const end=ctx.frames.at(-1);
  if(!top||!end||!ctx.frames[0])return null;
  const back=top.startMs-ctx.frames[0].timestampMs;
  const down=Math.max(1,end.timestampMs-top.endMs);
  const ratio=back/down;
  const distance=Math.abs(ratio-3.0)/3.0;
  const score=Math.max(0,Math.min(1,distance));
  if(score<.28)return null;
  return {id:'tempoVariation',label:'Tempo variability',score,confidence:Math.max(.28,ctx.confidence*.75),severity:score>.7?'high':score>.5?'medium':'low',evidence:[`Illustrative backswing-to-downswing ratio: ${ratio.toFixed(2)}:1`,`Tempo is treated as a comparative signal rather than a universal ideal`],recommendedFocus:'Use a consistent rhythm drill and recheck tempo over multiple swings.'};
}
