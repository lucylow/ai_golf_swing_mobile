import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {GolfPoseAlgorithmV9} from '../src/algorithmV9';
export function run(){const r=new GolfPoseAlgorithmV9().analyze(makeFrames(90)); assert(r.features.length>0,"algorithm");}

