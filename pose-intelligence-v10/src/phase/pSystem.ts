export const P_STATES=['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10'] as const;
export type PState=(typeof P_STATES)[number];
export const P_DESCRIPTIONS:Record<PState,string>={P1:'address',P2:'takeaway',P3:'mid-backswing',P4:'top',P5:'early-transition',P6:'delivery',P7:'impact',P8:'early-release',P9:'follow-through',P10:'finish'};
export type FramePhase={frameIndex:number;timestampMs:number;probs:Record<PState,number>;state:PState;confidence:number};
export type PSystemConfig={minDwellMs:number;switchMargin:number;temperature:number};
export const DEFAULT_P_SYSTEM:PSystemConfig={minDwellMs:40,switchMargin:0.08,temperature:1};
export function pSystemClassify(logits:number[],frameIndex:number,timestampMs:number,cfg=DEFAULT_P_SYSTEM):FramePhase{const ex=logits.map(v=>v/cfg.temperature);const m=Math.max(...ex);const e=ex.map(v=>Math.exp(v-m));const sum=e.reduce((a,b)=>a+b,0)||1;const probs=e.map(v=>v/sum);const rec=Object.fromEntries(P_STATES.map((s,i)=>[s,probs[i]??0])) as Record<PState,number>;const top=P_STATES.reduce((best,s)=>rec[s]>rec[best]?s:best,P_STATES[0]);return{frameIndex,timestampMs,probs:rec,state:top,confidence:rec[top]};}
export function phaseEventFrames(frames:FramePhase[],minDwellMs=DEFAULT_P_SYSTEM.minDwellMs){const out:FramePhase[]=[];let last:PState|null=null,start=0;for(const f of frames){if(last===null){last=f.state;start=f.timestampMs;continue}if(f.state!==last&&f.timestampMs-start>=minDwellMs){out.push(f);last=f.state;start=f.timestampMs}}return out;}
export function tempoRatio(addressMs:number,topMs:number,impactMs:number){const up=Math.max(topMs-addressMs,1),down=Math.max(impactMs-topMs,1);return up/down;}
