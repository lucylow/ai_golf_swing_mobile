import { mean, clamp01 } from '../math';
export function temporalPooling(sequence:number[][]):number[]{if(!sequence.length)return[];const d=Math.max(...sequence.map(x=>x.length));const out:number[]=[];for(let j=0;j<d;j++){const col=sequence.map(x=>x[j]??0);out.push(mean(col));}return out;}
export function deltaEncoding(sequence:number[][]):number[][]{const out:number[][]=[];for(let i=0;i<sequence.length;i++){const a=sequence[Math.max(0,i-1)],b=sequence[i];out.push(b.map((v,j)=>clamp01((v-(a[j]??v))*0.5+0.5)));}return out;}

