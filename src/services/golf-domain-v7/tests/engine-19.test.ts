import { strict as assert } from './testAssert';
import { GolfFeatureEngineV7 } from '../src/engine/GolfFeatureEngineV7';
import { PRIMARY_GOLFER } from '../src/fixtures/golfers';
import { MOCK_SHOTS } from '../src/fixtures/shots';
import type { GolfSession } from '../src/types';

export function testEngineV7Case19() {
  const session: GolfSession = { id:'test-19', golferId:PRIMARY_GOLFER.id, startedAt:'2026-01-01T00:00:00.000Z', clubId:MOCK_SHOTS[0].clubId, shots:MOCK_SHOTS.slice(0,2), insights:[], practiceBlocks:[] };
  const snapshot = new GolfFeatureEngineV7().analyze(PRIMARY_GOLFER, session, []);
  assert.ok(snapshot.gaps.gaps.length > 0);
  assert.ok(snapshot.firstFlight.carryYards > 0);
  assert.ok(snapshot.firstShape.shape.length > 0);
  assert.ok(snapshot.practice.length >= 0);
}

