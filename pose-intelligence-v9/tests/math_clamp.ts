import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {clamp,median,robustZ} from '../src/math';
export function run(){assert(clamp(2,0,1)===1,"clamp");}

