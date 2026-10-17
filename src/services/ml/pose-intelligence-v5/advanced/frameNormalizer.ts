import { clamp01 } from '../types/landmarks';

export type FramenormalizerConfig={window:number;confidenceFloor:number;gain:number};
export type FramenormalizerSample={t:number;v:number;c:number};

export class Framenormalizer {
  private history:FramenormalizerSample[]=[];
  constructor(private readonly config:FramenormalizerConfig={window:5,confidenceFloor:.2,gain:.6}){}

  reset():void{this.history=[];}
  add(t:number,v:number,confidence=1):number{
    const c=clamp01(confidence); this.history.push({t,v,c});
    while(this.history.length>this.config.window)this.history.shift();
    let numerator=0,total=0;
    for(const s of this.history){const w=Math.max(this.config.confidenceFloor,s.c)*this.config.gain; numerator+=s.v*w; total+=w;}
    return total>0?numerator/total:v;
  }
  values():FramenormalizerSample[]{return this.history.map(s=>({...s}));}
  confidence():number{if(!this.history.length)return 0;return this.history.reduce((s,x)=>s+x.c,0)/this.history.length;}
  trend():number{if(this.history.length<2)return 0;const a=this.history[0],b=this.history.at(-1)!;const dt=Math.max(1,b.t-a.t);return (b.v-a.v)/(dt/1000);}
}

export function scoreFramenormalizerStability(samples:FramenormalizerSample[]):number{
  if(samples.length<2)return 0;
  let sum=0;for(let i=1;i<samples.length;i+=1)sum+=Math.abs(samples[i].v-samples[i-1].v);
  return Math.max(0,1-(sum/Math.max(1,samples.length-1)));
}

export function frameNormalizerWindowSize():number{return 11;}
export function frameNormalizerVersion():string{return "pose-v5-009";}
export function frameNormalizerDescription():string{return "canonical frame geometry and camera normalization";}
