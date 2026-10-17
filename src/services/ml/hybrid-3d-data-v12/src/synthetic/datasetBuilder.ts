import { generateSyntheticSwing } from "./generator";
import { defaultAugmentation, randomizeSynthetic } from "./domainRandomization";
import { SwingSequence, ClubType, CameraView, Handedness } from "../types";
import { SeededRandom } from "../prng";

export type SyntheticDatasetConfig = {
  subjects: number;
  sessionsPerSubject: number;
  swingsPerSession: number;
  frames: number;
  fps: 30|60|120|240;
  clubs: ClubType[];
  views: CameraView[];
  handedness: Handedness[];
  seed: number;
  augment?: boolean;
};

export const defaultSyntheticDatasetConfig = (seed=991):SyntheticDatasetConfig => ({
  subjects: 64,
  sessionsPerSubject: 4,
  swingsPerSession: 6,
  frames: 120,
  fps: 120,
  clubs:["driver","wood","hybrid","long_iron","mid_iron","short_iron","wedge"],
  views:["down_the_line","face_on","three_quarter"],
  handedness:["right","left"],
  seed,
  augment:true,
});

export function buildSyntheticDataset(cfg:SyntheticDatasetConfig):SwingSequence[]{
  const rng=new SeededRandom(cfg.seed); const out:SwingSequence[]=[];
  for(let s=0;s<cfg.subjects;s++){
    const subject=`syn-subject-${s.toString().padStart(4,"0")}`;
    for(let session=0;session<cfg.sessionsPerSubject;session++){
      for(let swing=0;swing<cfg.swingsPerSession;swing++){
        const seed=rng.int(1,0x7fffffff);
        const club=cfg.clubs[(swing+session+s)%cfg.clubs.length];
        const view=cfg.views[(swing+2*session+s)%cfg.views.length];
        const hand=cfg.handedness[(s+session)%cfg.handedness.length];
        let seq=generateSyntheticSwing({seed,subjectId:subject,sessionId:`${subject}-session-${session}`,swingId:`${subject}-${session}-${swing}`,club,cameraView:view,handedness:hand,frames:cfg.frames,fps:cfg.fps});
        if(cfg.augment) seq=randomizeSynthetic(seq,{...defaultAugmentation(seed),seed});
        out.push(seq);
      }
    }
  }
  return out;
}
