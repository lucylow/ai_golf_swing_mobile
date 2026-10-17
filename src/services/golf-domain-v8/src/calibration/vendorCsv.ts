import { CalibrationSample } from './types';
import { parseCsv, parseNumber } from './csv';
import { resolveMetricHeader } from './vendorFields';

function extract(text: string, vendor: string): CalibrationSample[] {
  const rows = parseCsv(text);
  const out: CalibrationSample[] = [];
  rows.forEach((row, rowIndex) => {
    let shotKey = row['Shot'] || row['Shot Number'] || row['shot'] || `${vendor}-${rowIndex + 1}`;
    let timestampMs = parseNumber(row['Timestamp'] || row['timestamp_ms']);
    const ref: Partial<Record<keyof CalibrationSample extends never ? never : any, number>> = {};
    Object.entries(row).forEach(([header, raw]) => {
      const metric = resolveMetricHeader(header);
      const value = parseNumber(raw);
      if (metric && value != null) {
        out.push({ shotKey, metric, appValue: NaN, referenceValue: value, timestampMs, weight: 1 });
      }
    });
  });
  return out;
}

export function parseForesightLikeCsv(text: string): CalibrationSample[] {
  return extract(text, 'foresight');
}
export function parseTrackmanLikeCsv(text: string): CalibrationSample[] {
  return extract(text, 'trackman');
}
