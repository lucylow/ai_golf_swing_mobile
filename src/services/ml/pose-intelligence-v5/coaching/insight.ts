import { SwingPattern } from '../types/model';
import { selectPrimaryAction } from './actionSelector';
import { explainPattern } from './explanation';
export type CoachingInsight={title:string;explanation:string;action:string;confidence:number};
export function buildInsight(pattern:SwingPattern|undefined):CoachingInsight{
 if(!pattern)return {title:'No primary focus yet',explanation:'The current sequence did not produce a strong enough pattern for a specific recommendation.',action:selectPrimaryAction(undefined),confidence:0};
 return {title:pattern.label,explanation:explainPattern(pattern),action:selectPrimaryAction(pattern),confidence:pattern.confidence};
}
