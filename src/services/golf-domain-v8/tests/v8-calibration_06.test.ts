import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert } from './testAssert';
const filtered = CALIBRATION_SAMPLES_V8.filter((s) => s.metric === 'launchAngleDeg');
const report = fitLaunchMonitorCalibration(filtered, 'fixture-6', 'fixture-6', { minSamples: 8 });
assert(report.profile.sampleCount >= 8, 'sample threshold');
assert(report.profile.coefficients.launchAngleDeg, 'metric coefficient present');
assert(Number.isFinite(report.profile.coefficients.launchAngleDeg!.rmse), 'rmse finite');
assert(Number.isFinite(report.profile.holdoutRmseByMetric.launchAngleDeg ?? NaN), 'holdout finite');
