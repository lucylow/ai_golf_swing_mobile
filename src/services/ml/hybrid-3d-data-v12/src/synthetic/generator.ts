import { SeededRandom } from "../prng";
import { Vec3, Pose3D, FrameTruth, SwingMeta, SwingSequence, SwingPhase, ClubType, Handedness, CameraView, LANDMARK_NAMES, ClubState, BallState, DatasetQuality } from "../types";
import { add, lerp, mul, clamp, normalize } from "../math";

type GeneratorConfig = {
  frames?: number; fps?: 30|60|120|240; subjectId?: string; sessionId?: string; swingId?: string;
  club?: ClubType; handedness?: Handedness; cameraView?: CameraView; seed?: number;
};

const phaseAt=(t:number):SwingPhase=>{
  if(t<0.10)return "P1"; if(t<0.18)return "P2"; if(t<0.30)return "P3"; if(t<0.42)return "P4"; if(t<0.53)return "P5";
  if(t<0.64)return "P6"; if(t<0.70)return "P7"; if(t<0.78)return "P8"; if(t<0.90)return "P9"; return "P10";
};

const basePose=():Record<string,Vec3>=>({
  nose:{x:0,y:1.70,z:0}, left_shoulder:{x:-0.20,y:1.45,z:0}, right_shoulder:{x:0.20,y:1.45,z:0},
  left_hip:{x:-0.15,y:0.95,z:0}, right_hip:{x:0.15,y:0.95,z:0}, left_elbow:{x:-0.42,y:1.28,z:-0.02}, right_elbow:{x:0.42,y:1.28,z:-0.02},
  left_wrist:{x:-0.47,y:1.05,z:0}, right_wrist:{x:0.47,y:1.05,z:0}, left_knee:{x:-0.18,y:0.50,z:0.03}, right_knee:{x:0.18,y:0.50,z:0.03},
  left_ankle:{x:-0.20,y:0.08,z:0}, right_ankle:{x:0.20,y:0.08,z:0}, left_ear:{x:-0.12,y:1.73,z:0}, right_ear:{x:0.12,y:1.73,z:0},
  left_eye_inner:{x:-0.05,y:1.76,z:0}, left_eye:{x:-0.08,y:1.77,z:0}, left_eye_outer:{x:-0.11,y:1.76,z:0},
  right_eye_inner:{x:0.05,y:1.76,z:0}, right_eye:{x:0.08,y:1.77,z:0}, right_eye_outer:{x:0.11,y:1.76,z:0},
  mouth_left:{x:-0.04,y:1.64,z:0}, mouth_right:{x:0.04,y:1.64,z:0}, left_pinky:{x:-0.49,y:1.02,z:-0.02}, right_pinky:{x:0.49,y:1.02,z:-0.02},
  left_index:{x:-0.48,y:1.03,z:0}, right_index:{x:0.48,y:1.03,z:0}, left_thumb:{x:-0.46,y:1.04,z:0.02}, right_thumb:{x:0.46,y:1.04,z:0.02},
  left_heel:{x:-0.21,y:0.05,z:-0.03}, right_heel:{x:0.21,y:0.05,z:-0.03}, left_foot_index:{x:-0.18,y:0.02,z:0.18}, right_foot_index:{x:0.18,y:0.02,z:0.18},
});

function rotatePoint(p:Vec3,deg:number,dx:number):Vec3{const r=deg*Math.PI/180;return {x:p.x*Math.cos(r)-p.z*Math.sin(r)+dx,y:p.y,z:p.x*Math.sin(r)+p.z*Math.cos(r)};}
function lerpVec(a:Vec3,b:Vec3,t:number):Vec3{return {x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t)}};
function subVec(a:Vec3,b:Vec3):Vec3{return {x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}};

