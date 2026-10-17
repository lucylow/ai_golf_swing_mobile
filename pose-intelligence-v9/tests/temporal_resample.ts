import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {resampleFrames} from '../src/temporal';
export function run(){const out=resampleFrames(makeFrames(30),15); assert(out.length>0 && out.length<30,"resample");}

