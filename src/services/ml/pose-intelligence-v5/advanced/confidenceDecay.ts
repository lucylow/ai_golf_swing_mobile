import { clamp01 } from '../types/landmarks';

export type ConfidencedecayConfig={window:number;confidenceFloor:number;gain:number};
export type ConfidencedecaySample={t:number;v:number;c:number};

export class Confidencedecay {
  private history:ConfidencedecaySample[]=[];
  constructor(private readonly config:ConfidencedecayConfig={window:5,confidenceFloor:.2,gain:.6}){}

  reset():void{this.history=[];}
  add(t:number,v:number,confidence=1):number{
    const c=clamp01(confidence); this.history.push({t,v,c});
    while(this.history.length>this.config.window)this.history.shift();
    let numerator=0,total=0;
    for(const s of this.history){const w=Math.max(this.config.confidenceFloor,s.c)*this.config.gain; numerator+=s.v*w; total+=w;}
    return total>0?numerator/total:v;
  }
  values():ConfidencedecaySample[]{return this.history.map(s=>({...s}));}
  confidence():number{if(!this.history.length)return 0;return this.history.reduce((s,x)=>s+x.c,0)/this.history.length;}
  trend():number{if(this.history.length<2)return 0;const a=this.history[0],b=this.history.at(-1)!;const dt=Math.max(1,b.t-a.t);return (b.v-a.v)/(dt/1000);}
}

export function scoreConfidencedecayStability(samples:ConfidencedecaySample[]):number{
  if(samples.length<2)return 0;
  let sum=0;for(let i=1;i<samples.length;i+=1)sum+=Math.abs(samples[i].v-samples[i-1].v);
  return Math.max(0,1-(sum/Math.max(1,samples.length-1)));
}

export function confidenceDecayWindowSize():number{return 10;}
export function confidenceDecayVersion():string{return "pose-v5-008";}
export function confidenceDecayDescription():string{return "temporal decay and recovery of landmark confidence";}
