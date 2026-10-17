import {mean} from '../math/stats';
export function derivative(values:number[],timesMs:number[]){const out:number[]=[];for(let i=0;i<values.length;i++){if(i===0){const dt=Math.max(1,(timesMs[1]??timesMs[0]+33)-timesMs[0]);out.push((values[1]-values[0])/(dt/1000));continue;}const dt=Math.max(1,timesMs[i]-timesMs[i-1]);out.push((values[i]-values[i-1])/(dt/1000));}return out;}
export function secondDerivative(values:number[],timesMs:number[]){return derivative(derivative(values,timesMs),timesMs);}
export function peakIndex(values:number[]){let idx=0;for(let i=1;i<values.length;i++)if(values[i]>values[idx])idx=i;return idx;}
export function peakTime(values:number[],times:number[]){return times[peakIndex(values)]??0;}
export function area(values:number[],timesMs:number[]){let total=0;for(let i=1;i<values.length;i++){const dt=(timesMs[i]-timesMs[i-1])/1000;total+=0.5*(values[i]+values[i-1])*dt;}return total;}
export function energyLike(values:number[],timesMs:number[]){return mean(values.map(v=>v*v))*Math.max(0,(timesMs[timesMs.length-1]??0)-(timesMs[0]??0))/1000;}
