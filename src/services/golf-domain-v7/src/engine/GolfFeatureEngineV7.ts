import { GolferProfile, GolfSession } from '../types';
import { DEFAULT_CLUBS } from '../equipment/clubs';
import { buildClubGaps } from '../equipment/clubGapping';
import { analyzeGolfSession } from '../ai/golfCoachV7';
import { buildTargetWindows } from '../course/targetStrategy';
import { strategyForWind } from '../course/windStrategy';
import { choosePinStrategy } from '../course/pinStrategy';
import { evaluateSetMakeup } from '../equipment/setMakeup';
import { buildPracticeBlocks } from '../practice/drillPlan';
import { prioritizeWeaknesses } from '../practice/weaknessPrioritizer';
import { scoreDecision } from '../scoring/decisionScore';
import { estimateExpectedScore } from '../scoring/expectedScore';
import { recommendClub } from '../equipment/clubRecommendation';
import { classifyShotShape } from '../swing/shotShape';
import { estimateBallFlight } from '../physics/ballFlight';
import type { GolfFeatureSnapshot } from './GolfFeatureSnapshot';
import { scoreTeeShotRisk } from '../scoring/teeShotRisk';
import { analyzeStartLine } from '../putting/startLine';
import { scoreDistanceControl } from '../putting/distanceControl';
import { estimateBreak } from '../putting/breakModel';
import { estimateChipWindow } from '../shortGame/chipLanding';
import { buildPitchWindow } from '../shortGame/pitchWindow';
import { bunkerPlan } from '../bunker/entryPoint';
import { buildWedgeMatrix, recommendWedgeSwing } from '../wedge/distanceControl';

export class GolfFeatureEngineV7 {
  analyze(golfer: GolferProfile, session: GolfSession, recentSessions: GolfSession[], targetYards = 165): GolfFeatureSnapshot {
    const coach = analyzeGolfSession(session);
    const observedCarry: Record<string, number> = {};
    for (const shot of session.shots) {
      const flight = estimateBallFlight(shot);
      observedCarry[shot.clubId] = flight.carryYards;
    }
    const gaps = buildClubGaps(DEFAULT_CLUBS, observedCarry);
    const set = evaluateSetMakeup(DEFAULT_CLUBS);
    const firstShot = session.shots[0];
    const flight = firstShot ? estimateBallFlight(firstShot) : estimateBallFlight({
      clubId: '7-iron', clubCategory: 'iron', swingSpeedMph: 78, launchDeg: 18, spinRpm: 5200,
      faceToPathDeg: 0, clubPathDeg: 0, attackAngleDeg: -4, dynamicLoftDeg: 26, strikeEfficiency: 0.86,
    });
    const fallbackShot = { clubId: '7-iron', clubCategory: 'iron' as const, swingSpeedMph: 78, launchDeg: 18, spinRpm: 5200, faceToPathDeg: 0, clubPathDeg: 0, attackAngleDeg: -4, dynamicLoftDeg: 26, strikeEfficiency: 0.86 };
    const shape = classifyShotShape(firstShot ?? fallbackShot);
    const strategy = { targetWindows: buildTargetWindows({ hole: 1, par: 4, yardage: targetYards + 190, windMph: 7, windDirectionDeg: 205, elevationFt: 0, pinYardsFromFront: 28, hazards: [] }, [targetYards - 12, targetYards, targetYards + 10]),
      wind: strategyForWind({ hole: 1, par: 4, yardage: targetYards + 190, windMph: 7, windDirectionDeg: 205, elevationFt: 0, pinYardsFromFront: 28, hazards: [] }, targetYards),
      pin: choosePinStrategy({ hole: 1, par: 4, yardage: targetYards + 190, windMph: 7, windDirectionDeg: 205, elevationFt: 0, pinYardsFromFront: 28, hazards: [] }, 0.72),
    };
    const clubChoices = recommendClub(targetYards, strategy.wind.adjustedYards, DEFAULT_CLUBS).slice(0, 5);
    const expectedScore = estimateExpectedScore({ distanceYards: targetYards, lieQuality: 0.9, greenAccess: 0.76, hazardExposure: 0.22, puttingStrength: 0.72 });
    const decision = scoreDecision({ successProbability: 0.73, penaltyProbability: 0.14, recoveryQuality: 0.75, distanceGain: 0.62 });
    const teeRisk = scoreTeeShotRisk(38, firstShot ? flight.sideOffsetYards : 8, 0.25, golfer.driverSpeedMph);
    const weaknesses = prioritizeWeaknesses(coach.insights);
    const practice = buildPracticeBlocks((weaknesses.slice(0, 3).map((item) => item.skill).concat(golfer.recentSkills)).slice(0, 5));
    const putting = {
      startLine: analyzeStartLine(0.35, 12, 4),
      distance: scoreDistanceControl(12, 1.4),
      break: estimateBreak({ puttLengthFt: 12, slopePct: 1.2, stimp: 10.5 }),
    };
    const wedgeSamples = session.shots.filter((shot) => shot.clubCategory === 'wedge').map((shot) => ({
      carryYards: estimateBallFlight(shot).carryYards,
      swingLength: shot.swingSpeedMph < 64 ? 'half' as const : shot.swingSpeedMph < 72 ? 'three-quarter' as const : 'full' as const,
    }));
    const wedgeMatrix = buildWedgeMatrix(wedgeSamples);
    const wedgeRecommendation = recommendWedgeSwing(targetYards > 120 ? 105 : targetYards, wedgeMatrix);
    const shortGame = estimateChipWindow(14, 0.38, 0.86);
    const pitch = buildPitchWindow(32, 4, 31);
    const bunker = bunkerPlan(3, 24, 2);
    return {
      golfer,
      coach,
      firstFlight: flight,
      firstShape: shape,
      gaps,
      set,
      strategy,
      clubChoices,
      expectedScore,
      decision,
      teeRisk,
      weaknesses,
      practice,
      putting,
      wedgeMatrix,
      wedgeRecommendation,
      shortGame,
      pitch,
      bunker,
      recentSessionCount: recentSessions.length,
    };
  }
}

