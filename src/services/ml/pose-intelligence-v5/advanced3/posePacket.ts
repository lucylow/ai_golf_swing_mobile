import { PoseFrame } from '../types/landmarks';
export type PosePacket={sessionId:string;frame:PoseFrame;ingestedAtMs:number;source:'camera'|'video'|'replay'};
export function makePosePacket(sessionId:string,frame:PoseFrame,source:PosePacket['source']):PosePacket{return {sessionId,frame,ingestedAtMs:Date.now(),source};}
export function packetAgeMs(packet:PosePacket,now=Date.now()):number{return Math.max(0,now-packet.ingestedAtMs);}
