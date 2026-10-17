import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert } from './testAssert';
const filtered = CALIBRATION_SAMPLES_V8.filter((s) => s.metric === 'ballSpeedMph');
const report = fitLaunchMonitorCalibration(filtered, 'fixture-15', 'fixture-15', { minSamples: 8 });
assert(report.profile.sampleCount >= 8, 'sample threshold');
assert(report.profile.coefficients.ballSpeedMph, 'metric coefficient present');
assert(Number.isFinite(report.profile.coefficients.ballSpeedMph!.rmse), 'rmse finite');
assert(Number.isFinite(report.profile.holdoutRmseByMetric.ballSpeedMph ?? NaN), 'holdout finite');
