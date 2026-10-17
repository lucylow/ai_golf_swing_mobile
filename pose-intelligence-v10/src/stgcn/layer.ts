import { Graph, normalizedAdjacency } from './graph';
export type Tensor3D=number[][][];
export type GCNWeights={inChannels:number;outChannels:number;kernel:number[][]};
export function zeros(T:number,N:number,C:number):Tensor3D{return Array.from({length:T},()=>Array.from({length:N},()=>Array(C).fill(0)));}
export function graphConvolution(x:Tensor3D,g:Graph,w:GCNWeights):Tensor3D{
 const A=normalizedAdjacency(g); const T=x.length; const O=zeros(T,g.nodes,w.outChannels);
 for(let t=0;t<T;t++){
  for(let i=0;i<g.nodes;i++){
   for(let o=0;o<w.outChannels;o++){
    let s=0;
    for(let j=0;j<g.nodes;j++){
     const a=A[i][j]; if(!a) continue;
     for(let c=0;c<w.inChannels;c++){s+=a*(x[t][j]?.[c]??0)*(w.kernel[c]?.[o]??0);}
    }
    O[t][i][o]=Math.max(0,s);
   }
  }
 }
 return O;
}
export function temporalConv1d(x:Tensor3D,kernel:number[][],kernelSize=3):Tensor3D{
 const T=x.length,N=x[0]?.length??0,C=kernel[0]?.length??1,O=zeros(T,N,C),r=Math.floor(kernelSize/2);
 for(let t=0;t<T;t++)for(let n=0;n<N;n++)for(let c=0;c<C;c++){let s=0;for(let d=-r;d<=r;d++){const ti=Math.max(0,Math.min(T-1,t+d));s+=(x[ti]?.[n]?.[c]??0)*(kernel[d+r]?.[c]??0);}O[t][n][c]=Math.max(0,s);}
 return O;
}
