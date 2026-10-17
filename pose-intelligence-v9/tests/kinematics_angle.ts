import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {segmentAngle} from '../src/kinematics';
export function run(){const a=segmentAngle(makeFrames(3),11,13,15); assert(a.length===3,"angle");}

