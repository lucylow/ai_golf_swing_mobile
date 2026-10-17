import { GolfSession, CoachingInsight, ShotInput } from '../types';
import { estimateBallFlight } from '../physics/ballFlight';
import { classifyShotShape } from '../swing/shotShape';
import { scoreStrike } from '../swing/strikeQuality';
import { facePathCell } from '../swing/facePathMatrix';
import { buildRecommendation } from './recommendationEngine';
import { rankInsights } from './insightRanker';

export type GolfCoachAnalysis = {
  insights: CoachingInsight[];
  recommendation: ReturnType<typeof buildRecommendation>;
  shotSummaries: ReturnType<typeof analyzeShot>[];
};

function analyzeShot(shot: ShotInput) {
  const flight = estimateBallFlight(shot);
  const shape = classifyShotShape(shot);
  const strike = scoreStrike(shot);
  const matrix = facePathCell(shot);
  return { flight, shape, strike, matrix };
}

export function analyzeGolfSession(session: GolfSession): GolfCoachAnalysis {
  const shotSummaries = session.shots.map(analyzeShot);
  const insights: CoachingInsight[] = [];
  const averagePath = session.shots.length ? session.shots.reduce((sum, shot) => sum + shot.clubPathDeg, 0) / session.shots.length : 0;
  const averageFacePath = session.shots.length ? session.shots.reduce((sum, shot) => sum + shot.faceToPathDeg, 0) / session.shots.length : 0;
  if (Math.abs(averagePath) > 4) {
    insights.push({ id: 'v7-path', title: 'Club-path tendency', observation: `Your sample trends ${averagePath > 0 ? 'rightward' : 'leftward'} relative to neutral.`, evidence: [`Average path ${averagePath.toFixed(1)}°`], whyItMatters: 'Path influences starting direction and the shape window available at impact.', nextAction: 'Use the path-control drill and recheck the start corridor.', confidence: 0.82, priority: 'primary', domain: 'swing' });
  }
  if (Math.abs(averageFacePath) > 3.5) {
    insights.push({ id: 'v7-face', title: 'Face-to-path separation', observation: `The face is often ${averageFacePath > 0 ? 'open' : 'closed'} to the path.`, evidence: [`Average face-to-path ${averageFacePath.toFixed(1)}°`], whyItMatters: 'Face-to-path separation is associated with curvature in the simplified flight model.', nextAction: 'Train a centered start line before changing path further.', confidence: 0.79, priority: 'secondary', domain: 'ball-flight' });
  }
  const strikeMean = shotSummaries.reduce((sum, item) => sum + item.strike.score, 0) / Math.max(1, shotSummaries.length);
  if (strikeMean < 0.68) {
    insights.push({ id: 'v7-contact', title: 'Strike consistency', observation: 'Center-strike consistency is limiting the sample.', evidence: [`Mean strike score ${Math.round(strikeMean * 100)}%`], whyItMatters: 'Variable strike changes carry and direction even when the swing pattern is similar.', nextAction: 'Use a centered-contact grid before adding speed.', confidence: 0.76, priority: 'primary', domain: 'swing' });
  }
  const ranked = rankInsights([...insights, ...session.insights]);
  return { insights: ranked, recommendation: buildRecommendation(ranked), shotSummaries };
}

