import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {clamp,median,robustZ} from '../src/math';
export function run(){assertNear(median([1,3,2]),2,1e-9,"median");}

