export type Latency_P95={name:'latency_p95';label:'latency p95';value:number;unit:'ms';target:number;direction:'up'|'down'};
export function scoreLatency_P95(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

