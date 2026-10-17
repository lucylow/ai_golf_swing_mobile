import { CalibrationReport } from './types';
import { scoreCalibrationQuality } from './quality';

export function buildCalibrationNarrative(report: CalibrationReport): string[] {
  const quality = scoreCalibrationQuality(report.profile);
  const lines = [
    `Calibration quality: ${quality.qualityBand}.`,
    `Calibrated metrics: ${quality.calibratedMetrics}.`,
    `Mean fit RMSE: ${quality.meanRmse.toFixed(3)}.`,
    `Mean holdout RMSE: ${Number.isFinite(quality.meanHoldoutRmse) ? quality.meanHoldoutRmse.toFixed(3) : 'n/a'}.`,
    `Mean R²: ${quality.meanR2.toFixed(3)}.`,
  ];
  if (report.warnings.length) lines.push(`Warnings: ${report.warnings.length}.`);
  if (report.recommendations.length) lines.push(`Recommendations: ${report.recommendations.length}.`);
  return lines;
}
