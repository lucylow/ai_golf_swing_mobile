import {softmax} from '../core/math';
export type Matrix=number[][];
export const matmul=(A:Matrix,B:Matrix):Matrix=>A.map(r=>B[0].map((_,c)=>r.reduce((s,_,k)=>s+(r[k]??0)*(B[k]?.[c]??0),0)));
export const transpose=(A:Matrix):Matrix=>A[0].map((_,c)=>A.map(r=>r[c]??0));
export function dotAttention(Q:Matrix,K:Matrix,V:Matrix,mask?:boolean[][]):Matrix{
  const d=Math.max(1,K[0]?.length??1);
  return Q.map((q,qi)=>{
    const scores=K.map((k)=>q.reduce((s,x,i)=>s+x*(k[i]??0),0)/Math.sqrt(d));
    const masked=scores.map((s,i)=>mask?.[qi]?.[i]===false?-1e9:s);
    const p=softmax(masked);
    return V[0].map((_,c)=>p.reduce((s,weight,i)=>s+weight*(V[i]?.[c]??0),0));
  });
}
export function sinusoidalPosition(length:number,dim:number):Matrix{return Array.from({length},(_,p)=>Array.from({length:dim},(_,i)=>{const k=2*Math.floor(i/2)/dim;return i%2===0?Math.sin(p/Math.pow(10000,k)):Math.cos(p/Math.pow(10000,k));}))}
