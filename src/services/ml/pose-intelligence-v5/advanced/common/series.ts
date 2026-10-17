export type Sample={t:number;v:number;confidence?:number};
export function finite(values:number[]):number[]{return values.filter(Number.isFinite);}
export function derivative(samples:Sample[]):Sample[]{const out:Sample[]=[];for(let i=1;i<samples.length;i+=1){const dt=Math.max(.001,(samples[i].t-samples[i-1].t)/1000);out.push({t:samples[i].t,v:(samples[i].v-samples[i-1].v)/dt,confidence:Math.min(samples[i].confidence??1,samples[i-1].confidence??1)});}return out;}
export function smoothBox(values:number[],radius=2):number[]{return values.map((_,i)=>{let s=0,n=0;for(let j=Math.max(0,i-radius);j<=Math.min(values.length-1,i+radius);j+=1){s+=values[j];n+=1;}return n?s/n:0;});}
export function normalize(values:number[],min=0,max=1):number[]{const lo=Math.min(...values),hi=Math.max(...values);if(!Number.isFinite(lo)||hi-lo<1e-9)return values.map(()=>min);return values.map(v=>min+((v-lo)/(hi-lo))*(max-min));}
export function peakIndex(values:number[]):number{if(!values.length)return -1;let idx=0;for(let i=1;i<values.length;i+=1)if(values[i]>values[idx])idx=i;return idx;}
export function troughIndex(values:number[]):number{if(!values.length)return -1;let idx=0;for(let i=1;i<values.length;i+=1)if(values[i]<values[idx])idx=i;return idx;}
export function localExtrema(values:number[],radius=2):number[]{const out:number[]=[];for(let i=radius;i<values.length-radius;i+=1){let hi=true,lo=true;for(let j=1;j<=radius;j+=1){if(values[i]<=values[i-j]||values[i]<=values[i+j])hi=false;if(values[i]>=values[i-j]||values[i]>=values[i+j])lo=false;}if(hi||lo)out.push(i);}return out;}
