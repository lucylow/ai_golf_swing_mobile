import { PracticeSkill } from '../types';
import { buildPracticeBlocks } from './drillPlan';
export function randomPracticePlan(seed: number, skills: PracticeSkill[], minutes = 30) {
  const blocks = buildPracticeBlocks(skills);
  let state = seed >>> 0;
  function next() { state = (1664525 * state + 1013904223) >>> 0; return state / 4294967296; }
  return blocks.sort(() => next()-0.5).filter((block, index, list) => list.findIndex((item)=>item.skill===block.skill)===index).reduce((picked, block)=>picked.total + block.minutes <= minutes ? { total: picked.total+block.minutes, blocks:[...picked.blocks,block] } : picked, {total:0,blocks:[]} as {total:number;blocks:ReturnType<typeof buildPracticeBlocks>});
}

