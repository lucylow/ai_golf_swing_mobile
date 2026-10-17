import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert } from './testAssert';
const filtered = CALIBRATION_SAMPLES_V8.filter((s) => s.metric === 'clubPathDeg');
const report = fitLaunchMonitorCalibration(filtered, 'fixture-12', 'fixture-12', { minSamples: 8 });
assert(report.profile.sampleCount >= 8, 'sample threshold');
assert(report.profile.coefficients.clubPathDeg, 'metric coefficient present');
assert(Number.isFinite(report.profile.coefficients.clubPathDeg!.rmse), 'rmse finite');
assert(Number.isFinite(report.profile.holdoutRmseByMetric.clubPathDeg ?? NaN), 'holdout finite');
