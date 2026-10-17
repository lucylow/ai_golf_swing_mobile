import { mad, median, clamp01 } from '../math';
export type RobustSummary={median:number;mad:number;lower:number;upper:number;count:number};
export function summarize(xs:number[],k=3):RobustSummary{const m=median(xs),s=Math.max(mad(xs)*1.4826,1e-6);return{median:m,mad:s,lower:m-k*s,upper:m+k*s,count:xs.length};}
export function winsorize(xs:number[],k=3):number[]{const s=summarize(xs,k);return xs.map(v=>Math.max(s.lower,Math.min(s.upper,v)));}
export function robustWeight(residual:number,delta=1):number{const a=Math.abs(residual);return a<=delta?1:delta/a;}
export function robustConfidence(residuals:number[]):number{if(!residuals.length)return 0;const s=summarize(residuals);const scale=Math.max(Math.abs(s.median)+s.mad,1);return clamp01(1/(1+scale));}

