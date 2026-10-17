import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { assert, assertClose } from './testAssert';
const report = fitLaunchMonitorCalibration(CALIBRATION_SAMPLES_V8, 'demo');
assert(report.profile.sampleCount > 100, 'expected calibration sample count');
assert(report.profile.coefficients.ballSpeedMph, 'ball speed coefficient missing');
assert(report.profile.coefficients.carryYards, 'carry coefficient missing');
assert(report.profile.coefficients.ballSpeedMph!.r2 > 0.98, 'ball speed fit should be strong');
assertClose(report.profile.coefficients.ballSpeedMph!.scale, 1.018, 0.02, 'ball scale');
