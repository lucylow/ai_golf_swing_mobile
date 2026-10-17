import { GolfFeatureEngineV8 } from '../src/engine/GolfFeatureEngineV8';
import { DEMO_CLUBS_V8, DEMO_HOLES_V8 } from '../src/fixtures/course';
import { DEMO_PROGRESSION_V8 } from '../src/fixtures/progression';
import { assert } from './testAssert';
const engine = new GolfFeatureEngineV8();
const out = engine.run({ rawShot: { ballSpeedMph: 146, launchAngleDeg: 15, azimuthDeg: 1.2, spinRpm: 2800, spinAxisDeg: -4, clubSpeedMph: 98, clubPathDeg: 2, attackAngleDeg: -1.5, faceAngleDeg: 1, dynamicLoftDeg: 17 }, hole: DEMO_HOLES_V8[0], start: DEMO_HOLES_V8[0].tee, clubs: DEMO_CLUBS_V8, simulation: { iterations: 200, seed: 1, riskAversion: 0.5, targetPenaltyWeight: 1 }, progression: DEMO_PROGRESSION_V8 });
assert(out.shot.carryYards > 100, 'flight carry');
assert(out.strategy.primary.expectedScore > 0, 'strategy');
assert(out.progression.drill.title.length > 0, 'progression');
