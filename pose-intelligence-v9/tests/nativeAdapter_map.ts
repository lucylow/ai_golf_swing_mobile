import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {mapNativeResult} from '../src/nativeAdapter';
export function run(){const r=mapNativeResult({timestampMs:1,width:640,height:480,landmarks:Array.from({length:33},()=>({x:0.5,y:0.5,z:0,visibility:0.9,presence:0.9,score:0.9}))},"mediapipe",12); assert(r.landmarks.length===33,"native map");}

