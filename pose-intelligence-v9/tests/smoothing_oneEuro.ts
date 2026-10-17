import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {OneEuroLandmarkSmoother} from '../src/smoothing';
export function run(){const s=new OneEuroLandmarkSmoother(); const a=s.update(makeFrame(0)),b=s.update(makeFrame(1)); assert(a.landmarks.length===b.landmarks.length,"smoothing");}

