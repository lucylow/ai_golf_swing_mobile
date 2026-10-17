import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert } from './testAssert';
const filtered = CALIBRATION_SAMPLES_V8.filter((s) => s.metric === 'carryYards');
const report = fitLaunchMonitorCalibration(filtered, 'fixture-19', 'fixture-19', { minSamples: 8 });
assert(report.profile.sampleCount >= 8, 'sample threshold');
assert(report.profile.coefficients.carryYards, 'metric coefficient present');
assert(Number.isFinite(report.profile.coefficients.carryYards!.rmse), 'rmse finite');
assert(Number.isFinite(report.profile.holdoutRmseByMetric.carryYards ?? NaN), 'holdout finite');
