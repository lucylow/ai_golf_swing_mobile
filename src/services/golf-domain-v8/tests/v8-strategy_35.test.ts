import { getCaddieRecommendation } from '../src/strategy/caddie';
import { DEMO_CLUBS_V8, DEMO_HOLES_V8 } from '../src/fixtures/course';
import { assert } from './testAssert';
const hole = DEMO_HOLES_V8[2];
const rec = getCaddieRecommendation(hole, hole.tee, DEMO_CLUBS_V8, { iterations: 185, seed: 735, riskAversion: 0.5, targetPenaltyWeight: 1 });
assert(rec.primary.clubId.length > 0, 'club id');
assert(rec.primary.confidence >= 0 && rec.primary.confidence <= 1, 'confidence range');
assert(rec.primary.penaltyProbability >= 0 && rec.primary.penaltyProbability <= 1, 'penalty range');
assert(rec.primary.rationale.length >= 1, 'rationale');
