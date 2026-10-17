import {assert} from './assert';
import {chooseHighFPS,recommendedExposureSeconds} from '../src/highfps/captureContract';
const fmt=(fps:number,w:number,h:number)=>({width:w,height:h,fps,minFps:30,maxFps:fps,pixelFormat:'420f',supportsHighFPS:fps>=120,maxExposureSeconds:1/30});
const choice=chooseHighFPS({formats:[fmt(60,1920,1080),fmt(120,1920,1080),fmt(240,1280,720)],supports120:true,supports240:true,thermalClass:'medium'},{targetFps:120,preferredWidth:1920,preferredHeight:1080,preferHEVC:true,maxLatencyMs:100});assert(choice?.fps===120);assert(recommendedExposureSeconds(240)>0);
