import {PoseFrame3D} from '../pose/types';
import {makeCanonicalFrame,xFactorDeg,pelvisTiltDeg,thoraxTiltDeg} from '../pose/kinematicFrames';
import {rmse} from './metrics';
export type GoldenCase={id:string;frames:PoseFrame3D[];expectedXFactor:number[];expectedPelvisTilt:number[];expectedThoraxTilt:number[]};
export function evaluateGolden(c:GoldenCase){const x:number[]=[],p:number[]=[],t:number[]=[];for(const f of c.frames){const k=makeCanonicalFrame(f);x.push(xFactorDeg(k));p.push(pelvisTiltDeg(k));t.push(thoraxTiltDeg(k))}return{id:c.id,xFactorRmse:rmse(x,c.expectedXFactor),pelvisTiltRmse:rmse(p,c.expectedPelvisTilt),thoraxTiltRmse:rmse(t,c.expectedThoraxTilt)}}
