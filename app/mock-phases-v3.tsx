import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import Screen from "../figma-redesign-v3/routes/mock-phases-v3";

export default function MockPhasesV3Route() {
  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;
}
