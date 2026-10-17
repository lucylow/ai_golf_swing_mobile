import { GolfBiomechanicsEngineV17 } from './v17Engine';
import { PoseFrame, CameraCalibration } from './types';
const frames:PoseFrame[]=Array.from({length:60},(_,i)=>({timestampMs:i*16.67,landmarks:Array.from({length:33},(_,j)=>({index:j,x:Math.sin(i*.05+j*.01)*.05,y:Math.cos(i*.04+j*.02)*.05,z:Math.sin(i*.03+j*.01)*.03,visibility:.96}))}));
const camera:CameraCalibration={width:1920,height:1080,fx:1500,fy:1500,cx:960,cy:540,rollDeg:0,pitchDeg:0,yawDeg:0,distanceM:3,targetLineDeg:0};
const out=new GolfBiomechanicsEngineV17().analyze(frames,camera,'right',{enableCounterfactual:true});
if(out.registeredFeatures.length<100) throw new Error('registry too small');
if(out.base.metrics.length<10) throw new Error('base metrics missing');
console.log('V17_SMOKE_OK',out.registeredFeatures.length,out.base.metrics.length,out.readiness.score.toFixed(3));
