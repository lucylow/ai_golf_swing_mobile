import { SwingPattern } from '../types/model';
export function selectPrimaryAction(pattern:SwingPattern|undefined):string{
 if(!pattern)return 'Record another swing to establish a clearer baseline.';
 return pattern.recommendedFocus??`Focus on ${pattern.label.toLowerCase()} and recheck with three swings.`;
}
