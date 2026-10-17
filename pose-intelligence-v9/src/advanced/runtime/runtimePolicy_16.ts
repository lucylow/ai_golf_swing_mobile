export type RuntimeSample={fps:number;latencyMs:number;queueDepth:number;confidence:number;frameDropRatio:number};
export type RuntimeDecision={inferenceEveryNFrames:number;targetFps:number;dropFrames:boolean;degraded:boolean;reason:string};

export function decide(sample:RuntimeSample):RuntimeDecision{
  let targetFps=30; let inferenceEveryNFrames=1; let degraded=false; let reason='nominal';
  if(sample.latencyMs>122){targetFps=24;inferenceEveryNFrames=1;reason='latency_guard';}
  if(sample.queueDepth>3){targetFps=20;inferenceEveryNFrames=2;reason='backpressure_guard';}
  if(sample.frameDropRatio>0.12){targetFps=Math.min(targetFps,20);inferenceEveryNFrames=2;reason='drop_guard';}
  if(sample.confidence<0.48){degraded=true;reason='confidence_guard';}
  return{inferenceEveryNFrames,targetFps,dropFrames:inferenceEveryNFrames>1,degraded,reason};
}

export function shouldEmit(sample:RuntimeSample):boolean{
  return sample.latencyMs < 208 && sample.queueDepth <= 6;
}

