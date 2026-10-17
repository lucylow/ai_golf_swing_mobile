import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {detectEvents} from '../src/phase';
export function run(){const e=detectEvents(makeFrames()); assert(e.length>=4,"events");}