function swingPose(t:number, rng:SeededRandom, handedness:Handedness):Record<string,Vec3>{
  const pose=basePose();
  const backswing=Math.sin(Math.min(1,t/0.45)*Math.PI/2); const downswing=Math.max(0,(t-0.45)/0.30); const finish=Math.max(0,(t-0.70)/0.30);
  const shoulderTurn=12+68*backswing-48*Math.min(downswing,1)+20*finish;
  const hipTurn=5+36*backswing-25*Math.min(downswing,1)+12*finish;
  const sway=0.045*Math.sin(Math.PI*t*2.1)+rng.gaussian()*0.002;
  pose.left_shoulder=rotatePoint(pose.left_shoulder,shoulderTurn*0.7,sway);
  pose.right_shoulder=rotatePoint(pose.right_shoulder,-shoulderTurn*0.7,-sway);
  pose.left_hip=rotatePoint(pose.left_hip,hipTurn*0.5,sway*0.4); pose.right_hip=rotatePoint(pose.right_hip,-hipTurn*0.5,-sway*0.4);
  const side=handedness==="right"?1:-1; const d=Math.min(downswing,1);
  pose.left_wrist={x:-0.38*side+0.10*Math.sin(t*Math.PI*2),y:1.08+0.52*backswing-0.72*d+0.35*finish,z:0.16*backswing-0.25*d};
  pose.right_wrist={x:0.38*side+0.10*Math.sin(t*Math.PI*2),y:1.08+0.45*backswing-0.68*d+0.37*finish,z:-0.12*backswing+0.22*d};
  pose.left_elbow=lerpVec(pose.left_elbow,pose.left_wrist,0.62); pose.right_elbow=lerpVec(pose.right_elbow,pose.right_wrist,0.62);
  pose.left_knee.y-=0.10*backswing; pose.right_knee.y-=0.06*backswing+0.08*d; pose.left_ankle.z+=0.05*finish; pose.right_ankle.z+=0.04*finish;
  pose.nose.x+=sway; pose.nose.z+=0.05*Math.sin(2*Math.PI*t);
  return pose;
}

function clubFor(pose:Record<string,Vec3>,t:number):ClubState{const grip=mul(add(pose.left_wrist,pose.right_wrist),0.5);const dir=normalize(subVec(pose.right_wrist,pose.left_wrist));void dir;const head=add(grip,mul(normalize({x:0.45*Math.cos(t*Math.PI*2),y:-0.85,z:0.5*Math.sin(t*Math.PI*2)}),0.95));return {grip,shaftMid:lerpVec(grip,head,0.5),clubHead:head,confidence:0.88};}

export function generateSyntheticSwing(config:GeneratorConfig={}):SwingSequence{
  const seed=config.seed??1001; const rng=new SeededRandom(seed); const frames=config.frames??120; const fps=config.fps??120;
  const meta:SwingMeta={subjectId:config.subjectId??`syn-${seed%10000}`,sessionId:config.sessionId??`sess-${seed}`,swingId:config.swingId??`swing-${seed}`,club:config.club??"mid_iron",handedness:config.handedness??"right",cameraView:config.cameraView??"down_the_line",fps,seed};
  const out:FrameTruth[]=[];
  for(let i=0;i<frames;i++){
    const t=i/(frames-1); const named=swingPose(t,rng,meta.handedness);
    const landmarks:Pose3D[]=LANDMARK_NAMES.map(name=>({name,position:named[name],visibility:clamp(0.95-rng.range(0,0.08),0.55,1),presence:clamp(0.97-rng.range(0,0.05),0.6,1)}));
    const club=clubFor(named,t); const flight=Math.max(0,t-0.70); const ball:BallState={position:{x:0,y:0.02,z:0},velocity:{x:flight*18,y:flight*26,z:flight*60},spinAxisDeg:rng.range(-8,8),confidence:0.80};
    out.push({index:i,timestampMs:Math.round(i*1000/fps),phase:phaseAt(t),landmarks,club,ball,xFactorDeg:48*Math.sin(Math.min(t/0.45,1)*Math.PI/2)-22*flight,tempoProgress:t});
  }
  return {meta,frames:out,quality:estimateQuality(out)};
}

function estimateQuality(frames:FrameTruth[]):DatasetQuality{const mv=frames.reduce((s,f)=>s+f.landmarks.reduce((a,l)=>a+l.visibility,0)/f.landmarks.length,0)/frames.length;const mp=frames.reduce((s,f)=>s+f.landmarks.reduce((a,l)=>a+l.presence,0)/f.landmarks.length,0)/frames.length;return {meanVisibility:mv,meanPresence:mp,blurRisk:0.12,occlusionRate:0.05,framingScore:0.94,labelIntegrity:0.995};}
