import { mean, sd } from '../math';

export interface MultiResolutionWindow { fast:number[]; medium:number[]; long:number[]; }
export interface TemporalSummary { fastMean:number; mediumMean:number; longMean:number; fastTrend:number; mediumTrend:number; longTrend:number; stability:number; }

function trend(xs:number[]):number{
  if(xs.length<2) return 0;
  const n=xs.length,xm=(n-1)/2,ym=mean(xs); let num=0,den=0;
  xs.forEach((x,i)=>{num+=(i-xm)*(x-ym);den+=(i-xm)**2;});
  return den?num/den:0;
}

export function summarizeMultiResolution(x:number[]):TemporalSummary{
  const fast=x.slice(-15),medium=x.slice(-60),long=x;
  return {fastMean:mean(fast),mediumMean:mean(medium),longMean:mean(long),fastTrend:trend(fast),mediumTrend:trend(medium),longTrend:trend(long),stability:1/(1+sd(x))};
}
