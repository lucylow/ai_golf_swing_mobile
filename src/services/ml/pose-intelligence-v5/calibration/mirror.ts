import { PoseFrame, PoseLandmarkId } from '../types/landmarks';

const swapPairs:[PoseLandmarkId,PoseLandmarkId][]=[
 [PoseLandmarkId.LeftShoulder,PoseLandmarkId.RightShoulder],
 [PoseLandmarkId.LeftElbow,PoseLandmarkId.RightElbow],
 [PoseLandmarkId.LeftWrist,PoseLandmarkId.RightWrist],
 [PoseLandmarkId.LeftHip,PoseLandmarkId.RightHip],
 [PoseLandmarkId.LeftKnee,PoseLandmarkId.RightKnee],
 [PoseLandmarkId.LeftAnkle,PoseLandmarkId.RightAnkle],
 [PoseLandmarkId.LeftHeel,PoseLandmarkId.RightHeel],
 [PoseLandmarkId.LeftFootIndex,PoseLandmarkId.RightFootIndex],
];

export function mirrorFrame(frame:PoseFrame):PoseFrame{
  const landmarks=frame.landmarks.map(lm=>({...lm,x:1-lm.x}));
  for(const [a,b] of swapPairs){const t=landmarks[a];landmarks[a]=landmarks[b];landmarks[b]=t;}
  const world=frame.worldLandmarks?.map(lm=>({...lm,x:-lm.x}));
  if(world){for(const [a,b] of swapPairs){const t=world[a];world[a]=world[b];world[b]=t;}}
  return {...frame,landmarks,worldLandmarks:world};
}
