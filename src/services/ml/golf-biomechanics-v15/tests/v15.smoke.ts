import { GolfBiomechanicsEngineV15 } from '../src/GolfBiomechanicsEngineV15';
import { PoseFrame } from '../src/types';
const frames:PoseFrame[]=Array.from({length:60},(_,i)=>{const t=i/59;const n=(index:number,x:number,y:number,z:number)=>({index,x,y,z,visibility:.96});const lm=Array.from({length:33},(_,j)=>n(j,.5+.03*Math.sin(t*6+j*.03),.5+.05*Math.cos(t*4+j*.02),.1*Math.sin(t*3+j*.05)));return {timestampMs:i*16.67,landmarks:lm};});
const engine=new GolfBiomechanicsEngineV15();
const out=engine.analyze(frames,{handedness:'right',goal:'trail-foot stability',camera:{width:1920,height:1080,fx:1400,fy:1400,cx:960,cy:540,rollDeg:0,pitchDeg:0,yawDeg:0}});
if(!out.metrics.length) throw new Error('no metrics');
if(out.reliability.overall<0) throw new Error('invalid reliability');
if(out.version!=='v15.0.0-golf-biomechanics') throw new Error('wrong version');
console.log('V15_SMOKE_PASS',out.metrics.length,out.anomalies.length,out.reliability.overall.toFixed(3));
