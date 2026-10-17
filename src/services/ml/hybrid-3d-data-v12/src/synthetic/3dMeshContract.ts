import { Vec3, SwingSequence } from "../types";

export type MeshFrame = {
  timestampMs:number;
  vertices:Vec3[];
  joints:Vec3[];
  faces:number[];
  confidence:number;
};

export type DenseBodySequence = {
  modelFamily:"smplx_like"|"custom_dense_body";
  vertexCount:number;
  frames:MeshFrame[];
  sourceSwingId:string;
};

export function skeletonToDenseProxy(seq:SwingSequence,vertexCount=1024):DenseBodySequence{
  const frames=seq.frames.map(frame=>{
    const verts:Vec3[]=[];
    for(let i=0;i<vertexCount;i++){
      const landmark=frame.landmarks[i%frame.landmarks.length].position;
      const ring=(i/frame.landmarks.length)%1;
      const wobble=Math.sin(i*0.37+frame.index*0.11)*0.0025;
      verts.push({x:landmark.x*(1+ring*0.08)+wobble,y:landmark.y*(1+ring*0.03),z:landmark.z*(1+ring*0.08)-wobble});
    }
    return {timestampMs:frame.timestampMs,vertices:verts,joints:frame.landmarks.map(l=>l.position),faces:[],confidence:frame.landmarks.reduce((a,l)=>a+l.visibility,0)/frame.landmarks.length};
  });
  return {modelFamily:"custom_dense_body",vertexCount,frames,sourceSwingId:seq.meta.swingId};
}
