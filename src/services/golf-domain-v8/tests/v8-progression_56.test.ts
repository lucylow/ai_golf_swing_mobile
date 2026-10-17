import { buildNextDrillV8 } from '../src/progression/recommendation';
import { DEMO_PROGRESSION_V8 } from '../src/fixtures/progression';
import { assert } from './testAssert';
const result = buildNextDrillV8(DEMO_PROGRESSION_V8, 'tempo');
assert(result.drill.skill === 'tempo', 'skill match');
assert(result.expectedSuccess >= 0.18 && result.expectedSuccess <= 0.96, 'success estimate');
assert(['advance','maintain','regress','recover','introduce'].includes(result.progression), 'transition band');
