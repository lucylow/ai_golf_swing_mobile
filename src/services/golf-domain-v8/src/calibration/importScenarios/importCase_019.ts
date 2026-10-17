import { CalibrationSample } from '../types';
import { parseCsv, parseNumber } from '../csv';
import { resolveMetricHeader } from '../vendorFields';
import { pairMeasurements, RawShotMeasurement } from '../pairing';

export type ImportScenarioResult19 = { rows: number; samples: number; paired: number; metric: string; };

export function parseImportScenario19(csvText: string): ImportScenarioResult19 {
  const rows = parseCsv(csvText);
  const samples: CalibrationSample[] = [];
  rows.forEach((row, index) => {
    const shotKey = row['Shot'] || row['Shot Number'] || `scenario-19-${index}`;
    for (const [header, raw] of Object.entries(row)) {
      const metric = resolveMetricHeader(header);
      const value = parseNumber(raw);
      if (metric && value != null && metric === 'faceAngleDeg') samples.push({ shotKey, metric, appValue: value * 0.985, referenceValue: value });
    }
  });
  const app: RawShotMeasurement[] = samples.map((s) => ({ shotKey: s.shotKey, metrics: { [s.metric]: s.appValue } }));
  const ref: RawShotMeasurement[] = samples.map((s) => ({ shotKey: s.shotKey, metrics: { [s.metric]: s.referenceValue } }));
  const paired = pairMeasurements(app, ref);
  return { rows: rows.length, samples: samples.length, paired: paired.length, metric: 'faceAngleDeg' };
}
