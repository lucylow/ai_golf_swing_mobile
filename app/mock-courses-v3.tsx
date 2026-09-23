import { DevelopmentRouteGuard } from "@/components/development-route-guard";
import Screen from "../figma-redesign-v3/routes/mock-courses-v3";

export default function MockCoursesV3Route() {
  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;
}
