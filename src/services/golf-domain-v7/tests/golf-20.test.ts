import { strict as assert } from './testAssert';
import { MOCK_SHOTS } from '../src/fixtures/shots';
import { estimateBallFlight } from '../src/physics/ballFlight';
import { classifyShotShape } from '../src/swing/shotShape';
import { scoreStrike } from '../src/swing/strikeQuality';

export function testGolfDomainV7Case20() {
  const shot = MOCK_SHOTS[19 % MOCK_SHOTS.length];
  const flight = estimateBallFlight(shot);
  const shape = classifyShotShape(shot);
  const strike = scoreStrike(shot);
  assert.ok(Number.isFinite(flight.carryYards));
  assert.ok(shape.shape.length > 0);
  assert.ok(strike.score >= 0 && strike.score <= 1);
}

