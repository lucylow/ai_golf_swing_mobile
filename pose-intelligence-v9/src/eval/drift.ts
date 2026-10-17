import { mean } from '../math';
export function distributionShift(reference:number[],current:number[]):number{const a=mean(reference),b=mean(current);const sa=reference.length?Math.sqrt(mean(reference.map(v=>(v-a)**2))):1;return Math.abs(a-b)/Math.max(sa,1e-6);}
export function driftFlag(reference:number[],current:number[],threshold=2):boolean{return distributionShift(reference,current)>threshold;}

