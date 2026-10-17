import { clamp } from '../math/scalar';
export type Signal={name:string;value:number;confidence:number;weight:number};
export type FusionResult={value:number;confidence:number;contributors:string[]};
export function fuseSignals(signals:Signal[]):FusionResult{
 let num=0,den=0;const contributors:string[]=[];
 for(const s of signals){const w=Math.max(0,s.weight)*clamp(s.confidence,0,1);num+=s.value*w;den+=w;if(w>.1)contributors.push(s.name);}
 return {value:den?num/den:0,confidence:clamp(den/Math.max(1,signals.reduce((s,x)=>s+Math.max(0,x.weight),0)),0,1),contributors};
}
