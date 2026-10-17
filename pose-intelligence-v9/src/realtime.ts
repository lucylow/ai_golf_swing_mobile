import { InferencePacket } from './types';
export class FrameScheduler {private queue:InferencePacket[]=[];constructor(private readonly maxQueue=3){}push(packet:InferencePacket){if(this.queue.length>=this.maxQueue)this.queue.shift();this.queue.push(packet);}next(){return this.queue.shift()??null;}size(){return this.queue.length;}clear(){this.queue=[];}}
export class LatencyMonitor {private samples:number[]=[];add(ms:number){this.samples.push(Math.max(0,ms));if(this.samples.length>120)this.samples.shift();}p95(){if(!this.samples.length)return 0;const a=[...this.samples].sort((x,y)=>x-y),i=Math.min(a.length-1,Math.floor(a.length*0.95));return a[i];}mean(){return this.samples.length?this.samples.reduce((a,b)=>a+b,0)/this.samples.length:0;}}
export class BackpressurePolicy {constructor(private readonly maxLatencyMs=120){}allow(packet:InferencePacket){return packet.latencyMs<=this.maxLatencyMs;}}

