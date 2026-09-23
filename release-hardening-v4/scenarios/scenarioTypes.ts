export type ScenarioStatus = 'pass' | 'warn' | 'fail';
export type ScenarioExpectation = 'recover' | 'block' | 'degrade' | 'retry' | 'redirect';

export type ScenarioStep = {
  id: string;
  action: string;
  input: string;
  expectation: ScenarioExpectation;
  userVisibleMessage: string;
  telemetryEvent: string;
};

export type ReleaseScenario = {
  id: string;
  domain: string;
  title: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  steps: ScenarioStep[];
  invariants: string[];
};

export function summarizeScenario(scenario: ReleaseScenario): string {
  return `${scenario.id} · ${scenario.domain} · ${scenario.steps.length} steps · ${scenario.invariants.length} invariants`;
}

export function scenarioHasRecovery(scenario: ReleaseScenario): boolean {
  return scenario.steps.some((step) => step.expectation === 'recover' || step.expectation === 'retry');
}
