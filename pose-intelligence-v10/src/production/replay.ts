export type ReplayEvent={t:number;kind:'frame'|'pose'|'club'|'ball'|'phase'|'insight';payload:unknown};
export type Replay={id:string;version:number;events:ReplayEvent[]};
export function sortReplay(r:Replay){return{...r,events:[...r.events].sort((a,b)=>a.t-b.t)}}
export function replayWindow(r:Replay,start:number,end:number){return sortReplay(r).events.filter(e=>e.t>=start&&e.t<=end)}
