import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import Screen from "../figma-redesign-v3/routes/mock-data-lab-v3";

export default function MockDataLabV3Route() {
  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;
}
