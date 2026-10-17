import { ProgressionProfileV8, SkillV8, MasteryStateV8 } from './types';
import { buildNextDrillV8 } from './recommendation';
export function weakestSkill(profile: ProgressionProfileV8): SkillV8 {
  const states = Object.values(profile.skills) as MasteryStateV8[];
  return states.sort((a, b) => (a.mastery - a.recentScore) - (b.mastery - b.recentScore))[0]?.skill ?? 'tempo';
}
export function coachForToday(profile: ProgressionProfileV8) {
  const skill = weakestSkill(profile);
  return buildNextDrillV8(profile, skill);
}
