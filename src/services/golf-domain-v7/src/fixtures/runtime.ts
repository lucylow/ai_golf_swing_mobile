import { ShotInput } from '../types';
import { estimateBallFlight } from '../physics/ballFlight';
import { classifyShotShape } from '../swing/shotShape';
export function analyzeShotSession(shots: ShotInput[]) {
  return shots.map((shot) => ({ shot, flight: estimateBallFlight(shot), shape: classifyShotShape(shot) }));
}

