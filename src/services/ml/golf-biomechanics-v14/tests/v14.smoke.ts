import { GolfBiomechanicsEngineV14 } from '../src/engine/GolfBiomechanicsEngineV14';
import { benchmark } from '../src/eval/benchmark';

const frames=Array.from({length:120},(_,i)=>({timestampMs:i*33,fps:30,landmarks:Array.from({length:33},(_,j)=>({id:`L${j}`,p:{x:j/40,y:0.45+Math.sin(i/12+j/9)*0.02,z:0.1*Math.cos(i/17)},visibility:.95,presence:.95,tracked:true}))}));
const engine=new GolfBiomechanicsEngineV14();
const first=engine.analyze(frames);
const second=engine.analyze(frames);
const third=engine.analyze(frames);
if(!first.metrics.length) throw new Error('No metrics');
if(!third.baselines.length) throw new Error('No baselines after repeated sessions');
const b=benchmark([
  {id:'quality',expected:1,actual:first.metrics[0].evidence.confidence,tolerance:.2},
  {id:'stability',expected:third.metrics[1].value,actual:third.metrics[1].value,tolerance:.001}
]);
if(b.passRate!==1) throw new Error('Benchmark failed');
void engine.version; void third.quality; void third.metrics.length; void third.anomalies.length;
