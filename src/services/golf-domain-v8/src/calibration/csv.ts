export type CsvRow = Record<string, string>;

export function parseCsv(text: string): CsvRow[] {
  const lines = text.replace(/\r/g, '').split(/\n/).filter((line) => line.trim().length > 0);
  if (!lines.length) return [];
  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let current = '';
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') { current += '"'; i += 1; }
        else { quoted = !quoted; }
      } else if (ch === ',' && !quoted) { cells.push(current.trim()); current = ''; }
      else current += ch;
    }
    cells.push(current.trim());
    return cells;
  };
  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row: CsvRow = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ''; });
    return row;
  });
}

export function parseNumber(value: string | undefined): number | undefined {
  if (value == null) return undefined;
  const cleaned = value.replace(/[^0-9eE+\-.]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}
