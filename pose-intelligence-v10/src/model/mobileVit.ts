import {softmax} from '../core/math';
export type Patch={values:number[];row:number;col:number};
export type MobileViTConfig={patchSize:number;channels:number;embeddingDim:number;heads:number;depth:number};
export const DEFAULT_MOBILE_VIT:MobileViTConfig={patchSize:16,channels:3,embeddingDim:64,heads:4,depth:2};
export function imageToPatches(rgb:number[],width:number,height:number,cfg=DEFAULT_MOBILE_VIT):Patch[]{const p=cfg.patchSize,out:Patch[]=[];const rows=Math.floor(height/p),cols=Math.floor(width/p);for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const values:number[]=[];for(let y=0;y<p;y++)for(let x=0;x<p;x++)for(let ch=0;ch<cfg.channels;ch++){const idx=((r*p+y)*width+(c*p+x))*cfg.channels+ch;values.push((rgb[idx]??0)/255)}out.push({values,row:r,col:c})}return out}
export function linearProject(x:number[],W:number[][]){return W[0].map((_,c)=>x.reduce((s,v,k)=>s+v*(W[k]?.[c]??0),0));}
export function patchTokenScore(p:Patch){const m=p.values.reduce((a,b)=>a+b,0)/Math.max(p.values.length,1);return softmax([m,-m])[0]}
