import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import Screen from "../figma-redesign-v3/routes/mock-clubs-v3";

export default function MockClubsV3Route() {
  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;
}
