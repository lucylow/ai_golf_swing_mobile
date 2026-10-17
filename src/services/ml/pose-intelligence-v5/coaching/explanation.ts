import { SwingPattern } from '../types/model';
export function explainPattern(pattern:SwingPattern):string{
 const evidence=pattern.evidence.join('; ');
 return `${pattern.label} was observed from the current movement signals. ${evidence}. Treat this as a coaching hypothesis and recheck the pattern on the next swing.`;
}
