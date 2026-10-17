import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {clubPathFeature} from '../src/club';
export function run(){const f=clubPathFeature(makeFrames()); assert(f.name==="proxy_club_path","club");}

