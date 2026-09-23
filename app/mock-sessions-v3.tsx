import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import Screen from "../figma-redesign-v3/routes/mock-sessions-v3";

export default function MockSessionsV3Route() {
  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;
}
