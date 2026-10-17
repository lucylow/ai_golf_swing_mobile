import {DemoController} from "../engine/controller";
export const scenarioId="scenario-17";
export function runScenario17(controller:DemoController){ controller.cycleScenario(); return controller.snapshot.state; }
export const scenarioTitle="Demo scenario 17";
export const scenarioPurpose="Exercise deterministic UI and A.I. coaching state 17.";
export const scenarioTags=["demo","qa","mock","ai-coaching"];
export const expectedStates=["idle","processing","complete","failed"] as const;
