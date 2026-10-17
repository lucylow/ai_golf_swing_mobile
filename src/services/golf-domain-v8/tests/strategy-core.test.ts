import { getCaddieRecommendation } from '../src/strategy/caddie';
import { DEMO_CLUBS_V8, DEMO_HOLES_V8 } from '../src/fixtures/course';
import { assert } from './testAssert';
const r = getCaddieRecommendation(DEMO_HOLES_V8[0], DEMO_HOLES_V8[0].tee, DEMO_CLUBS_V8, { iterations: 300, seed: 9, riskAversion: 0.55, targetPenaltyWeight: 1 });
assert(r.primary.clubId.length > 0, 'strategy should choose a club');
assert(Number.isFinite(r.primary.expectedScore), 'expected score');
assert(r.primary.expectedScore < 10, 'expected score unreasonable');
assert(r.alternatives.length > 0, 'alternatives should exist');
