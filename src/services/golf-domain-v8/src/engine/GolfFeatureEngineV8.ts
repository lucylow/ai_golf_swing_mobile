import { CalibrationProfileV8 } from '../calibration/types';
import { calibrateShotInputs, ShotInputsV8 } from '../shotModel/calibratedShot';
import { reconcileFlight } from '../shotModel/flightReconcile';
import { HoleModelV8, ClubStrategyProfile, SimulationOptions } from '../strategy/types';
import { getCaddieRecommendation } from '../strategy/caddie';
import { ProgressionProfileV8, SkillEvidence } from '../progression/types';
import { buildSchedule } from '../progression/scheduler';
import { coachForToday } from '../progression/coach';
import { updateMasteryV8 } from '../progression/mastery';

export type GolfSnapshotV8 = {
  shot: ReturnType<typeof reconcileFlight>;
  calibratedInputs: ShotInputsV8;
  strategy: ReturnType<typeof getCaddieRecommendation>;
  progression: ReturnType<typeof coachForToday>;
  schedule: ReturnType<typeof buildSchedule>;
  updatedProgression: ProgressionProfileV8;
};

export class GolfFeatureEngineV8 {
  run(input: { rawShot: ShotInputsV8; calibration?: CalibrationProfileV8 | null; hole: HoleModelV8; start: { x: number; y: number }; clubs: ClubStrategyProfile[]; simulation: SimulationOptions; progression: ProgressionProfileV8; evidence?: SkillEvidence[]; nowMs?: number }): GolfSnapshotV8 {
    const nowMs = input.nowMs ?? Date.now();
    const calibratedInputs = calibrateShotInputs(input.calibration ?? null, input.rawShot);
    const shot = reconcileFlight(calibratedInputs);
    const strategy = getCaddieRecommendation(input.hole, input.start, input.clubs, input.simulation);
    const updatedSkills = { ...input.progression.skills };
    const evidence = input.evidence ?? [];
    for (const state of Object.values(updatedSkills)) if (state) updatedSkills[state.skill] = updateMasteryV8(state, evidence, nowMs);
    const updatedProgression = { ...input.progression, skills: updatedSkills };
    return { shot, calibratedInputs, strategy, progression: coachForToday(updatedProgression), schedule: buildSchedule(updatedProgression, nowMs), updatedProgression };
  }
}
