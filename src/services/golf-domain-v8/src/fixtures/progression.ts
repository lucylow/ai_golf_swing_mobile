import { ProgressionProfileV8 } from '../progression/types';
export const DEMO_PROGRESSION_V8: ProgressionProfileV8 = {
  golferId: 'demo-golfer-v8', maxDailyIntensity: 0.78, preference: 'mixed', skills: {
    'driver': { skill: 'driver', mastery: 0.68, confidence: 0.75, fatigue: 0.1, streak: 4, currentDifficulty: 0.55, attempts: 18, successes: 13, recentScore: 0.76, recentVariance: 0.04, readyForNextLevel: false, needsRegression: false },
    'face-control': { skill: 'face-control', mastery: 0.57, confidence: 0.62, fatigue: 0.15, streak: 3, currentDifficulty: 0.5, attempts: 16, successes: 10, recentScore: 0.66, recentVariance: 0.08, readyForNextLevel: false, needsRegression: false },
    'transition': { skill: 'transition', mastery: 0.81, confidence: 0.84, fatigue: 0.06, streak: 7, currentDifficulty: 0.62, attempts: 21, successes: 18, recentScore: 0.83, recentVariance: 0.03, readyForNextLevel: true, needsRegression: false },
    'tempo': { skill: 'tempo', mastery: 0.74, confidence: 0.79, fatigue: 0.08, streak: 6, currentDifficulty: 0.58, attempts: 19, successes: 15, recentScore: 0.79, recentVariance: 0.04, readyForNextLevel: false, needsRegression: false },
    'iron-contact': { skill: 'iron-contact', mastery: 0.43, confidence: 0.48, fatigue: 0.2, streak: 1, currentDifficulty: 0.55, attempts: 13, successes: 6, recentScore: 0.46, recentVariance: 0.11, readyForNextLevel: false, needsRegression: true },
    'wedge-distance': { skill: 'wedge-distance', mastery: 0.61, confidence: 0.64, fatigue: 0.09, streak: 3, currentDifficulty: 0.47, attempts: 15, successes: 10, recentScore: 0.68, recentVariance: 0.06, readyForNextLevel: false, needsRegression: false },
  },
};
