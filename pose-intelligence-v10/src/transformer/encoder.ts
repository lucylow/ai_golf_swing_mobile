import {dotAttention,sinusoidalPosition,Matrix} from './attention';
export type Head={Wq:Matrix;Wk:Matrix;Wv:Matrix;Wo:Matrix};
export function add(A:Matrix,B:Matrix):Matrix{return A.map((r,i)=>r.map((v,j)=>v+(B[i]?.[j]??0)))}
export function layerNorm(X:Matrix,eps=1e-5):Matrix{return X.map(r=>{const m=r.reduce((a,b)=>a+b,0)/Math.max(r.length,1);const v=r.reduce((s,x)=>s+(x-m)**2,0)/Math.max(r.length,1);const d=Math.sqrt(v+eps);return r.map(x=>(x-m)/d)})}
export function project(X:Matrix,W:Matrix):Matrix{return X.map(r=>W[0].map((_,c)=>r.reduce((s,x,k)=>s+x*(W[k]?.[c]??0),0)))}
export function multiHeadSelfAttention(X:Matrix,heads:Head[]):Matrix{const pos=sinusoidalPosition(X.length,X[0]?.length??0);const S=add(X,pos);const outs=heads.map(h=>{const Q=project(S,h.Wq),K=project(S,h.Wk),V=project(S,h.Wv);return dotAttention(Q,K,V)});const O=outs[0]?.map((r,i)=>r.map((_,c)=>outs.reduce((s,h)=>s+(h[i]?.[c]??0),0)/outs.length))??[];return layerNorm(add(S,O))}
export function feedForward(X:Matrix,W1:Matrix,W2:Matrix):Matrix{return X.map(r=>{const h=W1[0].map((_,c)=>Math.max(0,r.reduce((s,x,k)=>s+x*(W1[k]?.[c]??0),0)));return W2[0].map((_,c)=>h.reduce((s,x,k)=>s+x*(W2[k]?.[c]??0),0));})}
export function transformerEncode(X:Matrix,heads:Head[],W1:Matrix,W2:Matrix,blocks=2):Matrix{let z=X;for(let i=0;i<blocks;i++){const a=multiHeadSelfAttention(z,heads);z=layerNorm(add(a,feedForward(a,W1,W2)));}return z}
