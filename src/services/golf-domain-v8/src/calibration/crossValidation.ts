import { CalibrationSample } from './types';
import { fitHuber } from './robustFit';
import { rmse } from './statistics';
export type CrossValidationSummary = { folds: number; meanRmse: number; worstRmse: number; stable: boolean };
export function kFoldCalibration(samples: readonly CalibrationSample[], folds = 5): CrossValidationSummary {
  if (samples.length < Math.max(4, folds * 2)) return { folds: 0, meanRmse: Infinity, worstRmse: Infinity, stable: false };
  const ordered = samples.slice(); const foldErrors: number[] = [];
  for (let fold = 0; fold < folds; fold += 1) {
    const train = ordered.filter((_, i) => i % folds !== fold); const test = ordered.filter((_, i) => i % folds === fold);
    const fit = fitHuber(train.map((s) => s.appValue), train.map((s) => s.referenceValue), { delta: 1.5, maxIterations: 30, epsilon: 1e-7 });
    foldErrors.push(rmse(test.map((s) => s.referenceValue), test.map((s) => fit.intercept + fit.scale * s.appValue)));
  }
  const meanRmse = foldErrors.reduce((a, b) => a + b, 0) / foldErrors.length;
  return { folds, meanRmse, worstRmse: Math.max(...foldErrors), stable: meanRmse < Math.max(1, worstRmseFloor(samples[0]?.metric)) * 1.6 };
}
function worstRmseFloor(metric: CalibrationSample['metric'] | undefined): number { return metric === 'spinRpm' ? 250 : metric?.includes('Deg') || metric === 'launchAngleDeg' ? 1.5 : 4; }
