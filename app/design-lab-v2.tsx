import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import { DesignLabV2Screen } from "@/figma-redesign-v2/ConnectedScreens";

export default function DesignLabV2Route() {
  return <DevelopmentRouteGuard><DesignLabV2Screen /></DevelopmentRouteGuard>;
}
