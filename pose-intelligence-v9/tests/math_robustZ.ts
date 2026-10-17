import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {clamp,median,robustZ} from '../src/math';
export function run(){assert(Number.isFinite(robustZ(1,[1,1,2])),"robust z");}

