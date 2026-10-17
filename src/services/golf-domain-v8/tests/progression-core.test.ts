import { DEMO_PROGRESSION_V8 } from '../src/fixtures/progression';
import { coachForToday } from '../src/progression/coach';
import { assert } from './testAssert';
const next = coachForToday(DEMO_PROGRESSION_V8);
assert(next.drill.id.length > 0, 'drill missing');
assert(['advance','maintain','regress','recover','introduce'].includes(next.progression), 'invalid progression');
