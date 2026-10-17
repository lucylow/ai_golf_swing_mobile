import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {sway} from '../src/patterns';
export function run(){const p=sway(makeFrames()); assert(p.id==="sway","sway");}

