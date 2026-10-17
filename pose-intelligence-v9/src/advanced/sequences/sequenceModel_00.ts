import { PoseFrame } from '../../types';
import { clamp01, mean, std } from '../../math';
import { get } from '../../landmarks';

export type SequenceModelResult = {
  id: string;
  window: number;
  score: number;
  confidence: number;
  turningPoints: number[];
  notes: string[];
};

function signal(frames: PoseFrame[]): number[] {
  const out:number[]=[];
  for (const frame of frames) {
    const a=get(frame,11); const b=get(frame,12); const c=get(frame,23); const d=get(frame,24);
    if (!a||!b||!c||!d) continue;
    out.push((a.x-b.x)+(c.y-d.y)+Math.sin(frame.timestampMs*0.02));
  }
  return out;
}

export function analyze(frames: PoseFrame[]): SequenceModelResult {
  const values=signal(frames);
  const turns:number[]=[];
  for(let i=1;i<values.length-1;i++){
    const left=values[i-1],cur=values[i],right=values[i+1];
    if((cur-left)*(right-cur)<0) turns.push(i);
  }
  const energy=mean(values.map(v=>Math.abs(v)));
  const variability=std(values);
  const score=clamp01(1/(1+variability+Math.abs(energy)));
  const confidence=clamp01(values.length/Math.max(frames.length,1));
  return{id:'sequence_model_0',window:8,score,confidence,turningPoints:turns.slice(0,24),notes:[`samples=${values.length}`,`turns=${turns.length}`]};
}

export function gate(result: SequenceModelResult, minimumConfidence=0.55): boolean {
  return result.confidence >= minimumConfidence && result.turningPoints.length > 1;
}

