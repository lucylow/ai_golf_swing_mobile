export type Tier='low'|'balanced'|'high';
export interface DeviceProfile{model:string;memoryGB:number;neuralEngine:boolean;maxFps:number;thermal:'nominal'|'warm'|'hot';}
export function chooseTier(d:DeviceProfile):Tier{if(d.thermal==='hot')return'low';if(d.neuralEngine&&d.memoryGB>=6&&d.maxFps>=60)return'high';if(d.memoryGB>=4)return'balanced';return'low';}
export function targetFps(t:Tier){return t==='high'?60:t==='balanced'?45:30;}
