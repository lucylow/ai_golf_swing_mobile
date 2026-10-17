export function clamp(v:number,min:number=0,max:number=1){return Math.max(min,Math.min(max,v));}
export function mean(a:number[]){return a.length?a.reduce((s,v)=>s+v,0)/a.length:0;}
export function weightedMean(a:number[],w:number[]){let sw=0,sv=0;for(let i=0;i<a.length;i++){const wi=w[i]??0;sw+=wi;sv+=a[i]*wi;}return sw?sv/sw:0;}
export function variance(a:number[]){const m=mean(a);return a.length?mean(a.map(v=>(v-m)**2)):0;}
export function std(a:number[]){return Math.sqrt(variance(a));}
export function median(a:number[]){if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}
export function mad(a:number[]){const m=median(a);return median(a.map(v=>Math.abs(v-m)));}
export function quantile(a:number[],q:number){if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y),i=(s.length-1)*clamp(q,0,1),lo=Math.floor(i),hi=Math.ceil(i);return s[lo]+(s[hi]-s[lo])*(i-lo);}
export function zScore(v:number,m:number,s:number){return s>1e-9?(v-m)/s:0;}
export function robustZ(v:number,a:number[]){const m=median(a),d=mad(a);return d>1e-9?0.6745*(v-m)/d:0;}
export function rms(a:number[]){return a.length?Math.sqrt(mean(a.map(v=>v*v))):0;}
export function percentileRank(v:number,a:number[]){if(!a.length)return 0;let c=0;for(const x of a)c+=x<=v?1:0;return c/a.length;}
export function lerp(a:number,b:number,t:number){return a+(b-a)*clamp(t,0,1);}
export function smoothExponential(a:number[],alpha:number){if(!a.length)return [];const out=[a[0]];for(let i=1;i<a.length;i++)out.push(alpha*a[i]+(1-alpha)*out[i-1]);return out;}
export function diff(a:number[]){const o:number[]=[];for(let i=1;i<a.length;i++)o.push(a[i]-a[i-1]);return o;}
export function normalizedSlope(a:number[]){if(a.length<2)return 0;return (a[a.length-1]-a[0])/Math.max(1,a.length-1);}
export function entropy(p:number[]){const s=p.reduce((x,v)=>x+Math.max(0,v),0)||1;let h=0;for(const v of p){const q=Math.max(v,0)/s;if(q>0)h-=q*Math.log(q);}return h;}
