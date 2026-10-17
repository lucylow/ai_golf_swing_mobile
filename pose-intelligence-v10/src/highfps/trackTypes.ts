import {Vec2,Vec3} from '../core/math';
export type VisionPoint={id:string;pixel:Vec2;normalized:Vec2;world?:Vec3;confidence:number;timestampMs:number};
export type ClubObservation={timestampMs:number;grip:VisionPoint|null;shaft:VisionPoint|null;clubHead:VisionPoint|null;confidence:number};
export type BallObservation={timestampMs:number;center:VisionPoint|null;radiusPx:number;confidence:number;motionBlurScore:number};
export type ImpactEstimate={timestampMs:number;confidence:number;clubHead:Vec2;ballCenter:Vec2;attackAngleDeg:number;launchVector:Vec2;uncertaintyMs:number};
