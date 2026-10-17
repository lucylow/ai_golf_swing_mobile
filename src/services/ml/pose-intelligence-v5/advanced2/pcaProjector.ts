import { mean } from '../math/scalar';
export type PcaModel={mean:number[];components:number[][];explained:number[]};

function covariance(rows:number[][]):number[][]{
 const n=rows.length;const d=rows[0]?.length??0;const out=Array.from({length:d},()=>Array(d).fill(0));
 for(const row of rows){for(let i=0;i<d;i+=1)for(let j=0;j<d;j+=1)out[i][j]+=(row[i]??0)*(row[j]??0);}
 const denom=Math.max(1,n-1);return out.map(r=>r.map(v=>v/denom));
}
function matVec(m:number[][],v:number[]):number[]{return m.map(row=>row.reduce((s,x,j)=>s+x*(v[j]??0),0));}
function normalize(v:number[]):number[]{const n=Math.sqrt(v.reduce((s,x)=>s+x*x,0));return n>1e-9?v.map(x=>x/n):v.map((_,i)=>i===0?1:0);}
function deflate(m:number[][],v:number[],lambda:number):number[][]{return m.map((row,i)=>row.map((x,j)=>x-lambda*v[i]*v[j]));}
function powerIteration(m:number[][],iterations=60):{v:number[];lambda:number}{
 let v=normalize(m.map((_,i)=>i===0?1:Math.sin(i+1)));
 for(let i=0;i<iterations;i+=1)v=normalize(matVec(m,v));
 const mv=matVec(m,v);const lambda=mv.reduce((s,x,j)=>s+x*(v[j]??0),0);return {v,lambda};
}
export function fitPca(rows:number[][],components=2):PcaModel|null{
 if(!rows.length||!rows[0]?.length)return null;
 const d=rows[0].length;const mu=Array.from({length:d},(_,i)=>mean(rows.map(r=>r[i]??0)));
 let centered=rows.map(r=>r.map((x,i)=>x-mu[i]));let cov=covariance(centered);const out:number[][]=[];const explained:number[]=[];
 for(let k=0;k<Math.min(components,d);k+=1){const {v,lambda}=powerIteration(cov);out.push(v);explained.push(Math.max(0,lambda));cov=deflate(cov,v,lambda);}
 const total=explained.reduce((s,x)=>s+x,0)||1;return {mean:mu,components:out,explained:explained.map(x=>x/total)};
}
export function projectPca(model:PcaModel,row:number[]):number[]{const centered=row.map((x,i)=>x-(model.mean[i]??0));return model.components.map(c=>c.reduce((s,x,i)=>s+x*(centered[i]??0),0));}
