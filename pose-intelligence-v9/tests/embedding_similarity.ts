import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {swingEmbedding,cosineSimilarity} from '../src/embedding';
export function run(){const e=swingEmbedding(makeFrames()); assertNear(cosineSimilarity(e,e),1,1e-6,"similarity");}

