import {Tensor3D,graphConvolution,temporalConv1d} from './layer';
import {Graph} from './graph';
export type STGCNBlock={graph:{inChannels:number;outChannels:number;kernel:number[][]};temporal:number[][];residual:boolean};
export function stgcnBlock(x:Tensor3D,g:Graph,b:STGCNBlock):Tensor3D{const y=graphConvolution(x,g,{inChannels:b.graph.inChannels,outChannels:b.graph.outChannels,kernel:b.graph.kernel});const z=temporalConv1d(y,b.temporal);if(!b.residual)return z;return z.map((frame,t)=>frame.map((node,n)=>node.map((v,c)=>v+(x[t]?.[n]?.[c]??0))))}
export function meanPoolTimeNode(x:Tensor3D){const C=x[0]?.[0]?.length??0;const out=Array(C).fill(0),den=Math.max(1,x.length*(x[0]?.length??1));for(const f of x)for(const n of f)for(let c=0;c<C;c++)out[c]+=n[c]/den;return out}
