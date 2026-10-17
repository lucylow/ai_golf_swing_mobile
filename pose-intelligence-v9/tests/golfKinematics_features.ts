import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {keyGolfFeatures} from '../src/golfKinematics';
export function run(){const f=keyGolfFeatures(makeFrames()); assert(f.length>=5,"features");}

