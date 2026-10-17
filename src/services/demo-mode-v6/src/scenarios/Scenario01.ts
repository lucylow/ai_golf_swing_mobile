import {DemoController} from "../engine/controller";
export const scenarioId="scenario-01";
export function runScenario01(controller:DemoController){ controller.cycleScenario(); return controller.snapshot.state; }
export const scenarioTitle="Demo scenario 01";
export const scenarioPurpose="Exercise deterministic UI and A.I. coaching state 01.";
export const scenarioTags=["demo","qa","mock","ai-coaching"];
export const expectedStates=["idle","processing","complete","failed"] as const;
