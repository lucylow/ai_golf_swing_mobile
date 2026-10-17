import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {explain} from '../src/explainability';
import {sway} from '../src/patterns';
export function run(){const p=sway(makeFrames()); const i=explain(p,[]); assert(!!i,"insight");}

