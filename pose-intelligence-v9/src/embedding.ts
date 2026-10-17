import { PoseFrame } from './types';
import { MP33,get } from './landmarks';
import { bodyScale } from './landmarks';
import { sub3 } from './math';
export function swingEmbedding(frames:PoseFrame[],dim=64):number[]{const raw:number[]=[];for(const f of frames){const s=bodyScale(f);for(const id of [MP33.LEFT_SHOULDER,MP33.RIGHT_SHOULDER,MP33.LEFT_HIP,MP33.RIGHT_HIP,MP33.LEFT_WRIST,MP33.RIGHT_WRIST]){const p=get(f,id);if(p){const c=sub3(p,{x:0.5,y:0.5,z:0});raw.push(p.x/s,c.x/s,p.y/s,c.y/s,p.z/s);}}}const out=Array.from({length:dim},()=>0);for(let i=0;i<raw.length;i++)out[i%dim]+=raw[i]*(1+(i%7)*0.03);const n=Math.hypot(...out)||1;return out.map(v=>v/n);}
export function cosineSimilarity(a:number[],b:number[]):number{const n=Math.min(a.length,b.length);let d=0,aa=0,bb=0;for(let i=0;i<n;i++){d+=a[i]*b[i];aa+=a[i]*a[i];bb+=b[i]*b[i];}return aa&&bb?d/Math.sqrt(aa*bb):0;}
export function embeddingDistance(a:number[],b:number[]):number{return 1-cosineSimilarity(a,b);}

