import {assert,assertClose} from './assert';
import {angleDeg,normalize,distance,softmax} from '../src/core/math';
assertClose(angleDeg({x:1,y:0,z:0},{x:0,y:1,z:0}),90,1e-6);
assertClose(distance({x:0,y:0,z:0},{x:3,y:4,z:0}),5,1e-6);
assertClose(normalize({x:0,y:0,z:0}).x,0,1e-6);
const p=softmax([1,2,3]);assertClose(p.reduce((a,b)=>a+b,0),1,1e-9);assert(p[2]>p[1]&&p[1]>p[0]);
