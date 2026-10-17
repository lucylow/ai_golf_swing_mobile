export type AblationResult={name:string;primaryMetric:number;latencyMs:number;memoryMb:number;notes:string[]};
export function rankAblations(xs:AblationResult[]){return [...xs].sort((a,b)=>b.primaryMetric-a.primaryMetric||a.latencyMs-b.latencyMs);}
