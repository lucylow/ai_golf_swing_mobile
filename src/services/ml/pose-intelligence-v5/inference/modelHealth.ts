export type ModelHealth={frames:number;successes:number;failures:number;meanConfidence:number;lastLatencyMs:number;ready:boolean};
export class ModelHealthTracker{
 private frames=0;private successes=0;private failures=0;private conf=0;private latency=0;
 observe(success:boolean,confidence:number,latencyMs:number){this.frames+=1;if(success)this.successes+=1;else this.failures+=1;this.conf=((this.conf*(this.frames-1))+Math.max(0,Math.min(1,confidence)))/this.frames;this.latency=latencyMs;}
 snapshot():ModelHealth{return {frames:this.frames,successes:this.successes,failures:this.failures,meanConfidence:this.conf,lastLatencyMs:this.latency,ready:this.frames>=5&&this.successes>0&&this.conf>.45};}
}
