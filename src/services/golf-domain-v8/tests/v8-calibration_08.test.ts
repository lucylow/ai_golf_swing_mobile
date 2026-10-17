import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert } from './testAssert';
const filtered = CALIBRATION_SAMPLES_V8.filter((s) => s.metric === 'faceAngleDeg');
const report = fitLaunchMonitorCalibration(filtered, 'fixture-8', 'fixture-8', { minSamples: 8 });
assert(report.profile.sampleCount >= 8, 'sample threshold');
assert(report.profile.coefficients.faceAngleDeg, 'metric coefficient present');
assert(Number.isFinite(report.profile.coefficients.faceAngleDeg!.rmse), 'rmse finite');
assert(Number.isFinite(report.profile.holdoutRmseByMetric.faceAngleDeg ?? NaN), 'holdout finite');
