import type { ReleaseScenario } from '../scenarios/scenarioTypes';

export type MatrixRow = {
  id: string;
  domain: string;
  risk: string;
  steps: number;
  invariants: number;
  status: 'not-run' | 'pass' | 'warn' | 'fail';
};

export function toMatrixRow(scenario: ReleaseScenario): MatrixRow {
  return {
    id: scenario.id,
    domain: scenario.domain,
    risk: scenario.risk,
    steps: scenario.steps.length,
    invariants: scenario.invariants.length,
    status: 'not-run',
  };
}

export function summarizeMatrix(rows: MatrixRow[]) {
  return rows.reduce((acc, row) => {
    acc.total += 1;
    acc[row.status] += 1;
    return acc;
  }, { total: 0, 'not-run': 0, pass: 0, warn: 0, fail: 0 } as Record<string, number>);
}
