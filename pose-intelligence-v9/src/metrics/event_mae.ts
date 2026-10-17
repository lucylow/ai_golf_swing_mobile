export type Event_Mae={name:'event_mae';label:'event timing MAE';value:number;unit:'ms';target:number;direction:'up'|'down'};
export function scoreEvent_Mae(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

