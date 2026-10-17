import { mean, clamp } from '../math';

export interface AttentionConfig { heads:number; temperature:number; }
export interface AttentionResult { embedding:number[]; weights:number[][]; entropy:number; }

export function temporalSelfAttention(sequence:number[][],config:AttentionConfig={heads:4,temperature:1}):AttentionResult{
  if(!sequence.length) return {embedding:[],weights:[],entropy:0};
  const width=sequence[0].length; const weights:number[][]=[];
  const output=new Array(width).fill(0);
  for(let t=0;t<sequence.length;t++){
    const q=sequence[t]; const scores=sequence.map(k=>q.reduce((s,v,j)=>s+v*k[j],0)/(config.temperature*Math.sqrt(width||1)));
    const max=Math.max(...scores); const ex=scores.map(s=>Math.exp(clamp(s-max,-50,20))); const z=mean(ex)||1;
    const row=ex.map(v=>v/z); weights.push(row);
    for(let j=0;j<width;j++) output[j]+=row[t]*q[j];
  }
  const p=weights.flat(); const entropy=-p.reduce((s,v)=>s+(v>0?v*Math.log(v):0),0);
  return {embedding:output,weights,entropy};
}
